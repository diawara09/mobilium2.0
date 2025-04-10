import { serverUrl } from "~/utils/serverUrl";

export async function clientLoader() {
    try {
         const req = await fetch(serverUrl + '/admin/category/primary', {
           method: 'GET',
           credentials: 'include',
           headers: {
             'Content-Type': 'application/json',
           },
         })
        const primeCategories = await req.json()
        return primeCategories.data
        
    } catch (error) {
        return {error}
    }
   
}