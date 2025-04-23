import { useEffect } from "react";
import { Link, useFetcher } from "react-router";

// eslint-disable-next-line react/prop-types
export default function SaleLink() {
  const fetcher = useFetcher();

  useEffect(() => {
    if (fetcher.state === "idle" && !fetcher.data) {
      fetcher.load("/loaders/clientSales");
    }
  }, [fetcher]);

  return fetcher.data ? (
    <div className="w-full">
       
        <ul className="menu menu-horizontal max-w-full max-h-full overflow-auto lg:menu-vertical">
            {fetcher.data.map((item) => (
            <li className="">  <Link key={item._id} to={`/singleSaleProducts/${item._id}`}>
                {" "}
                {item.name}{" "}
              </Link></li>
            ))}
        </ul>
       
    </div>
  ) : (
    ""
  );
}
