import { useEffect } from "react"
import { useFetcher } from "react-router"
import AddressCard from "./AddressCard"

export default function AddressList(){
    const fetcher = useFetcher()

    useEffect(()=>{
        if(!fetcher.data && fetcher.state === 'idle'){
            fetcher.load("/loaders/allAddresses")
        }

    },[fetcher.data])
    return(<div className="flex flex-col w-full justify-center items-center lg:flex-row p-5 ">
        {fetcher.data && fetcher.data.length > 0 ? fetcher.data.map(item => <AddressCard item={item} key={item._id} /> ) : "Pas d'adresse!"}
    </div>)
}