import logoDark from "./logo-dark.svg";
import logoLight from "./logo-light.svg";
import carousel2 from "../carousel2.webp";
import carousel3 from "../carousel3.webp";
import newProduct from "../product7.webp";
import { serverUrl } from "~/utils/serverUrl";
import { Link, useFetcher } from "react-router";
import { useEffect, useState } from "react";
import ProductCard from "~/components/product/ProductCard";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation } from "swiper/modules";

//import { HSCarousel } from "flyonui/flyonui";
export function Welcome() {
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
  return (
    <>
      <div
        id="auto-play"
        data-carousel='{ "loadingClasses": "opacity-0", "isAutoPlay": true, "speed": 7000, "dotsItemClasses": "carousel-dot carousel-active:bg-primary" }'
        className="relative w-full"
      >
        <div className="carousel rounded-none">
          <div className="carousel-body opacity-0 h-full">
            <div className="carousel-slide">
              <div
                className={`bg-base-200 bg-cover flex h-full justify-center p-0 relative`}
              >
                <img src={carousel2} className="w-full z-0" />
                <div className="absolute intersect:motion-opacity-in-0 p-5 top-0 right-0 flex h-full justify-center flex-col w-1/2">
                  <span className="text-sm lg:text-lg  intersect:motion-translate-y-in-100 intersect:motion-opacity-in-0 motion-delay-[.5s] motion-duration-[5s]">
                    Nos Offres
                  </span>
                  <h2 className="text-lg lg:text-5xl font-bold my-2  intersect:motion-translate-y-in-100 intersect:motion-opacity-in-0 motion-delay-[1s] motion-duration-[5s]">
                    Bienvenue sur Mobilium
                  </h2>
                  <p className="hidden lg:block mb-5  intersect:motion-translate-y-in-100 intersect:motion-opacity-in-0 motion-delay-[2s] motion-duration-[5s]">
                    {" "}
                    Votre magasin de fourniture fiable!{" "}
                  </p>
                  <Link
                    to={"/products"}
                    className="btn btn-outline btn-primary lg:my-2 max-w-40  intersect:motion-translate-y-in-100 intersect:motion-opacity-in-0 motion-delay-[2s] motion-duration-[5s]"
                  >
                    Nos Produits
                  </Link>
                </div>
              </div>
            </div>

            <div className="carousel-slide">
              <div
                className={`bg-base-200 bg-cover flex h-full justify-center p-0 relative`}
              >
                <img src={carousel3} className="w-full" />
                <div className="absolute p-5 top-0 right-0 flex h-full justify-center flex-col w-1/2">
                  <span className="text-sm lg:text-lg  intersect:motion-translate-y-in-100 intersect:motion-opacity-in-0 motion-delay-[.5s] motion-duration-[5s]">
                    Nos Offres
                  </span>
                  <h2 className="text-lg lg:text-5xl font-bold my-2  intersect:motion-translate-y-in-100 intersect:motion-opacity-in-0 motion-delay-[1s] motion-duration-[5s]">
                    Bienvenue sur Mobilium
                  </h2>
                  <p className="hidden lg:block mb-5  intersect:motion-translate-y-in-100 intersect:motion-opacity-in-0 motion-delay-[2s] motion-duration-[5s]">
                    {" "}
                    Votre magasin de fourniture fiable!{" "}
                  </p>
                  <Link
                    to={"/products"}
                    className="btn btn-outline btn-primary lg:my-2 max-w-40  intersect:motion-translate-y-in-100 intersect:motion-opacity-in-0 motion-delay-[2s] motion-duration-[5s]"
                  >
                    Nos Produits
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="carousel-pagination absolute bottom-3 end-10 start-0 flex justify-end gap-3"></div>
      </div>

      <div className="flex justify-center  gap-8 items-stretch flex-wrap m-5 p-5 lg:m-10 lg:p-10">
        <div className="flex bg-white flex-col hover:shadow-md rounded-none min-w-sm lg:min-w-md p-5">
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
        </div>

        <div className="flex bg-white justify-center items-center  hover:shadow-md rounded-none min-w-sm lg:min-w-lg p-5">
          <img src={newProduct} className="w-1/2" />
          <div className="flex flex-col p-5">
            <h1 className="text-2xl font-extrabold">
              DESIGN BY MOBILIUM MODERN
            </h1>
            <p className="text-2xl text-primary font-extrabold">-2025</p>
          </div>
        </div>
      </div>

      <div className="flex  gap-8 items-center justify-center flex-col m-5 p-5 lg:m-10 lg:p-10">
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
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 50,
            },
          }}
          navigation={true}
          modules={[Pagination,Navigation]}
          className="mySwiper"
        >
          {featured.map((product) => (
            <SwiperSlide key={product._id}>
              <ProductCard item={product} />
            </SwiperSlide>
          ))}
        </Swiper>

       
      </div>

      <div className="flex  gap-8 items-center justify-center flex-col m-5 p-5 lg:m-10 lg:p-10">
        <div
          id="indicators"
          data-carousel='{ "loadingClasses": "opacity-0", "dotsItemClasses": "carousel-dot carousel-active:bg-primary" }'
          className="relative w-full"
        >
          <div className="carousel rounded-none">
            <div className="carousel-body h-full opacity-0">
              <div className="carousel-slide">
                <div className="bg-white flex flex-wrap  h-full justify-evenly p-6">
                  <img src={newProduct} className="min-w-sm lg:min-w-lg" />
                  <div className="min-w-sm lg:min-w-lg flex flex-col m-3 lg:justify-center items-start">
                    <span className="text-4xl lg:text-6xl  text-primary font-extrabold">
                      Discount 60%
                    </span>
                    <p className="max-w-96 my-4">
                      {" "}
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                      Corporis, ipsum? Recusandae nulla nisi illum placeat.{" "}
                    </p>
                    <Link to="#" className="text-sm text-primary">
                      Get discount
                      <span className="icon-[tabler--arrow-right] size-4"></span>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="carousel-slide">
                <div className="bg-white flex flex-wrap  h-full justify-evenly p-6">
                  <img src={newProduct} className="min-w-sm lg:min-w-lg" />
                  <div className="min-w-sm lg:min-w-lg flex flex-col m-3 lg:justify-center items-start">
                    <span className="text-4xl lg:text-6xl  text-primary font-extrabold">
                      Discount 15%
                    </span>
                    <p className="max-w-96 my-4">
                      {" "}
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                      Corporis, ipsum? Recusandae nulla nisi illum placeat.{" "}
                    </p>
                    <Link to="#" className="text-sm text-primary">
                      Get discount
                      <span className="icon-[tabler--arrow-right] size-4"></span>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="carousel-slide">
                <div className="bg-white flex flex-wrap  h-full justify-evenly p-6">
                  <img src={newProduct} className="min-w-sm lg:min-w-lg" />
                  <div className="min-w-sm lg:min-w-lg flex flex-col m-3 lg:justify-center items-start">
                    <span className="text-4xl lg:text-6xl  text-primary font-extrabold">
                      Discount 10%
                    </span>
                    <p className="max-w-96 my-4">
                      {" "}
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                      Corporis, ipsum? Recusandae nulla nisi illum placeat.{" "}
                    </p>
                    <Link to="#" className="text-sm text-primary">
                      Get discount
                      <span className="icon-[tabler--arrow-right] size-4"></span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="carousel-pagination absolute bottom-3 end-10 start-0 flex justify-end gap-3"></div>
        </div>
      </div>
    </>
  );
}
