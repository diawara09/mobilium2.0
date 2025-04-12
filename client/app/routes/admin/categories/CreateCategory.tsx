import { useFetcher } from "react-router"
import toast, { Toaster } from "react-hot-toast"
import PrimeCategoriesSelect from "~/components/category/PrimeCategoriesSelect"
import { useEffect } from "react"
import type { Route } from "./+types/CreateCategory"
import { serverUrl } from '~/utils/serverUrl'

export async function clientAction({ request }: Route.ClientActionArgs) {
  const formData = await request.formData()
  const fileName = formData.get('image').name
  let url
  let bodyForm
  if (fileName === '') {
    const bodyObject = Object.fromEntries(formData)

    delete bodyObject.image
    url = serverUrl + '/admin/category/'
    bodyForm = JSON.stringify(bodyObject)
    console.log(bodyForm)
  } else {
    url = serverUrl + '/admin/category/multer'
    bodyForm = formData
  }
  console.log(bodyForm)

  const contentHeaders =
    typeof bodyForm === 'string'
      ? {
          'Content-Type': 'application/json',
        }
      : {}
  try {
    const response = await fetch(url, {
      method: 'POST',
      credentials: 'include',
      headers: contentHeaders,
      body: bodyForm,
    })

    const category = await response.json()
    return category
  } catch (error) {
    return { error: error}
  }
}

export default function CreateCategory() {
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
          : toast.success('Category created with success!', toastOptions)
        : ''
    }, [fetcher])

    return (
       <div className="w-full flex m-5 p-5 justify-center items-center">
            <fetcher.Form
                encType="multipart/form-data"
          method="post"
          className="card rounded-none lg:min-w-96 sm:max-w-sm"
        >
          <div className="card-body">
            <h5 className="card-title mb-0">Creer une Categorie</h5>
            <div className="text-base-content/50 mb-6"></div>
            <div className="">
              <label className="label-text">Name</label>
              <input
                type="text"
                placeholder="Porte"
                name="name"
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
              <PrimeCategoriesSelect defaultValue={""} name="parent_id" />
            </div>
            <Toaster />
            <div className="card-actions">
              <button type="submit" className="btn btn-primary">
                {' '}
                {fetcher.state === 'idle' ? (
                  'Creer'
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