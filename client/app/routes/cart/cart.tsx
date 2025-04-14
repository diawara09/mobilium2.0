import { Link, useFetcher } from "react-router";
import banner from "../../banner.jpg";
import cartProduct from "../../product7.webp";
import { useEffect, useState } from "react";
import { serverUrl } from "~/utils/serverUrl";
import type { Route } from "./+types/cart";
import AddressList from "~/components/cart/AddressList";

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
                        <button type="button" onClick={(e)=> { 
                          document.getElementById(`qtyId_${item.id}`).value > 1 ? document.getElementById(`qtyId_${item.id}`).value-- : '';
                          fetcher.submit(e.currentTarget.form);
                          } } className="btn btn-xs">
                          {" "}
                          {fetcher.state !== "idle" ? <span className="loading text-accent loading-ball loading-xl"></span>  :  <span className="icon-[tabler--minus] size-4 p-2"></span>}
                         
                        </button>

                        <input
                          id={`qtyId_${item.id}`}
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
                        <button type="button" onClick={(e)=> {
                          document.getElementById(`qtyId_${item.id}`).value <= item.maxQty ? document.getElementById(`qtyId_${item.id}`).value++ : '';
                          fetcher.submit(e.currentTarget.form);}} className="btn btn-xs">
                          {" "}
                          {fetcher.state !== "idle" ? <span className="loading text-accent loading-ball loading-xl"></span>  :  <span className="icon-[tabler--plus] size-4 p-2"></span>}
                         
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
                    <fetcher.Form
                        method="post"
                        action={`/deleteCartItem/${cart._id}`}
                      >
                        <input
                          type="hidden"
                          value={location.pathname}
                          name="prevLocation"
                        />
                        <input type="hidden" value={item.id} name="itemId" />
                        <button className="btn btn-sm btn-error" type="submit">
                          {fetcher.state === 'submitting' ? (
                            <span className="loading loading-ball loading-md"></span>
                          ) : (
                            <span className="icon-[tabler--x] size-5"></span>
                          )}
                        </button>
                      </fetcher.Form>
                    </td>
                  </tr>
                ))
              : ""}
          </tbody>
        </table>
      </div>
      <div className="max-w-full  m-5 p-5 lg:m-10 lg:p-10 flex justify-end h-fit shadow-md">
        <table className="max-w-sm table">
          <tbody>
            <tr>
              <td>
                <span className="font-semibold text-xl">Subtotal</span>
              </td>
              <td>
              <span className="font-semibold text-xl">
              {cart.items
                ? parseFloat(cart.subtotal.$numberDecimal).toFixed(2)
                : 0}{' '} FCFA
            </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <AddressList/>
      <div className="divider lg:divider-horizontal">OR</div>
      <div className="flex flex-col w-full justify-center items-center lg:flex-row p-5 ">
      <div className="card w-full max-w-md shrink-0 shadow-2xl">
      <fetcher.Form method="post" action="/addAdress" className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Nom de l&apos;adresse</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="text"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Adresse Complet</span>
              </label>
              <textarea
                name="addressLines"
                className="textarea textarea-bordered"
                placeholder="Complete Address"
              ></textarea>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Pays</span>
              </label>
              <input
                type="text"
                name="country"
                placeholder="Country"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Ville</span>
              </label>
              <input
                type="text"
                name="city"
                placeholder="city"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Zip Code</span>
              </label>
              <input
                type="text"
                name="zipCode"
                placeholder="37150"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">
                {fetcher.state === 'submitting' ? (
                  <span className="loading loading-ball loading-md"></span>
                ) : (
                  'Créer'
                )}
              </button>
            </div>
          </fetcher.Form>
          </div>
          </div>
    </>
  );
}
