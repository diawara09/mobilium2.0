import logoDark from "./logo-dark.svg";
import logoLight from "./logo-light.svg";
import carousel2 from "../carousel2.webp";
import carousel3 from "../carousel3.webp";
import newProduct from "../product7.webp";
import { serverUrl } from "~/utils/serverUrl";
import { Link, useFetcher } from "react-router";
import { useEffect, useState } from "react";
import ProductCard from "~/components/product/ProductCard";
import SingleFeatured from "~/components/product/SingleFeatured";
import FeaturedCarousel from "~/components/product/FeaturedCarousel";



//import { HSCarousel } from "flyonui/flyonui";
export function Welcome() {
  
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
        <SingleFeatured/>

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

      
        <FeaturedCarousel/>
     

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
                  <div className="min-w-60 lg:min-w-lg flex flex-col m-3 lg:justify-center items-start">
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
