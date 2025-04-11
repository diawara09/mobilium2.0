import { serverUrl } from "~/utils/serverUrl"
import type { Route } from "./+types/AllProducts"
import DataTableBase from "~/components/DataTableBase"
import { NavLink, Form } from "react-router"
export async function clientLoader() {
    try {
        const req = await fetch(serverUrl + "/product/all", {
            method: "GET",
            mode: "cors",
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const response = await req.json()
        return response
    } catch (error) {
        return {error}
    }
}
export default function AllProducts({ loaderData }: Route.ComponentProps) {
    const data = loaderData
    const columns = [
      {
        name: 'Image',
        selector: (row: any) => (
          <img src={serverUrl + '/' + row.images.split(';')[0]} />
        ),
      },
      {
        name: 'Nom',
        selector: (row: any) => row.name,
      },
      {
        name: 'Prix(CFA)',
        selector: (row: any) => row.price.$numberDecimal,
      },
      {
        name: 'Qte',
        selector: (row: any) => row.qty,
      },
      {
        name: 'Categorie',
        selector: (row: any) => row.category.name,
      },
      {
        name: 'Promo',
        selector: (row: any) =>
          row.onSale ? row.onSale.discount_rate.$numberDecimal + '%' : '0%',
      },
      {
        name: 'Edit',
        selector: (row: any) => (
          <NavLink
            className="btn btn-secondary"
            to={`/admin/editProduct/${row._id}`}
          >
            <span className="icon-[tabler--pencil] size-4"></span>
          </NavLink>
        ),
      },
      {
        name: 'Delete',
        selector: (row: any) => (
          <Form
            method="post"
            id={'delete_' + row._id}
            action={`/admin/deleteProduct/${row._id}`}
          >
            <button className="btn btn-error">
              <span className="icon-[tabler--x] size-4"></span>
            </button>
          </Form>
        ),
      },
    ]
    return (
      <div className="flex flex-col m-5 p-5 max-w-full overflow-x-auto">
        <DataTableBase columns={columns} data={data} selectableRows />
      </div>
    )
}