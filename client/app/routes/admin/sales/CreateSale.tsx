import { useFetcher } from "react-router"
import toast, {Toaster} from 'react-hot-toast'
import { useEffect } from "react"
import { serverUrl } from "~/utils/serverUrl"
import type { Route } from "./+types/CreateSale"



export async function clientAction({ request }: Route.ClientActionArgs) {
  console.log('Inside Sales action')
  // Get the formData from the form
  const formData = await request.formData()
  let url = serverUrl + '/admin/sales/imageless'

  // Get the image name
  const imageName = formData.get('image').name

  if (imageName !== '') {
    url = serverUrl + '/admin/sales/'
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      credentials: 'include',
      body: formData,
    })
    const data = await response.json()
    console.log(data)
    return data
  } catch (error) {
    return { error: error }
  }
}


export default function CreateSale() {
    const fetcher = useFetcher()
     useEffect(() => {
       const toastOptions = {
         duration: 5000,
         id: Math.round(Math.random() * 1e9),
       }
       toast.dismiss()

       fetcher.data
         ? fetcher.data.error
           ? toast.error(fetcher.data.error, toastOptions)
           : toast.success(fetcher.data.msg, toastOptions)
         : ''
     }, [fetcher])
    return (
      <div className="w-full flex m-5 p-5 justify-center items-center">
        <fetcher.Form
          method="post"
          className="card rounded-none lg:min-w-96 sm:max-w-sm"
          encType="multipart/form-data"
        >
          <div className="card-body">
            <h5 className="card-title mb-0">Creer une Promotion</h5>
            <div className="text-base-content/50 mb-6"></div>
            <div className="">
              <label className="label">
                <span className="label-text">Nom(*)</span>
              </label>
              <input
                type="text"
                placeholder="Name"
                className="input"
                name="name"
                required
              />
            </div>
            <div className="">
              <label className="label">
                <span className="label-text">Pourcentage(*)</span>
              </label>
              <input
                type="number"
                step=".01"
                min="0"
                placeholder="0.00"
                className="input"
                name="discount_rate"
                required
              />
            </div>
            <div className=" mb-5">
              <label className="label">
                <span className="label-text">Image</span>
              </label>
              <input type="file" className="input" name="image" />
            </div>
            <div className=" mb-5">
              <label className="label">
                <span className="label-text">Date d'expiration(*)</span>
              </label>
              <input type="date" className="input" name="expires" required />
              <div className=" mt-6">
                <button className="btn btn-primary">
                  {' '}
                  {fetcher.state === 'submitting' ? (
                    <span className="loading loading-infinity loading-md"></span>
                  ) : (
                    'Creer'
                  )}
                </button>
              </div>
            </div>
            <Toaster />
          </div>
        </fetcher.Form>
      </div>
    )
}