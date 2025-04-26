import { useState, useEffect } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { useLoaderData, Outlet, useParams, } from 'react-router'
import { serverUrl } from '~/utils/serverUrl'



const stripePromise = loadStripe(
  'pk_live_51JQRmnCrM5sxvtxSViPuA5lEmVw1Jdj9vTST6tpAxn5po1PIxrt3Dk126ExQMNDIkSIHBwViBFwqOXKWTdzMqZQD00y6bqHRc4'
)
export default function Checkout(){
    const { address } = useParams()
  //console.log(address)
  //const cart = useLoaderData()
  //console.log(cart)
  //const navigate = useNavigate()

  const [clientSecret, setClientSecret] = useState('')
  const [dpmCheckerLink, setDpmCheckerLink] = useState('')
 console.log(dpmCheckerLink);
  useEffect(() => {
    
    // Create PaymentIntent as soon as the page loads
    fetch(
      serverUrl + `/stripe/create-payment-intent?addressId=${address}`,
      {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.error) console.log(data.error)
        console.log('client secret: ' + data.clientSecret)
        setClientSecret(data.clientSecret)
        // [DEV] For demo purposes only
        setDpmCheckerLink(data.dpmCheckerLink)
      })
      .catch((error) => console.log(error))
  }, [])

  const appearance = {
    theme: 'stripe',
  }
  const options = {
    clientSecret,
    appearance,
  }
    return(<>
     <div className="card p-5 m-5 bg-base-100 w-full max-w-md shrink-0 shadow-2xl">
            {clientSecret && (
              <Elements options={options} stripe={stripePromise}>
                <Outlet />
              </Elements>
            )}
     </div>
    </>)

}