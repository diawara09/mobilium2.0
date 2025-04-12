import { serverUrl } from "~/utils/serverUrl"
import type { Route } from "./+types/AllSales"
import DataTableBase from "~/components/DataTableBase"
import Countdown from 'react-countdown'
import { Form, NavLink } from "react-router"

export async function clientLoader() {
     try {
       const response = await fetch(serverUrl + '/admin/sales/', {
         method: 'GET',
         credentials: 'include',
         headers: {
           'Content-Type': 'application/json',
         },
       })
       const data = await response.json()
       return data
     } catch (error) {
       return { error }
     }
} 
export default function AllSales({ loaderData }: Route.ComponentProps) {
    const data = loaderData
    const columns = [
      {
        name: 'Image',
        selector: (row: any) => <img src={serverUrl + '/' + row.image} />,
      },
      {
        name: 'Nom',
        selector: (row: any) => row.name,
      },
      {
        name: 'Pourcentage',
        selector: (row: any) => row.discount_rate['$numberDecimal'] + '%',
        sortable: true,
      },
      {
        name: "Date d'expiration",
        selector: (row: any) => {
          let today = new Date(Date.now())
          let expiryDate = new Date(row.expires)
          let difference = expiryDate.getTime() - today.getTime()
          return (
            <Countdown className="text-xl" date={Date.now() + difference}>
              <span className="text-2xl">Expired</span>
            </Countdown>
          )
        },
      },
      {
        name: 'Edit',
        selector: (row: any) => (
          <NavLink
            className="btn btn-secondary"
            to={`/admin/editSale/${row._id}`}
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
            action={`/admin/deleteSale/${row._id}`}
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