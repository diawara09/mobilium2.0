import type React from "react";
import { Link } from "react-router";

export default function AddressCard({item}){
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
                      <Link
                        to={`/checkout/${item._id}`}
                        className="btn btn-outline btn-primary"
                      >
                        Choisir
                      </Link>
                    </div>
        </div>
      </div>)
}