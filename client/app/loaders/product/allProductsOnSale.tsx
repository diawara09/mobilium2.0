import { serverUrl } from "~/utils/serverUrl"

export async function clientLoader(){
    try {
        const req = await fetch(serverUrl + `/product/sales?cursor=&limit=5`, {
            method: "GET",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }

        })
        const response = await req.json()
        console.log(response);
        return response
        
    } catch (error) {
        return {error}
    }
}