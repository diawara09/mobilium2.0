import { Link } from "react-router"
import banner from "../banner.jpg"

import InfiniteEntity from "~/components/InfinteEntity"
import ProductCard from "~/components/product/ProductCard"
import { serverUrl } from "~/utils/serverUrl"

export default function Products() {
    return (
      <>
        <div className="w-full max-h-72 overflow-hidden relative">
          <img src={banner} className="w-full" />
          <div className="flex justify-center w-full h-full items-center absolute top-0 backdrop-grayscale-100">
            <h1 className="text-3xl lg:text-5xl font-extrabold text-secondary">
              Shop
            </h1>
          </div>
          <div className="absolute bottom-2.5 w-full px-10 font-bold lg:text-lg text-secondary">
            <Link to="/">Home</Link> / Shop
          </div>
        </div>

        <div className="w-full">
          <InfiniteEntity
            loaderRoute={`/loaders/allProducts`}
            fetchMoreURL={serverUrl + `/product/`}
            UnitEntity={ProductCard}
          />
        </div>
      </>
    )
}