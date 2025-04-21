import { serverUrl } from "~/utils/serverUrl";
import type { Route } from "./+types/layout";
import banner from "../banner.jpg";
import { Link, useFetcher, useLocation } from "react-router";
export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const { id } = params;
  try {
    const req = await fetch(serverUrl + `/product/single/${id}`, {
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

export default function SingleProduct({ loaderData }: Route.ComponentProps) {
  const product = loaderData;
  const fetcher = useFetcher();
  const location = useLocation()
  const images = product.images.split(";");
  return (
    <>
      <div className="w-full max-h-72 overflow-hidden relative">
        <img src={banner} className="w-full" />
        <div className="flex justify-center w-full h-full items-center absolute top-0 backdrop-grayscale-100">
          <h1 className="text-3xl lg:text-5xl font-extrabold text-secondary">
            Produit
          </h1>
        </div>
        <div className="absolute bottom-2.5 w-full px-10 font-bold lg:text-lg text-secondary">
          <Link to="/">Accueil</Link> / Produit
        </div>
      </div>
      <div className="flex flex-wrap lg:flex-row shadow-md lg:max-w-9/10 mx-auto p-5">
        <div className="flex lg:min-w-1/2 flex-1 min-w-60 shrink-0">
          <div
            id="horizontal-thumbnails"
            data-carousel='{ "loadingClassNamees": "opacity-0" }'
            className="relative w-full"
          >
            <div className="carousel rounded-none">
              <div className="carousel-body h-3/4 opacity-0">
                {images.map((image) => (
                  <div className="carousel-slide">
                    <div className="flex size-full justify-center">
                      <img
                        src={serverUrl + "/" + image}
                        className="size-full object-cover"
                        alt="product image"
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="carousel-pagination bg-base-100 absolute bottom-0 end-0 start-0 z-1 h-1/4 flex justify-center gap-2 overflow-x-auto pt-2">
                {images.length > 1
                  ? images.map((image) => (
                      <img
                        src={serverUrl + "/" + image}
                        className="carousel-pagination-item carousel-active:opacity-100 grow object-cover opacity-30"
                        alt="image pagination"
                      />
                    ))
                  : ""}
              </div>

              <button type="button" className="carousel-prev">
                <span className="mb-15" aria-hidden="true">
                  <span className="size-9.5 bg-base-100 flex items-center justify-center rounded-full shadow-base-300/20 shadow-sm">
                    <span className="icon-[tabler--chevron-left] size-5 cursor-pointer rtl:rotate-180"></span>
                  </span>
                </span>
                <span className="sr-only">Previous</span>
              </button>

              <button type="button" className="carousel-next">
                <span className="sr-only">Next</span>
                <span className="mb-15" aria-hidden="true">
                  <span className="size-9.5 bg-base-100 flex items-center justify-center rounded-full shadow-base-300/20 shadow-sm">
                    <span className="icon-[tabler--chevron-right] size-5 cursor-pointer rtl:rotate-180"></span>
                  </span>
                </span>
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:min-w-1/2 flex-1  p-5">
          <span className="text-lg font bold"> {product.name} </span>
          <span className="text-lg text-primary font bold">
            {product.onSale
              ? (
                  product.price.$numberDecimal -
                  (product.onSale.discount_rate.$numberDecimal / 100) *
                    product.price.$numberDecimal
                ).toFixed(2)
              : product.price.$numberDecimal}
            FCFA
          </span>
          <p className="my-2"> {product.description} </p>
          <p className="my-2">
            {" "}
            <span className="font-bold">Couleur: </span> {product.color}{" "}
          </p>
          <p className="my-2">
            {" "}
            <span className="font-bold">Materiel: </span> {product.material}{" "}
          </p>
          <p className="my-2">
            {" "}
            <span className="font-bold">Mesurements: </span>{" "}
            {product.width + "x" + product.length}{" "}
          </p>

          <p className="max-w-full">
            <fetcher.Form
              method="post"
              action={"/addToCart"}
              className="flex max-w-8/10 mx-auto"
            >
              <input type="hidden" value={product._id} name="itemId" />
              <input
                type="hidden"
                value={location.pathname}
                name="prevLocation"
              />

              <button
                type="button"
                onClick={(e) => {
                  document.querySelector(`#qtyId_${product._id}`).value > 1
                    ? document.querySelector(`#qtyId_${product._id}`).value--
                    : "";
                 
                }}
                className="btn"
              >
                {" "}
                {fetcher.state !== "idle" ? (
                  <span className="loading text-accent loading-ball loading-xl"></span>
                ) : (
                  <span className="icon-[tabler--minus] size-4 p-2"></span>
                )}
              </button>

              <input
                id={`qtyId_${product._id}`}
                className="input"
                type="number"
                step={1}
                min={1}
                max={product.qty}
                name="qty"
               
              />
              <button
                type="button"
                onClick={(e) => {
                  document.querySelector(`#qtyId_${item.id}`).value <=
                  product.qty
                    ? document.querySelector(`#qtyId_${item.id}`).value++
                    : "";
                 
                }}
                className="btn"
              >
                {" "}
                {fetcher.state !== "idle" ? (
                  <span className="loading text-accent loading-ball loading-xl"></span>
                ) : (
                  <span className="icon-[tabler--plus] size-4 p-2"></span>
                )}
              </button>
              <button
                disabled={product.qty <= 0}
                type="submit"
                className="btn btn-primary text-white mx-3"
              >
                {fetcher.state !== "submitting" ? (
                  <span className="icon-[tabler--shopping-cart-plus] size-6"></span>
                ) : (
                  <span className="loading loading-ball loading-md"></span>
                )}
              </button>
            </fetcher.Form>
          </p>
        </div>
      </div>
    </>
  );
}
