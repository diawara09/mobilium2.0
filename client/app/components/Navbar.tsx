import { NavLink } from 'react-router'
import logo from '../logo.png'

export default function Navbar() {
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
                  <NavLink to="/login">Compte</NavLink>
                </li>
                <li>
                  <NavLink to="#">Produits</NavLink>
                </li>
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
          <div className="dropdown relative inline-flex">
            <button
              id="dropdown-scrollable"
              type="button"
              className="dropdown-toggle"
              aria-label="Notification Button"
            >
              <div className="indicator">
                <span className="indicator-item badge badge-primary size-4 rounded-full">2</span>
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
                <h6 className="text-base text-base-content">Notification</h6>
              </div>
              <div className="overflow-y-auto text-base-content/80 max-h-52 max-sm:max-w-72">
                <div className="dropdown-item">
                  <div className="avatar avatar-away-bottom">
                    <div className="w-10 rounded-full">
                      <img
                        src="https://cdn.flyonui.com/fy-assets/avatar/avatar-1.png"
                        alt="User Avatar"
                      />
                    </div>
                  </div>
                  <div className="w-52 sm:w-60">
                    <h6 className="truncate text-base">Charles Franklin</h6>
                    <small className="text-base-content/50 truncate">
                      Accepted your connection
                    </small>
                  </div>
                </div>
                <div className="dropdown-item">
                  <div className="avatar">
                    <div className="w-10 rounded-full">
                      <img
                        src="https://cdn.flyonui.com/fy-assets/avatar/avatar-2.png"
                        alt="User Avatar"
                      />
                    </div>
                  </div>
                  <div className="w-52 sm:w-60">
                    <h6 className="!truncate text-base">
                      Martian added moved Charts & Maps task to the done board.
                    </h6>
                    <small className="text-base-content/50 truncate">
                      Today 10:00 AM
                    </small>
                  </div>
                </div>
                <div className="dropdown-item">
                  <div className="avatar avatar-online-bottom">
                    <div className="w-10 rounded-full">
                      <img
                        src="https://cdn.flyonui.com/fy-assets/avatar/avatar-8.png"
                        alt="User Avatar"
                      />
                    </div>
                  </div>
                  <div className="w-52 sm:w-60">
                    <h6 className="truncate text-base">New Message</h6>
                    <small className="text-base-content/50 truncate">
                      You have new message from Natalie
                    </small>
                  </div>
                </div>
                <div className="dropdown-item">
                  <div className="avatar avatar-placeholder">
                    <div className="bg-neutral text-neutral-content w-10 rounded-full p-2">
                      <span className="icon-[tabler--user] size-full"></span>
                    </div>
                  </div>
                  <div className="w-52 sm:w-60">
                    <h6 className="truncate text-base">
                      Application has been approved 🚀
                    </h6>
                    <small className="text-base-content/50 text-wrap">
                      Your ABC project application has been approved.
                    </small>
                  </div>
                </div>
                <div className="dropdown-item">
                  <div className="avatar">
                    <div className="w-10 rounded-full">
                      <img
                        src="https://cdn.flyonui.com/fy-assets/avatar/avatar-10.png"
                        alt="User Avatar"
                      />
                    </div>
                  </div>
                  <div className="w-52 sm:w-60">
                    <h6 className="truncate text-base">New message from Jane</h6>
                    <small className="text-base-content/50 text-wrap">
                      Your have new message from Jane
                    </small>
                  </div>
                </div>
                <div className="dropdown-item">
                  <div className="avatar">
                    <div className="w-10 rounded-full">
                      <img
                        src="https://cdn.flyonui.com/fy-assets/avatar/avatar-3.png"
                        alt="User Avatar"
                      />
                    </div>
                  </div>
                  <div className="w-52 sm:w-60">
                    <h6 className="truncate text-base">
                      Barry Commented on App review task.
                    </h6>
                    <small className="text-base-content/50 truncate">
                      Today 8:32 AM
                    </small>
                  </div>
                </div>
              </div>
              <a href="#" className="dropdown-footer justify-center gap-1">
                <span className="icon-[tabler--eye] size-4"></span>
                View all
              </a>
            </div>
          </div>
        </div>
      </nav>
    )
}