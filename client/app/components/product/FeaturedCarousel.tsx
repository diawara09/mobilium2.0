import { useEffect, useState } from "react";
import { useFetcher } from "react-router";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper/modules";
import ProductCard from "./ProductCard";


export default function FeaturedCarousel(){
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
    return (<div className="flex  gap-8 items-center justify-center flex-col m-5 p-5 lg:m-10 lg:p-10">
        <div className="flex flex-col w-full gap-5 justify-center items-center">
          <span className="text-2xl lg:text-3xl font-bold">
            Featured Products
          </span>
          <hr className="h-2.5 text-primary bg-primary max-w-24 lg:max-w-52" />
        </div>

        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 5,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
          }}
          navigation={{
            prevEl:  `#prev`,
            nextEl:  `#next`
          }}
          modules={[Navigation]}
          className="relative max-w-full"
        >
          {featured.map((product) => (
            <SwiperSlide key={product._id}>
              <ProductCard item={product} />
            </SwiperSlide>
          ))}
          <span id="prev" className="size-9.5 absolute z-1 left-0 top-[40%] bg-base-100 flex items-center justify-center rounded-full shadow-base-300/20 shadow-sm">
            <span className="icon-[tabler--chevron-left] size-5 cursor-pointer rtl:rotate-180"></span>
          </span>
          <span id="next" className="size-9.5 absolute z-1 right-0 top-[40%] bg-base-100 flex items-center justify-center rounded-full shadow-base-300/20 shadow-sm">
            <span className="icon-[tabler--chevron-right] size-5 cursor-pointer rtl:rotate-180"></span>
          </span>
        </Swiper>

       
      </div>)
}