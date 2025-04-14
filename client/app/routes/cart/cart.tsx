import { Link, useFetcher } from "react-router";
import banner from "../../banner.jpg";
import cartProduct from "../../product7.webp";
import { useEffect, useState } from "react";
import { serverUrl } from "~/utils/serverUrl";
import type { Route } from "./+types/cart";

export async function clientLoader(){
  try {
     const guestSession = localStorage.getItem('user_id') || ''
     const cartResponse = await fetch(
       serverUrl + `/cart/?guest=${guestSession}`,
       {
         method: 'GET',
         credentials: 'include',
         headers: {
           'Content-Type': 'application/json',
         },
       }
     )
      const cart = await cartResponse.json()
      console.log(cart);
     return cart
} catch (error) {
  return {error}
}
}

export default function Cart({loaderData}:Route.ComponentProps) {
  const fetcher = useFetcher();
  const cart = loaderData;
 
  return (
    <>
      <div className="w-full max-h-72 overflow-hidden relative">
        <img src={banner} className="w-full" />
        <div className="flex justify-center w-full h-full items-center absolute top-0 backdrop-grayscale-100">
          <h1 className="text-3xl lg:text-5xl font-extrabold text-secondary">
            Panier
          </h1>
        </div>
        <div className="absolute bottom-2.5 w-full px-10 font-bold lg:text-lg text-secondary">
          <Link to="/">Home</Link> / Panier
        </div>
      </div>

      <div className="max-w-full  m-5 p-5 lg:m-10 lg:p-10 overflow-x-auto h-fit shadow-md">
        <table className="table-borderless table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Produit</th>
              <th>Prix</th>
              <th>Quantite</th>
              <th>Total</th>
              <th>Suppr</th>
            </tr>
          </thead>
          <tbody>
            {cart.items && cart.items.length > 0
              ? cart.items.map((item) => (
                  <tr key={item.id}>
                    <td>
                      {" "}
                      <img
                        className="w-20"
                        src={serverUrl + "/" + item.image}
                      />
                    </td>
                    <td>
                      <div className="flex gap-2.5">
                        <div className="flex flex-col justify-center items-center">
                          <h6 className="truncate text-base"> {item.name} </h6>
                        </div>
                      </div>
                    </td>
                    <td>
                      {" "}
                      <span className="text-lg font-bold">
                        {" "}
                        {item.price.$numberDecimal || item.price} FCFA
                      </span>{" "}
                    </td>
                    <td>
                      <fetcher.Form
                        method="post"
                        action={"/changeQty"}
                        className="flex items-center justify-center gap-2"
                      >
                        <input type="hidden" value={item.id} name="itemId" />
                        <input
                          type="hidden"
                          value={location.pathname}
                          name="prevLocation"
                        />
                        <input type="hidden" value={cart._id} name="cartId" />
                        <button type="button" className="btn btn-xs">
                          {" "}
                          <span className="icon-[tabler--minus]  size-4 p-2"></span>
                        </button>

                        <input
                          className="input max-w-10"
                          type="number"
                          step={1}
                          min={1}
                          max={item.maxQty}
                          name="qty"
                          defaultValue={item.qty}
                          onChange={(e) => {
                            fetcher.submit(e.currentTarget.form);
                          }}
                        />
                        <button type="button" className="btn btn-xs">
                          {" "}
                          <span className="icon-[tabler--plus] size-4 p-2"></span>
                        </button>
                      </fetcher.Form>
                    </td>
                    <td>
                      <span className="text-lg font-bold">
                        {" "}
                        {parseFloat(item.price.$numberDecimal || item.price) *
                          parseFloat(item.qty)}{" "}
                        FCFA
                      </span>
                    </td>
                    <td>
                      <button
                        className="btn btn-circle btn-text btn-sm"
                        aria-label="Action button"
                      >
                        <span className="icon-[tabler--x] size-5"></span>
                      </button>
                    </td>
                  </tr>
                ))
              : ""}
          </tbody>
        </table>
      </div>
    </>
  );
}
