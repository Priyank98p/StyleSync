import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
const Hero = () => {
  return (
    <div className="flex flex-col sm:flex-row md-flex-col md:w-full">
      <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0">
        <div>
          <div className="flex flex-col gap-4">
            <p className="font-extrabold text-[32px] md:text-[72px] leading-8 md:leading-16">
              FIND CLOTHES THAT MATCHES YOUR STYLE
            </p>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Est
              autem aspernatur obcaecati natus, corrupti beatae, soluta
              doloremque, magnam{" "}
            </p>
          </div>
          <Link to="/collections">
            <button className="bg-black text-white cursor-pointer hover:bg-gray-900 py-4 rounded-full px-16 text-lg font-medium transition-all md:w-60 w-full mt-6">
              Shop Now
            </button>
          </Link>
        </div>
      </div>
      <img className="w-full sm:w-1/2" src={assets.hero_img} alt="" />
    </div>
  );
};

export default Hero;
