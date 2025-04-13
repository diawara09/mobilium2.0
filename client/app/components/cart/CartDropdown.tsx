import { useEffect, useState } from 'react'
import { Link, useFetcher } from 'react-router'
import { serverUrl } from '~/utils/serverUrl'

export default function CartDropdown() {
  const fetcher = useFetcher()
  const [cart, setCart] = useState([])
  useEffect(() => {
    if (!fetcher.data && fetcher.state === 'idle') {
      fetcher.load('/loaders/userCart')
    } 
      if (fetcher.data) {
        setCart(fetcher.data)
    }

  }, [fetcher.data])
 

  return (
    <>
      <div className="dropdown relative inline-flex">
        <button
          id="dropdown-scrollable"
          type="button"
          className="dropdown-toggle"
          aria-label="Notification Button"
        >
          <div className="indicator">
            <span className="indicator-item badge badge-primary size-4 rounded-full">
              {cart.items && cart.items.length > 0 ? cart.items.length : 0}
            </span>
            <span className="icon-[tabler--shopping-cart-filled] text-base-content size-6"></span>
          </div>
        </button>
        <div
          className="dropdown-menu dropdown-open:opacity-100 hidden"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="dropdown-scrollable"
        >
          <div className="dropdown-header justify-center">
            <h6 className="text-base text-base-content">Panier</h6>
          </div>
          <div className="overflow-y-auto text-base-content/80 max-h-52 max-sm:max-w-72">
            {cart.items && cart.items.length > 0
              ? cart.items.map((item) => (
                  <div key={item.id} className="dropdown-item">
                    <div className="avatar">
                      <div className="w-20 rounded-none">
                        <img
                          src={serverUrl + '/' + item.image}
                          alt="User Avatar"
                        />
                      </div>
                    </div>
                    <div className="w-42 sm:w-47 flex flex-col">
                      <h6 className="truncate text-base"> {item.name} </h6>
                      <small className="text-base-content/50 truncate">
                        Prix: $
                        {parseFloat(
                          item.price.$numberDecimal || item.price
                        ).toFixed()}{' '}
                        FCFA
                      </small>
                      <small className="text-base-content/50 truncate">
                        Qte: {item.qty}
                      </small>
                    </div>
                    <div className="w-10 sm:w-5">
                      <fetcher.Form
                        method="post"
                        action={`/product/deleteCartItem/${cart._id}`}
                      >
                        <input
                          type="hidden"
                          value={location.pathname}
                          name="prevLocation"
                        />
                        <input type="hidden" value={item.id} name="itemId" />
                        <button className="btn btn-sm btn-error" type="submit">
                          {fetcher.state === 'submitting' ? (
                            <span className="loading loading-infinity loading-md"></span>
                          ) : (
                            <span className="icon-[tabler--x] size-3"></span>
                          )}
                        </button>
                      </fetcher.Form>
                    </div>
                  </div>
                ))
              : ''}
          </div>
          <Link to="/cart" className="dropdown-footer justify-center gap-1">
            <span className="icon-[tabler--eye] size-4"></span>
            Voir Plus
          </Link>
        </div>
      </div>
    </>
  )
}
