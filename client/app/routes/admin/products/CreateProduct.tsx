import { useEffect, useState } from 'react'
import { useFetcher } from 'react-router'
import toast, { Toaster } from 'react-hot-toast'

import ProductTypeSelector from '~/components/product/ProductTypeSelector'
import SalesSelector from '~/components/sale/SalesSelector'
import AllCategorySelector from '~/components/category/AllCategorySelect'
import type { Route } from './+types/CreateProduct'
import { serverUrl } from '~/utils/serverUrl'



export async function clientAction({ request }:Route.ClientActionArgs) {
  const formData = await request.formData()
  //console.log(JSON.stringify(Object.fromEntries(formData)));

  try {
    const response = await fetch(serverUrl + '/admin/product/', {
      method: 'POST',
      credentials: 'include',
      body: formData,
    })

    const data = await response.json()
    return data
  } catch (error) {
    return { error }
  }
}

export default function CreateProduct() {
     const fetcher = useFetcher()
     // const navigate = useNavigate()
     const [type, setType] = useState('')
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
       //navigate('/admin/products/view')
     }, [fetcher])
    return (
      <div className="w-full flex m-5 p-5 justify-center items-center">
        <fetcher.Form
          method="post"
          className="card rounded-none p-5 lg:min-w-96 sm:max-w-sm"
          encType="multipart/form-data"
        >
          <div className="">
            <span className="label-text">Name</span>

            <input
              type="text"
              placeholder="Name"
              className="input"
              name="name"
              required
            />
          </div>
          <div>
            <span className="label-text">Price</span>

            <input
              type="number"
              step=".01"
              min="0"
              placeholder="0.00"
              className="input"
              name="price"
              required
            />
          </div>
          <div>
            <span className="label-text">Description</span>

            <textarea
              placeholder="Desc"
              className="textarea textarea-lg w-full max-w-xs"
              name="description"
              required
            ></textarea>
          </div>

          <div>
            <span className="label-text">Quantity</span>

            <input
              type="number"
              step="1"
              min="0"
              placeholder="0"
              className="input"
              name="qty"
              required
            />
          </div>
          <div className="form-control mb-5">
            <span className="label-text">Images</span>

            <input
              type="file"
              className="input w-full max-w-xs"
              name="images"
              multiple
              required
            />
          </div>
          <div className="form-control mb-5">
            <span className="label-text">Type</span>

            <select
              name="type"
              onChange={(e) => setType(e.target.value)}
              defaultValue="product"
              className="select  w-full max-w-xs"
            >
              <option value="product" disabled>
                Product
              </option>
              <option value="furniture">Furniture</option>
              <option value="clothing">Clothing</option>
            </select>
          </div>
          <ProductTypeSelector dValues={null} type={type} />
          <AllCategorySelector defaultValue={null} name="category" />
          <SalesSelector defaultValue={null} name="onSale" />
          <div>
            <span className="label-text">Additional Infos</span>

            <textarea
              placeholder="Desc"
              className="textarea textarea-bordered textarea-lg w-full max-w-xs"
              name="additional_info"
            ></textarea>
          </div>
          <Toaster />
          <div className="form-control mt-6">
            <button className="btn btn-primary">
              {' '}
              {fetcher.state === 'submitting' ? (
                <span className="loading loading-infinity loading-md"></span>
              ) : (
                'Creer'
              )}
            </button>
          </div>
        </fetcher.Form>
      </div>
    )
}
