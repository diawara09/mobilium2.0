import { Link } from "react-router";
import { serverUrl } from "~/utils/serverUrl";
import Countdown from "react-countdown";

export default function SaleCard({ item }) {
  let today = new Date(Date.now());
  let expiryDate = new Date(item.expires);
  let difference = expiryDate.getTime() - today.getTime();
  return (
    <div className="bg-white flex flex-wrap  h-full justify-evenly p-6">
      <img
        src={serverUrl + "/" + item.image}
        className="min-w-sm lg:min-w-lg"
      />
      <div className="min-w-60 lg:min-w-lg flex flex-col m-3 lg:justify-center items-start">
        <span className="text-4xl lg:text-6xl  text-primary font-extrabold">
          {item.name} {item.discount_rate.$numberDecimal}%
        </span>
        <p className="max-w-96 my-4">
          {" "}
          <Countdown className="text-xl" date={Date.now() + difference}>
            <span className="text-2xl">Expired</span>
          </Countdown>{" "}
        </p>
        <Link to={`/singleSaleProducts/${item._id}`} className="text-sm text-primary flex items-center">
          Aller
          <span className="icon-[tabler--arrow-right] size-4"></span>
        </Link>
      </div>
    </div>
  );
}
