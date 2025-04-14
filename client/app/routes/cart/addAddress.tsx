import { serverUrl } from "~/utils/serverUrl"
import type { Route } from "./+types/addAddress"
import { redirect } from "react-router"

export async function clientAction({ request }: Route.ClientActionArgs) {
    const formData = await request.formData()
    const bodyObject = Object.fromEntries(formData)
    try {
        const response = await fetch(serverUrl + `/addresses/`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(bodyObject),
        })
        const newAddress = await response.json()
        if(!newAddress.error) return redirect(`/checkout/${newAddress.id}`)
        return newAddress
        
    } catch (error) {
        return {error}
    }
    
}