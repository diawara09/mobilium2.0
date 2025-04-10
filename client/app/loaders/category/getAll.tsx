import { serverUrl } from "~/utils/serverUrl"

export async function clientLoader() {
    try {
        const req = await fetch(serverUrl + "/categories/", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
        const response = await req.json()
        return response
    } catch (error) {
        return {error}
    }
}