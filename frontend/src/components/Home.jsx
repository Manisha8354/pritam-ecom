import React, { useContext, useEffect, useState } from "react";

import AOS from "aos";
import "aos/dist/aos.css";

import Hero from "./Hero/Hero";
import Products from "./Products/Products";
import TopProducts from "./TopProducts/TopProducts";
import Banner from "./Banner/Banner";
import Subscribe from "./Subscribe/Subscribe";
import Testimonials from "./Testimonials/Testimonials";
import Popup from "./Popup/Popup";
import { IoCloseOutline } from "react-icons/io5";
import axios from "axios";
import UserContext from "../context/UserContext";

import Banner1 from "../assets/pritam/bg 7.png";
import { Link } from "react-router-dom";
import Watsapp from "./Watsapp";
import Hero2 from "./Hero/Hero2";
import Bannerhead from "./Hero/Bannerhead";
import Influencer from "./Influencer";

const BannerImg = {
  backgroundImage: `url(${Banner1})`,
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  height: "100%",
  width: "100%",
};

export default function Home() {
  const [orderPopup, setOrderPopup] = useState(false);
  const [data, setData] = useState(null);
  const { auth } = useContext(UserContext);

  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  async function getPopup() {
    const result = await axios.get("https://actl.co.in/suchit/viewPopup");
    setData(result.data[0]);
  }

  useEffect(() => {
    getPopup();
  }, [auth.username]);

  useEffect(() => {
    // Check if data exists and has a status property before accessing it
    if (data && data.status === "on") {
      const timer = setTimeout(() => {
        setOrderPopup(true);
      }, 3000);

      // Cleanup function to clear the timer
      return () => clearTimeout(timer);
    }
  }, [data, auth.username]);

  return (
    <div className="bg-white dark:bg-gray-900 dark:text-white duration-200">
      <Hero />
      <Bannerhead />
      <Hero2 />
      <Watsapp />
      <div className="">
        <TopProducts />
      </div>

      {/* about us */}
      <div className="relative bottom-32 md:bottom-56">
  <Link to="/about" className="block">
    <div
      data-aos="zoom-in"
      className="mb-20 bg-gray-100 dark:bg-gray-800 text-white"
      style={BannerImg}
    >
      <div className="container backdrop-blur-sm py-10">
        <div className="space-y-6 max-w-xl mx-auto">
          <h1 className="text-2xl text-center sm:text-center sm:text-4xl font-semibold">
            About Us &gt;
          </h1>
        </div>
      </div>
    </div>
  </Link>
</div>


      <Products />
      <Influencer />
      <Banner />

      <Subscribe />

      <Testimonials />
      {orderPopup && (
        <div className="">
          <div className="h-screen w-screen fixed top-0 left-0 bg-black/50 z-50 backdrop-blur-sm">
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 shadow-md bg-white text-center dark:bg-gray-900 rounded-md duration-200 w-[300px]">
              {/* header */}
              <div className="flex items-center justify-between bg-orange-400 p-2">
                <div>
                  <h1>{data ? data.heading : ""}</h1>
                </div>
                <div>
                  <IoCloseOutline
                    className="text-2xl cursor-pointer "
                    onClick={() => setOrderPopup(false)}
                  />
                </div>
              </div>
              {/* form section */}
              <div className="mt-4">
                <p>{data ? data.detail : ""}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
