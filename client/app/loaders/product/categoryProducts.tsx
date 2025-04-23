import { serverUrl } from "~/utils/serverUrl"
import type { Route } from "../../+types/root"

export async function clientLoader({params}: Route.ClientLoaderArgs) {
    const {id} = params
    try {
      const req = await fetch(
        serverUrl + `/product/${id}?cursor=&limit=5`,
        {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
        
        const response = await req.json()
        return response
    } catch (error) {
      return {error}
    }
}