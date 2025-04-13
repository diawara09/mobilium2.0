import { serverUrl } from "~/utils/serverUrl"

export async function clientLoader(){
    try {
       const guestSession = localStorage.getItem('user_id') || ''
       const cartResponse = await fetch(
         serverUrl + `/cart/?guest=${guestSession}`,
         {
           method: 'GET',
           credentials: 'include',
           headers: {
             'Content-Type': 'application/json',
           },
         }
       )
        const cart = await cartResponse.json()
        console.log(cart);
       return cart
  } catch (error) {
    return {error}
  }
}