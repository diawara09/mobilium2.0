import {redirect} from "react-router"
import type { Route } from "./+types/changeQty"
import { serverUrl } from "~/utils/serverUrl"

export async function clientAction({request}: Route.ClientActionArgs){
    const formData = await request.formData()
    const bodyObj = Object.fromEntries(formData)

    try {
        const response = await fetch(
          serverUrl + `/cart/${bodyObj.cartId}`,
          {
            method: 'PATCH',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bodyObj),
          }
        )
        const msg = await response.json()
        if (!msg.error) return redirect(bodyObj.prevLocation)
        throw new Error(msg.error)
    } catch (error) {
        throw new Error(error.message)
    }
}