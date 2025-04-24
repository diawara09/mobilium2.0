import type { Route } from './+types/home'
import { Welcome } from '../welcome/welcome'
import Navbar from '~/components/Navbar'
import Footer from '~/components/Footer'

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Mobilium' },
    { name: 'description', content: 'Bienvenu sur Mobilium!' },
  ]
}

export default function Home() {
  return (
    <>
      
       
      <Welcome />
      
    </>
  ) 
}
