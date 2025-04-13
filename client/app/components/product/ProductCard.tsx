import { Link, useFetcher, useLocation } from "react-router";
import { serverUrl } from "~/utils/serverUrl";

export default function ProductCard({ item }) {
    const location = useLocation()
    const fetcher = useFetcher()
    return (
      <>
        <div className="bg-white gap-2.5 flex flex-col h-full max-w-sm items-center justify-center p-6 relative">
          <div className="flex flex-row justify-between w-full absolute top-0 p-10">
            <div className="badge badge-primary badge-sm">New</div>

            {item.onSale ? (
              <span className="text-primary font-bold">
                $
                {(
                  item.price.$numberDecimal -
                  (item.onSale.discount_rate.$numberDecimal / 100) *
                    item.price.$numberDecimal
                ).toFixed(2)}
              </span>
            ) : (
              <span className="text-primary font-bold">
                {item.price.$numberDecimal} FCFA
              </span>
            )}
          </div>
          <Link to={`/singleProduct/${item._id}`}>
            <img
              className="max-h-80"
              src={serverUrl + "/"+item.images.split(';')[0]}
              alt="Image du produit"
            />
          </Link>
          <span className="text-lg font-bold">
            <Link to={`/singleProduct/${item._id}`}>{item.name}</Link>{' '}
          </span>

          {/* Show original price  */}
          {item.onSale ? (
            <span className="line-through">
              {item.price.$numberDecimal} FCFA
            </span>
          ) : (
            ''
          )}

          <div className="flex max-w-1/2 text-primary justify-between">
            <span className="icon-[tabler--star] size-4"></span>
            <span className="icon-[tabler--star] size-4"></span>
            <span className="icon-[tabler--star] size-4"></span>
            <span className="icon-[tabler--star] size-4"></span>
            <span className="icon-[tabler--star] size-4"></span>
          </div>
          <ul className="menu menu-horizontal bg-gray-50">
            <li>
              <fetcher.Form
                method="post"
                action="/product/addToCart"
                className="w-full"
              >
                <input type="hidden" value={item._id} name="itemId" />
                <input
                  type="hidden"
                  value={location.pathname}
                  name="prevLocation"
                />
                <input type="hidden" value={1} name="qty" />
                <button
                  disabled={item.qty <= 0}
                  type="submit"
                  className="btn btn-primary text-white w-full"
                >
                  {fetcher.state !== 'submitting' ? (
                    <span className="icon-[tabler--shopping-cart-plus] size-6"></span>
                  ) : (
                    <span className="loading loading-ball loading-md"></span>
                  )}
                </button>
              </fetcher.Form>
            </li>
          </ul>
        </div>
      </>
    )
}