import type { Route } from './+types/home'

import Navbar from '~/components/Navbar'
import Footer from '~/components/Footer'
import { Outlet } from 'react-router'
import { serverUrl } from '~/utils/serverUrl'
import { UserContext } from '~/utils/contexts'


export async function clientLoader() {
  const req = await fetch(serverUrl + '/auth/login/status', {
    method: 'GET',
    mode: 'cors',
    credentials:'include',
    headers: {
        'Content-Type': 'application/json',
    },
  })
  const response = await req.json()
  console.log(response)
  if (response.error) return

  return response
}

export default function Layout({ loaderData }: Route.ComponentProps) {
  const user = loaderData
  return (
    <>
      <UserContext value={user}>
        <Navbar />
        <Outlet />
        <Footer />
      </UserContext>
    </>
  ) 
}
