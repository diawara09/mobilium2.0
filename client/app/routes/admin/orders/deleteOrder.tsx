import { serverUrl } from "~/utils/serverUrl"

import { redirect } from "react-router"
import type { Route } from "../+types/AdminRoot"

export async function clientAction({ params }:Route.ClientActionArgs) {
    const { id } = params 
    try {
         const response = await fetch(
           serverUrl + `/orders/${id}`,
           {
             method: 'DELETE',
             credentials: 'include',
             headers: {
               'Content-Type': 'application/JSON',
             },
           }
         )

         const msg = await response.json()

         return redirect("/admin/allOrders")
    } catch (error) {
        return {error}
    }
}