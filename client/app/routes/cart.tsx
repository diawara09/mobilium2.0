import { Link } from 'react-router'
import banner from '../banner.jpg'
import cartProduct from '../product7.webp'
export default function Cart() {
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

      <div className="max-w-full flex justify-center m-5 p-5 lg:m-10 lg:p-10 overflow-x-auto h-fit shadow-md">
        <table className="table-borderless table">
          <thead>
            <tr>
              <th></th>
              <th>Produit</th>
              <th>Prix</th>
              <th>Quantite</th>
              <th>Total</th>
              <th>Suppr</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                {' '}
                <img className="w-20" src={cartProduct} />
              </td>
              <td>
                <div className="flex gap-2.5">
                  <div className="flex flex-col justify-center items-center">
                    <h6 className="truncate text-base">Dummy Product Name</h6>
                    <small className="text-base-content/50 truncate">
                      Prix: 3000 FCFA
                    </small>
                    <small className="text-base-content/50 truncate">
                      Qte: 2
                    </small>
                  </div>
                </div>
              </td>
              <td>
                {' '}
                <span className="text-lg font-bold"> 5200 FCFA</span>{' '}
              </td>
              <td>
                <div className="flex items-center justify-center gap-2">
                  <button className="btn btn-xs">
                    {' '}
                    <span className="icon-[tabler--minus]  size-4 p-2"></span>
                  </button>

                  <input
                    type="number"
                    min={1}
                    max={10}
                    step={1}
                    className="input max-w-10"
                  />
                  <button className="btn btn-xs">
                    {' '}
                    <span className="icon-[tabler--plus] size-4 p-2"></span>
                  </button>
                </div>
              </td>
              <td>
                <span className="text-lg font-bold"> 10400 FCFA</span>
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
          </tbody>
        </table>
      </div>
    </>
  )
}
