import { serverUrl } from "~/utils/serverUrl"

export async function clientLoader() {
    try {
      const response = await fetch(serverUrl + `/addresses/`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const addresses = await response.json()
      return addresses
    } catch (error) {
      return { error }
    }
}