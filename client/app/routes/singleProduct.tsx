import { serverUrl } from "~/utils/serverUrl";
import type { Route } from "./+types/layout";

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
  const product = loaderData
  console.log(product)
  const images = product.images.split(";")
  return (
    <>
      <div className="flex flex-wrap shadow-md lg:max-w-9/10 mx-auto p-5">
        <div className="flex min-w-60 flex-col">
          <div
            id="horizontal-thumbnails"
            data-carousel='{ "loadingClassNamees": "opacity-0" }'
            className="relative w-full"
          >
            <div className="carousel">
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
               {images.length > 1 ? images.map(image => <img
                  src={serverUrl + "/" + image}
                  className="carousel-pagination-item carousel-active:opacity-100 grow object-cover opacity-30"
                  alt="image pagination"
                />) : ''}
                
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
        <div className="flex flex-col min-w-60 p-5">
            <span className="text-lg font bold"> {product.name} </span>
            <span className="text-lg text-primary font bold"> 
                {product.onSale ?(
                    product.price.$numberDecimal -
                    (product.onSale.discount_rate.$numberDecimal / 100) *
                      product.price.$numberDecimal
                  ).toFixed(2) : product.price.$numberDecimal}
                  FCFA</span>
            <p className="my-3"> {product.description} </p>

        </div>
      </div>
    </>
  );
}
