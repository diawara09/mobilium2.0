import { useEffect } from "react";
import { useFetcher } from "react-router";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { Navigation,Pagination } from "swiper/modules";
import SaleCard from "./SaleCard";

export default function SaleCarousel(){
    const fetcher = useFetcher()
    useEffect(() => {
        if(!fetcher.data && fetcher.state === "idle"){
            fetcher.load("/loaders/clientSales")
        }
    })

    return (
        <div className="flex  gap-8 items-center justify-center flex-col m-5 p-5 lg:m-10 lg:p-10">
               <Swiper
                      slidesPerView={1}
                      spaceBetween={10}
                      pagination={{
                        clickable: true,
                      }}
                      
                     
                      modules={[Navigation,Pagination]}
                      className="relative max-w-full"
                    >
                      {fetcher.data.map((sale) => (
                        <SwiperSlide key={sale._id}>
                          <SaleCard item={sale} />
                        </SwiperSlide>
                      ))}
                     
                    </Swiper>
            
        </div>
    )
}