import { serverUrl } from "~/utils/serverUrl"

export async function clientLoader() {
    try {
      const req = await fetch(
        serverUrl + `/product/?type='product'&cursor=&limit=5`,
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