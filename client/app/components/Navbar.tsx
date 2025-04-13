import { Form, Link, NavLink } from 'react-router'
import logo from '../logo.png'
import { useContext } from 'react'
import { UserContext } from '~/utils/contexts'
import cartProduct from '../product7.webp'
import CartDropdown from './cart/CartDropdown'
export default function Navbar() {
    const user = useContext(UserContext)
    return (
      <nav className="navbar rounded-none justify-between gap-4 shadow-base-300/20 shadow-sm">
        <div className="navbar-start">
          <button
            type="button"
            className="btn btn-text btn-circle"
            aria-haspopup="dialog"
            aria-expanded="false"
            aria-controls="overlay-example"
            data-overlay="#overlay-example"
          >
            <span className="icon-[tabler--menu-2] size-6"></span>
          </button>

          <div
            id="overlay-example"
            className="overlay overlay-open:translate-x-0 drawer drawer-start hidden"
            role="dialog"
            tabIndex={-1}
          >
            <div className="drawer-header">
              <h3 className="drawer-title">Menu</h3>
              <button
                type="button"
                className="btn btn-text btn-circle btn-sm absolute end-3 top-3"
                aria-label="Close"
                data-overlay="#overlay-example"
              >
                <span className="icon-[tabler--x] size-5"></span>
              </button>
            </div>
            <div className="drawer-body">
              <ul className="menu rounded-none p-0 [&_li>*]:rounded-none">
                <li>
                  <NavLink to="/">Accueil</NavLink>
                </li>
                <li>
                  <NavLink to={user && user.id ? '/admin' : '/login'}>Compte</NavLink>
                </li>
                <li>
                  <NavLink to="/products">Produits</NavLink>
                </li>
                <>
                  {user ? (
                    <li>
                      <Form method="post" action="/logout">
                        <button className="btn btn-secondary">
                          {' '}
                          <span className="icon-[tabler--logout] size-8"></span>
                        </button>
                      </Form>
                    </li>
                  ) : (
                    ''
                  )}
                </>
              </ul>
            </div>
          </div>
        </div>
        <div className="navbar-center flex items-center">
          <a
            className="link text-base-content link-neutral text-xl font-bold no-underline"
            href="#"
          >
            <img src={logo} width="80" />
          </a>
        </div>
        <div className="navbar-end items-center gap-4">
          <CartDropdown/>
        </div>
      </nav>
    )
}