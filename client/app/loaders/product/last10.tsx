import { serverUrl } from "~/utils/serverUrl"

export async function clientLoader(){
    try {
        const req = await fetch(serverUrl + "/product/last10", {
            method: "GET",
            credentials: 'include',
            mode: 'cors',
            headers:{
                'Content-Type': 'application/json'
            }
        })
        const response = await req.json()
        console.log(response);
        return response
    } catch (error) {
        return {error}
    }
}