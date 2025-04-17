import { serverUrl } from "~/utils/serverUrl";
import type { Route } from "../+types/AdminRoot";
import { redirect } from "react-router";

export async function clientAction({request, params}:Route.ClientActionArgs){
    const formData = await request.formData()
    const {id} = params 
   

    try {
        const req = await fetch(serverUrl + `/orders/${id}`, {
            method: "PATCH",
            mode: "cors",
            credentials: "include",
            headers: {
                'Content-Type': 'application/JSON',
              },
            body: JSON.stringify(Object.fromEntries(formData))
        })
        const response = await req.json()
        return redirect("/admin/allOrders")
        
    } catch (error) {
        return {error}
    }

}