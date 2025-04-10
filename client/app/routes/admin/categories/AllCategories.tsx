import { serverUrl } from "~/utils/serverUrl"
import type { Route } from "./+types/AllCategories"
import DataTableBase from "~/components/DataTableBase"
import { Form, NavLink, useFetcher } from "react-router"

export async function clientLoader() {
    try {
        const req = await fetch(serverUrl + "/categories/", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
        const response = await req.json()
        return response
    } catch (error) {
        return {error}
    }
}




export default function AllCategories({ loaderData }: Route.ComponentProps) {
    const allCategories = loaderData
    const columns = [
      {
        name: '',
        selector: (row: any) => <img src={row.image} />,
      },
      {
        name: 'Name',
        selector: (row: any) => row.name,
        sortable: true,
      },
      {
        name: '',
        selector: (row: any) => row.year,
        sortable: true,
      },
      {
        name: 'Edit',
        selector: (row: any) => (
          <NavLink
            className="btn btn-secondary"
            to={`/admin/editCategory/${row._id}`}
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
                id={"delete_"+row._id}
            action={`/admin/deleteCategory/${row._id}`}
          >
            <button className="btn btn-error">
             
                <span className="icon-[tabler--x] size-4"></span>
             
            </button>
          </Form>
        ),
      },
    ]

   
    
    return (<div className="flex flex-col m-5 p-5 max-w-full overflow-x-auto">
        <DataTableBase columns={columns} data={allCategories} selectableRows />
    </div>)
}