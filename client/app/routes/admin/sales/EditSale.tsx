import type { Route } from "./+types/EditSale";
import { useEffect, useState } from "react";
import toast, { Toaster } from 'react-hot-toast'
import { useFetcher } from "react-router";
import { serverUrl } from "~/utils/serverUrl";
import DatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'
export async function clientLoader({ params }: Route.ClientLoaderArgs) {
    const { id } = params
     try {
       const response = await fetch(
         serverUrl + `/admin/sales/${id}`,
         {
           method: 'GET',
           credentials: 'include',
           headers: {
             'Content-Type': 'application/json',
           },
         }
       )
       const data = await response.json()
       console.log(data)
       return data
     } catch (error) {
       return {error}
     }
    
}

export async function clientAction({ params, request }:Route.ClientActionArgs) {
  const formData = await request.formData()
  const imageName = formData.get('image').name
  const { id } = params

  try {
    const response = await fetch(
      serverUrl+`/admin/sales/${id}`,
      {
        method: imageName === '' ? 'PATCH' : 'PUT',
        credentials: 'include',
        body: formData,
      }
    )
    const data = await response.json()
    return data
  } catch (error) {
    return { error }
  }
}



export default function EditSale({loaderData}:Route.ComponentProps) {
    const fetcher = useFetcher()
    const singleSale = loaderData
     const [startDate, setStartDate] = useState(singleSale.expires)
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
                defaultValue={singleSale.name}
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
                defaultValue={singleSale.discount_rate.$numberDecimal}
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
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
              <input
                name="expires"
                className="input input-bordered"
                type="hidden"
                            value={new Date(startDate).toISOString()}
                            required
              />
              <div className=" mt-6">
                <button className="btn btn-warning">
                  {' '}
                  {fetcher.state === 'submitting' ? (
                    <span className="loading loading-infinity loading-md"></span>
                  ) : (
                    'Edit'
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