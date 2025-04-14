import { redirect } from "react-router"
import { serverUrl } from "~/utils/serverUrl"
import type { Route } from "./+types/deleteItem"

export async function clientAction({ params,request }: Route.ClientActionArgs) {
    const { id } = params
    const formData = await request.formData()
    const bodyObj = Object.fromEntries(formData)

    try {
        const response = await fetch(
          serverUrl + `/cart/${id}?itemId=${bodyObj.itemId}`,
          {
            method: 'DELETE',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        const msg = await response.json()
        if (!msg.error) return redirect(bodyObj.prevLocation)
        throw new Error(msg.error)
    } catch (error) {
        return {error}
    }
    
}