import { NavLink, Outlet } from "react-router";

export default function AdminRoot() {
    return (
      <div className="flex flex-col items-center m-5 justify-center">
        <ul className="menu menu-horizontal space-x-0.5">
          <li className="dropdown relative inline-flex [--auto-close:inside] [--offset:9] [--placement:bottom-end]">
            <button
              id="dropdown-end"
              type="button"
              className="dropdown-toggle dropdown-open:bg-base-content/10 dropdown-open:text-base-content max-sm:px-2"
              aria-haspopup="menu"
              aria-expanded="false"
              aria-label="Dropdown"
            >
              Categories
              <span className="icon-[tabler--chevron-down] dropdown-open:rotate-180 size-4"></span>
            </button>
            <ul
              className="dropdown-menu dropdown-open:opacity-100 hidden"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="dropdown-end"
            >
              <li>
                <NavLink className="dropdown-item" to="/admin/createCategory">
                  Ajouter une Categorie
                </NavLink>
              </li>
              <li>
                <NavLink className="dropdown-item" to={"/admin/allCategories"}>
                  Toutes mes Categories
                </NavLink>
              </li>
            </ul>
          </li>
          <li className="dropdown relative inline-flex [--auto-close:inside] [--offset:9] [--placement:bottom-end]">
            <button
              id="dropdown-end"
              type="button"
              className="dropdown-toggle dropdown-open:bg-base-content/10 dropdown-open:text-base-content max-sm:px-2"
              aria-haspopup="menu"
              aria-expanded="false"
              aria-label="Dropdown"
            >
              Promotions
              <span className="icon-[tabler--chevron-down] dropdown-open:rotate-180 size-4"></span>
            </button>
            <ul
              className="dropdown-menu dropdown-open:opacity-100 hidden"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="dropdown-end"
            >
              <li>
                <a className="dropdown-item" href="#">
                  Ajouter une promotion
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Tous mes promotions
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#">Commandes</a>
          </li>
          <li className="dropdown relative inline-flex [--auto-close:inside] [--offset:9] [--placement:bottom-end]">
            <button
              id="dropdown-end"
              type="button"
              className="dropdown-toggle dropdown-open:bg-base-content/10 dropdown-open:text-base-content max-sm:px-2"
              aria-haspopup="menu"
              aria-expanded="false"
              aria-label="Dropdown"
            >
              Produits
              <span className="icon-[tabler--chevron-down] dropdown-open:rotate-180 size-4"></span>
            </button>
            <ul
              className="dropdown-menu dropdown-open:opacity-100 hidden"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="dropdown-end"
            >
              <li>
                <a className="dropdown-item" href="#">
                  Ajouter un produit
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Tous mes produits
                </a>
              </li>
            </ul>
          </li>
        </ul>
        <Outlet />
      </div>
    )
}