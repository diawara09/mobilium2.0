import { redirect } from "react-router";
import type { Route } from "./+types/layout";
import { serverUrl } from "~/utils/serverUrl";

export async function clientAction({request,params}:Route.ClientActionArgs){
    const {address} = params
    try {
        const req = await fetch(serverUrl + `/orders/?addressId=${address}`,{
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({}),
        })
        const response = await req.json()
        console.log(response);
        if(response.msg) return redirect("/cashCheckoutSucceeded")
        return redirect("/cashCheckoutFailed")
        
    } catch (error) {
        return redirect("/cart")
    }

}