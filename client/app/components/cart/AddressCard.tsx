import type React from "react";
import { Form, Link, useNavigation } from "react-router";

export default function AddressCard({item}){
  const navigation = useNavigation()
    return(<div className="card sm:max-w-sm">
        <div className="card-header">
          <h5 className="card-title">   <span className="icon-[tabler--map-pin] size-5"></span> {item.name}{' '}</h5>
        </div>
        <div className="card-body">
        <ul className="menu w-56 p-0 [&_li>*]:rounded-none">
                      <li>
                        <span> {item.addressLines} </span>
                      </li>
                      <li>
                        <span> {item.country} </span>
                      </li>
                      <li>
                        <span> {item.city} </span>
                      </li>
                      <li>
                        <span> {item.zipCode} </span>
                      </li>
                    </ul>
                   
        </div>
        <div className="card-footer text-center">
        <div className="card-actions justify-end">
                      <Form
                        action={`/cashCheckout/${item._id}`}
                        method="post"

                      >
                       <button className="btn btn-outline btn-primary">
                        {navigation.state !== "idle" ? <span className="loading loading-ball"></span> : "choisir"}
                        </button> 
                      </Form>
                    </div>
        </div>
      </div>)
}