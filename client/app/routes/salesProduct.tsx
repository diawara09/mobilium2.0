import { serverUrl } from "~/utils/serverUrl";
import type { Route } from "./+types/layout";
import { Link, useLocation, useNavigate, useParams } from "react-router";
import banner from "../banner.jpg"
//import CategoryLink from "~/components/category/CategoryLink";
import InfiniteEntity from "~/components/InfinteEntity";
import ProductCard from "~/components/product/ProductCard";
import SaleLink from "~/components/sale/SaleLink";



export default function SalesProduct({loaderData}: Route.ComponentProps) {
   
   
    return(
        <>
        <div className="w-full max-h-72 overflow-hidden relative">
          <img src={banner} className="w-full" />
          <div className="flex justify-center w-full h-full items-center absolute top-0 backdrop-grayscale-100">
            <h1 className="text-3xl lg:text-5xl font-extrabold text-secondary">
               Promotions
            </h1>
          </div>
          <div className="absolute bottom-2.5 w-full px-10 font-bold lg:text-lg text-secondary">
            <Link to="/">Accueil</Link> / Promotions
          </div>
        </div>

        <div className="w-full flex flex-col lg:flex-row">
          <div className="flex flex-wrap p-10 lg:flex-1/4">
            <SaleLink/>
          </div>
          <InfiniteEntity
            loaderRoute={`/loaders/allProductsOnSale`}
            fetchMoreURL={serverUrl + `/product/sales`}
            UnitEntity={ProductCard}
          />
        </div>
      </>
    )
}
