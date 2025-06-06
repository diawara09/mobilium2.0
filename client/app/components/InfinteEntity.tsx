/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react'
import { useFetcher } from 'react-router'
import InfiniteScroll from 'react-infinite-scroll-component'
//import { FaPlus } from 'react-icons/fa6'
//import { url } from '../../../utils/serverUrl'
//import PostCardAdmin from '../../../components/admin/postCardAdmin'
//import AnimatedLayout from '../../animation/animatedLayout'
//import ProductCard from '../../components/productCard'

//THIS IS THE CUSTOM HOOK

const usePrevLocation = (location) => {

    const prevLocRef = useRef(location)
    
    useEffect(()=>{
    
    prevLocRef.current = location
    
    },[location])
    
    return prevLocRef.current
    
    }

export default function InfiniteEntity({
  loaderRoute,
  fetchMoreURL,
  UnitEntity,
}) {

  const fetcher = useFetcher()
  const [items, setItems] = useState([])
  const [cursor, setCursor] = useState(null)
  const [hasMore, setHasMore] = useState(true)
  const prevLoader = usePrevLocation(loaderRoute)

  useEffect(() => {
    if ((!fetcher.data && fetcher.state === 'idle') || prevLoader !== loaderRoute) {
      fetcher.load(loaderRoute)
    }
    if (fetcher.data) setItems(fetcher.data)
    cursor ? fetchMoreData() : ''
  }, [cursor, fetcher.data,loaderRoute])

  const fetchMoreData = async () => {
    let completeUrl = fetchMoreURL + `?cursor=${cursor || ''}&limit=${5}`
    if (completeUrl.includes('?')) {
      completeUrl = fetchMoreURL + `&cursor=${cursor || ''}&limit=${5}`
    }
    try {
      const response = await fetch(
        fetchMoreURL + `?cursor=${cursor || ''}&limit=${5}`,
        {
          method: 'GET',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
        }
      )
      const moreItems = await response.json()
      console.log(moreItems)
      setItems((prevItems) => [...prevItems, ...moreItems])

      moreItems.length > 0 ? setHasMore(true) : setHasMore(false)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="w-full">
      {items.length > 0 ? (
        <InfiniteScroll
          dataLength={items.length || 0}
          next={() => setCursor(items[items.length - 1]._id)}
          hasMore={hasMore}
          loader={
            <div className='w-full flex justify-center'>
              <span className="loading loading-ball mx-auto loading-lg"></span>
            </div>
          }
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b className="text-white">Yay! You have seen it all</b>
            </p>
          }
        >
          <div className="flex flex-wrap bg-base-200 justify-center items-center w-full rounded-box p-5 lg:p-10 gap-5">
            {items.map((item) => (
              <UnitEntity item={item} key={item._id} />
            ))}
          </div>
        </InfiniteScroll>
      ) : (
        <p className="text-center text-white">No Data</p>
      )}
    </div>
  )
}
