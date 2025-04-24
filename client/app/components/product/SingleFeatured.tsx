import { useEffect, useState } from "react";
import { Link, useFetcher } from "react-router";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper/modules";
import ProductCard from "./ProductCard";
import { serverUrl } from "~/utils/serverUrl";


export default function SingleFeatured(){
    const fetcher = useFetcher();
    const [featured, setFeatured] = useState([]);
  
    const multiSlide = document.querySelector("#multi-slide");
    useEffect(() => {
      if (fetcher.state === "idle" && !fetcher.data) {
        fetcher.load("/loaders/last10");
      }
      if (fetcher.data) {
        setFeatured(fetcher.data);
        //console.log(featured);
        //HSCarousel.autoInit()
        //multiSlide?.setAttribute("data-carousel",'{"slidesQty": { "xs": 1, "lg": 5 } }')
      }
    }, [fetcher.data]);

    return ( <div className="flex bg-white flex-col hover:shadow-md rounded-none min-w-sm lg:min-w-md p-5">
        {featured && featured.length >= 1 ? (
          <>
            <div className="flex flex-row justify-between w-full">
              <div className="badge badge-primary">New</div>
              <span className="text-lg">
                {" "}
                {featured[0].price.$numberDecimal} FCFA
              </span>
            </div>
            <div className="flex w-full justify-center p-2">
              <img
                src={serverUrl + "/" + featured[0].images.split(";")[0]}
                className="w-3/6"
              />
            </div>

            <div className="flex flex-row justify-between w-full">
              <div className="flex flex-col">
                <h6 className="font-bold"> {featured[0].name} </h6>
                <p className="text-sm"> {featured[0].category.name} </p>
              </div>
              <Link
                to={`/singleProduct/${featured[0]._id}`}
                className="btn border-2 border-gray-400 bg-gray-300 text-gray-500"
              >
                <span className="icon-[tabler--eye] size-6"></span>
              </Link>
            </div>
          </>
        ) : (
          ""
        )}
      </div>)
}