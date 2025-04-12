
import { useEffect, useState } from 'react'
import { useFetcher } from 'react-router'
import toast, { Toaster } from 'react-hot-toast'

import ProductTypeSelector from '~/components/product/ProductTypeSelector'
import SalesSelector from '~/components/sale/SalesSelector'
import AllCategorySelector from '~/components/category/AllCategorySelect'
import { serverUrl } from "~/utils/serverUrl"
import type { Route } from "./+types/EditProduct"

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
    const {id} = params
    try {
        const req = await fetch(serverUrl + `/admin/product/${id}?type=product`, {
            method: "GET",
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const category = await req.json()
        return category
    } catch (error) {
        return {error}
    }
}

export async function clientAction({request, params }: Route.ClientActionArgs) {
     const { id } = params
     const formData = await request.formData()
    
     const url = serverUrl + `/admin/product/${id}`
     let methodName = 'PUT'
     let bodyObj = formData
     let headersObj = {}

     // Setting the request options for there is no image with the request
     if (formData.get('images').name === '') {
       methodName = 'PATCH'
       bodyObj = JSON.stringify(Object.fromEntries(formData))
       headersObj = { 'Content-Type': 'application/json' }
     }
     try {
       const data = await SendRequest(url, methodName, bodyObj, headersObj)
       return data
     } catch (error) {
       return { error: error }
     }
   
    
}
async function SendRequest(url:any, methodName:any, bodyObj:any, headersObj:any) {
  try {
    const response = await fetch(url, {
      method: methodName,
      credentials: 'include',
      headers: headersObj,
      body: bodyObj,
    })
    const data = await response.json()
    return data
  } catch (error) {
    return { error: error }
  }
}

export default function EditProduct({loaderData}: Route.ComponentProps) {
    const product = loaderData
    const details =
      product.type === 'furniture'
        ? {
            color: product.color,
            material: product.material,
            width: product.width,
            length: product.length,
          }
        : product.type === 'clothing'
        ? { color: product.color, size: product.size }
        : ''
    const fetcher = useFetcher()
   
    const [type, setType] = useState(product.type)
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
          className="card rounded-none p-5 lg:min-w-96 sm:max-w-sm"
          encType="multipart/form-data"
        >
          <div className="card-body">
            <h5 className="card-title mb-0">Modifier un Produit</h5>
            <div className="text-base-content/50 mb-6"></div>
            <div className="">
              <span className="label-text">Nom(*)</span>

              <input
                type="text"
                placeholder="Name"
                className="input"
                name="name"
                defaultValue={product.name}
                required
              />
            </div>
            <div>
              <span className="label-text">Prix(*)</span>

              <input
                type="number"
                step=".01"
                min="0"
                placeholder="0.00"
                className="input"
                defaultValue={product.price['$numberDecimal']}
                name="price"
                required
              />
            </div>
            <div>
              <span className="label-text">Description(*)</span>

              <textarea
                placeholder="Desc"
                className="textarea textarea-lg w-full max-w-xs"
                name="description"
                required
              >
                {product.description}
              </textarea>
            </div>

            <div>
              <span className="label-text">Quantite(*)</span>

              <input
                type="number"
                step="1"
                min="0"
                placeholder="0"
                className="input"
                name="qty"
                defaultValue={product.qty}
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
              />
            </div>
            <div className="form-control mb-5">
              <span className="label-text">Type</span>

              <select
                name="type"
                onChange={(e) => setType(e.target.value)}
                defaultValue={product.type}
                className="select  w-full max-w-xs"
              >
                <option value="product" disabled>
                  Product
                </option>
                <option value="furniture">Fourniture</option>
              </select>
            </div>
            <ProductTypeSelector type={type} dValues={details} />
            <AllCategorySelector
              defaultValue={product.category.category_id}
              name="category"
            />
            <SalesSelector
              defaultValue={product.onSale ? product.onSale.sales_id : null}
              name="onSale"
            />
            <div>
              <span className="label-text">Plus d'infos</span>

              <textarea
                placeholder="Desc"
                className="textarea textarea-bordered textarea-lg w-full max-w-xs"
                name="additional_info"
              >
                {product.additional_info}
              </textarea>
            </div>
            <Toaster />
            <div className="form-control mt-6">
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
        </fetcher.Form>
      </div>
    )
}