import { useFetcher } from "react-router"
import type { Route } from "./+types/EditCategory"
import { serverUrl } from "~/utils/serverUrl"
import toast, { Toaster } from "react-hot-toast"
import { useEffect } from "react"
import PrimeCategoriesSelect from "~/components/category/PrimeCategoriesSelect"


export async function clientLoader({ params }: Route.ClientLoaderArgs) {
    const { id } = params
    try {
        const req = await fetch(serverUrl + `/admin/category/${id}`, {
            method: "GET",
            mode:'cors',
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

export async function clientAction({ request,params }: Route.ClientActionArgs) {
    const formData = await request.formData()
    const fileName = formData.get('image').name
    const bodyObject = Object.fromEntries(formData)
    console.log(bodyObject)
    const { id } = params
    const url = serverUrl + `/admin/category/${id}`
    const method = fileName.trim() === '' ? 'PATCH' : 'PUT'
    const finalBody =
      fileName.trim() === '' ? JSON.stringify(bodyObject) : formData
    const headersContent =
      fileName.trim() === '' ? { 'Content-Type': 'application/json' } : {}
    console.log(finalBody)

    try {
      const response = await fetch(url, {
        method: method,
        credentials: 'include',
        headers: headersContent,
        body: finalBody,
      })
      const category = await response.json()
      return category
    } catch (error) {
      return {error}
    }
}

export default function EditCategory({ loaderData }: Route.ComponentProps) {
    const category = loaderData
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
          : toast.success('Category modified with success!', toastOptions)
        : ''
    }, [fetcher])
   
    return (
      <div className="w-full flex m-5 p-5 justify-center items-center">
        <fetcher.Form
          encType="multipart/form-data"
          method="post"
          className="card rounded-none lg:min-w-96 sm:max-w-sm"
        >
          {category.image ? (
            
                <img src={serverUrl +"/"+category.image} />
             
           
          ) : (
            ''
          )}
          <div className="card-body">
            <h5 className="card-title mb-0">Modifier une Categorie</h5>
            <div className="text-base-content/50 mb-6"></div>
            <div className="">
              <label className="label-text">Name</label>
              <input
                type="text"
                placeholder="Porte"
                name="name"
                defaultValue={category.name}
                className="input"
                required
              />
            </div>
            <div className="">
              <label className="label-text">Image</label>
              <input
                type="file"
                name="image"
                className="input max-w-sm"
                aria-label="file-input"
              />
            </div>
            <div className="">
              <label className="label-text">Parent</label>
              <PrimeCategoriesSelect
                defaultValue={category.parent_id}
            
                name="parent_id"
              />
            </div>
            <Toaster />
            <div className="card-actions">
              <button type="submit" className="btn btn-warning">
                {' '}
                {fetcher.state === 'idle' ? (
                  'Edit'
                ) : (
                  <span className="loading loading-ball"></span>
                )}{' '}
              </button>
            </div>
          </div>
        </fetcher.Form>
      </div>
    )
}