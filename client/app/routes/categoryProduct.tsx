import { serverUrl } from "~/utils/serverUrl";
import type { Route } from "./+types/layout";
import { Link, useParams } from "react-router";
import banner from "../banner.jpg"
import CategoryLink from "~/components/category/CategoryLink";
import InfiniteEntity from "~/components/InfinteEntity";
import ProductCard from "~/components/product/ProductCard";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const { id } = params;
  try {
    const req = await fetch(serverUrl + `/product/${id}`, {
      method: "GET",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const response = await req.json();
    return response;
  } catch (error) {
    return { error };
  }
}

export default function categoryProduct({loaderData}: Route.ComponentProps) {
    const {id} = useParams()
    const firstProduct = loaderData[0]
    return(
        <>
        <div className="w-full max-h-72 overflow-hidden relative">
          <img src={banner} className="w-full" />
          <div className="flex justify-center w-full h-full items-center absolute top-0 backdrop-grayscale-100">
            <h1 className="text-3xl lg:text-5xl font-extrabold text-secondary">
              {firstProduct ? firstProduct.category.name : "Categorie vide"}
            </h1>
          </div>
          <div className="absolute bottom-2.5 w-full px-10 font-bold lg:text-lg text-secondary">
            <Link to="/">Accueil</Link> / {firstProduct ? firstProduct.category.name : "Categorie vide"}
          </div>
        </div>

        <div className="w-full flex flex-col lg:flex-row">
          <div className="flex flex-wrap p-10 lg:flex-1/4">
            <CategoryLink/>
          </div>
          <InfiniteEntity
            loaderRoute={`/loaders/categoryProducts/${id}`}
            fetchMoreURL={serverUrl + `/product/${id}`}
            UnitEntity={ProductCard}
          />
        </div>
      </>
    )
}
