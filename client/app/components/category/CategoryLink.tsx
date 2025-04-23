import { useEffect } from "react";
import { Link, useFetcher } from "react-router";

// eslint-disable-next-line react/prop-types
export default function CategoryLink() {
  const fetcher = useFetcher();

  useEffect(() => {
    if (fetcher.state === "idle" && !fetcher.data) {
      fetcher.load("/loaders/allCategories");
    }
  }, [fetcher]);

  return fetcher.data ? (
    <div className="w-full">
      <div className="dropdown relative inline-flex [--strategy:absolute] [--trigger:hover]">
        <button
          id="dropdown-transform"
          type="button"
          className="dropdown-toggle btn btn-primary"
          aria-haspopup="menu"
          aria-expanded="false"
          aria-label="Dropdown"
        >
          Categories
          <span className="icon-[tabler--chevron-down] dropdown-open:rotate-180 size-4"></span>
        </button>
        <div
          className="dropdown-menu max-h-96 overflow-y-auto dropdown-open:opacity-100 hidden min-w-60 rtl:left-0"
          role="menu"
          aria-orientation="vertical"
        >
          <ul
            className="dropdown-open:ease-in dropdown-open:translate-x-0 -translate-x-1 rtl:translate-x-1 transition duration-300 ease-out"
            aria-labelledby="dropdown-transform"
            data-dropdown-transition
          >
            {fetcher.data.map((item) => (
              <Link key={item._id} to={`/categoryProduct/${item._id}`}>
                {" "}
                {item.name}{" "}
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}
