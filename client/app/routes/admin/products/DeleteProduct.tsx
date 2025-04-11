import { serverUrl } from "~/utils/serverUrl";
import type { Route } from "./+types/DeleteProduct";
import { redirect } from "react-router";

export async function clientAction({ params }:Route.ClientActionArgs) {
    const { id } = params

    try {
        const req = await fetch(
          serverUrl + `/admin/product/${id}?type=product`,
          {
            method: 'DELETE',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
          }
        )
        const msg = await req.json()
        return redirect("/admin/allProducts")
    } catch (error) {
        return {error}
    }
    
    
}