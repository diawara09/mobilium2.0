import { serverUrl } from "~/utils/serverUrl";
import type { Route } from "./+types/deleteSale";
import { redirect } from "react-router";

export async function clientAction({ params }: Route.ClientActionArgs) {
    const { id } = params
    try {
        const response = await fetch(
          serverUrl + `/admin/sales/${id}`,
          {
            method: 'DELETE',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
          }
        )

        const msg = await response.json()
        return redirect("/admin/allSales")
        
    } catch (error) {
        return {error}
    }
    
}