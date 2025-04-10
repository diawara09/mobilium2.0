import { useFetcher, useNavigate } from "react-router"
import type { Route } from "./+types/login"
import { serverUrl } from "~/utils/serverUrl"
import toast, { Toaster } from 'react-hot-toast'
import { UserContext } from "~/utils/contexts"
import { useContext, useEffect } from "react"
export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Login Page!' },
    { name: 'description', content: 'This is the page' },
  ]
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData()
  const objBody = Object.fromEntries(formData)
  try {
    const req = await fetch(serverUrl + '/auth/login/email', {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(objBody),
    })
    const response = await req.json()
    return response
  } catch (error: any) {
    return { error: error.message }
  }
}
export function HydrateFallback() {
  return (
    <>
      <div className="flex w-52 flex-col gap-4">
        <div className="skeleton skeleton-animated h-32 w-full"></div>
        <div className="skeleton skeleton-animated h-4 w-28"></div>
        <div className="skeleton skeleton-animated h-4 w-full"></div>
        <div className="skeleton skeleton-animated h-4 w-full"></div>
      </div>
    </>
  )
}

export default function Login() {

    const fetcher = useFetcher()
    const guest =
      Boolean(localStorage.getItem('user_id')) === true
        ? localStorage.getItem('user_id')
        : 'no guest'
    //console.log(guest)
    const navigate = useNavigate()
    const user = useContext(UserContext)

    useEffect(() => {
      if (!user.msg) navigate('/admin')
      const toastOptions = {
        duration: 5000,
      }
      toast.dismiss()
      fetcher.data
        ? fetcher.data.msg
          ? toast.success(fetcher.data.msg, toastOptions)
          : toast.error(fetcher.data, toastOptions)
        : ''
    }, [fetcher])
    return (
      <div className="w-full flex p-5 justify-center items-center">
        <fetcher.Form method="post" className="card rounded-none lg:min-w-96 sm:max-w-sm">
          <div className="card-body">
            <h5 className="card-title mb-0">Connectez-vous</h5>
            <div className="text-base-content/50 mb-6">
              Vous recevrez un email dans votre inbox.
            </div>
            <div className="">
              <label className="label-text" htmlFor="labelAndHelperTextRight">
                Email
              </label>
              <input
                type="text"
                placeholder="example@email.com"
                name="email"
                            className="input"
                            required
                id="labelAndHelperTextRight"
              />
              <span className="helper-text text-end">
                Assurez vous d'y avoir acces!
              </span>
            </div>
            <input type="hidden" name="id" value={guest} />
            <Toaster />
            <div className="card-actions">
              <button type="submit" className="btn btn-primary">
                {' '}
                {fetcher.state === 'idle' ? (
                  'Envoyer'
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