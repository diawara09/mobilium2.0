import { serverUrl } from "~/utils/serverUrl"
import type { Route } from "./+types/DeleteCategory"
import { redirect } from "react-router"

export async function clientAction({ params }:Route.ClientActionArgs) {
    const { id } = params 
    try {
         const response = await fetch(
           serverUrl + `/admin/category/${id}`,
           {
             method: 'DELETE',
             credentials: 'include',
             headers: {
               'Content-Type': 'application/JSON',
             },
           }
         )

         const msg = await response.json()

         return redirect("/admin/allCategories")
    } catch (error) {
        return {error}
    }
}