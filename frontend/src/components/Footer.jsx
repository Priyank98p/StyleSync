import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className="mt-10">
      <div className="flex max-xl:flex-col mt-10">
        <div className=" flex flex-col gap-2 xl:w-2/3">
          <Link to="/">
            <h1 className="mb-4 font-extrabold text-4xl cursor-pointer">
              StyleSync
            </h1>
          </Link>
          <p className="text-gray-500 transition-[color] hover:text-black mr-4">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam
            accusamus voluptatem harum nemo possimus eaque
          </p>

          <div className="flex gap-2 xl:mt-4">
            <a
              href=""
              className="rounded-full bg-white hover:invert border-2 border-gray-200 p-2"
            >
              <img className="w-3.5 h-3" src={assets.x_icon} alt="" />
            </a>
            <a
              href=""
              className="rounded-full bg-white hover:invert border-2 border-gray-200 p-2"
            >
              <img src={assets.fb_svg} alt="" />
            </a>
            <a
              href=""
              className="rounded-full bg-white hover:invert border-2 border-gray-200 p-2"
            >
              <img src={assets.insta_svg} alt="" />
            </a>
            <a
              href=""
              className="rounded-full bg-white hover:invert border-2 border-gray-200 p-2"
            >
              <img src={assets.github_svg} alt="" />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-y-9 *:flex *:flex-col *:gap-6 max-xl:mt-9 max-xl:*:gap-4 xl:w-2/3 xl:grid-cols-3 xl:gap-20 text-sm">
          <div>
            <p className="text-xl font-medium ">COMPANY</p>
            <ul className="flex flex-col gap-1 text-gray-600">
              <li className="hover:text-black cursor-pointer">Home</li>
              <li className="hover:text-black cursor-pointer">About</li>
              <li className="hover:text-black cursor-pointer">Features</li>
              <li className="hover:text-black cursor-pointer">Career</li>
            </ul>
          </div>
          <div>
            <p className="text-xl font-medium ">HELP</p>
            <ul className="flex flex-col gap-1 text-gray-600">
              <li className="hover:text-black cursor-pointer">
                Customer support
              </li>
              <li className="hover:text-black cursor-pointer">
                Delivery Details
              </li>
              <li className="hover:text-black cursor-pointer">
                Terms & Conditions
              </li>
              <li className="hover:text-black cursor-pointer">
                Privacy Policy
              </li>
            </ul>
          </div>
          <div>
            <p className="text-xl font-medium ">FAQ</p>
            <ul className="flex flex-col gap-1 text-gray-600">
              <li className="hover:text-black cursor-pointer">Account</li>
              <li className="hover:text-black cursor-pointer">
                Manage Deliveries
              </li>
              <li className="hover:text-black cursor-pointer">Orders</li>
              <li className="hover:text-black cursor-pointer">Payments</li>
            </ul>
          </div>
        </div>
      </div>
          <hr className="mt-6 border-gray-300"/>
        <div className="my-12 flex flex-col sm:flex-row items-center justify-between">
          <p className="text-gray-600 transition-[color] hover:text-black">StyleSync © 2025 - 2026, All Rights Reserved</p>
          <p className="text-gray-600 transition-[color] hover:text-black">Developed by
            <a href="https://github.com/Priyank98p" target="_blank" title="Github profile" className="ml-1 font-medium hover:underline ">Priyank</a>
          </p>
          <div className="flex items-center gap-2 max-xl:mt-3">
            <span className="rounded-xl p-2 border-2 border-gray-300 cursor-pointer hover:scale-105">
              <img src={assets.visa} alt="" />
            </span>
            <span className="rounded-xl p-2 border-2 border-gray-300 cursor-pointer hover:scale-105">
              <img src={assets.masterCard} alt="" />
            </span>
            <span className="rounded-xl p-2 border-2 border-gray-300 cursor-pointer hover:scale-105">
              <img src={assets.applePay} alt="" />
            </span>
            <span className="rounded-xl p-2 border-2 border-gray-300 cursor-pointer hover:scale-105">
              <img src={assets.googlePay} alt="" />
            </span>
            <span className="rounded-xl p-2 border-2 border-gray-300 cursor-pointer hover:scale-105">
              <img src={assets.paypal} alt="" />
            </span>
          </div>
        </div>
    </div>
  );
};

export default Footer;
