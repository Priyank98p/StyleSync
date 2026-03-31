import React, { useContext, useState, } from "react";
import { assets } from "../assets/assets";
import { NavLink, Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const {showSearch,setShowSearch} = useContext(ShopContext)

  return (
    <div className="flex sm:sticky sm:z-10 sm:top-0 sm:bg-white items-center justify-between py-5 font-medium border-b border-gray-300">
      <Link to="/">
        <h1 className="font-extrabold text-4xl">StyleSync</h1>
      </Link>
      <ul className="hidden sm:flex gap-5 text-sm">
        <NavLink to="/">
          {({ isActive }) => (
            <div
              className={`flex flex-col items-center gap-1 transition-colors ${isActive ? "animate-color-flash" : "text-black hover:text-gray-500"}`}
            >
              <p className="font-medium text-xl">Home</p>
              <hr
                className={`w-2/4 border-none h-[1.5px] bg-gray-700 ${isActive ? "block" : "hidden"}`}
              />
            </div>
          )}
        </NavLink>

        <NavLink to="/collections">
          {({ isActive }) => (
            <div
              className={`flex flex-col items-center gap-1 transition-colors ${isActive ? "animate-color-flash" : "text-black hover:text-gray-500"}`}
            >
              <p className="font-medium text-xl">Collection</p>
              <hr
                className={`w-2/4 border-none h-[1.5px] bg-gray-700 ${isActive ? "block" : "hidden"}`}
              />
            </div>
          )}
        </NavLink>

        <NavLink to="/about">
          {({ isActive }) => (
            <div
              className={`flex flex-col items-center gap-1 transition-colors ${isActive ? "animate-color-flash" : "text-black hover:text-gray-500"}`}
            >
              <p className="font-medium text-xl">About</p>
              <hr
                className={`w-2/4 border-none h-[1.5px] bg-gray-700 ${isActive ? "block" : "hidden"}`}
              />
            </div>
          )}
        </NavLink>

        <NavLink to="/contact">
          {({ isActive }) => (
            <div
              className={`flex flex-col items-center gap-1 transition-colors ${isActive ? "animate-color-flash" : "text-black hover:text-gray-500"}`}
            >
              <p className="font-medium text-xl">Contact</p>
              <hr
                className={`w-2/4 border-none h-[1.5px] bg-gray-700 ${isActive ? "block" : "hidden"}`}
              />
            </div>
          )}
        </NavLink>
      </ul>
      <div className="flex items-center gap-6">
        
        <img onClick={() => setShowSearch(!showSearch)} src={assets.search_icon} className="w-5 cursor-pointer" alt="" />
        <div className="group relative">
          <img
            src={assets.profile_icon}
            className="w-8 cursor-pointer"
            alt=""
          />
          <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
            <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
              <p className="cursor-pointer hover:text-black">My profiles</p>
              <p className="cursor-pointer hover:text-black">Orders</p>
              <p className="cursor-pointer hover:text-black">Logout</p>
            </div>
          </div>
        </div>
        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} className="w-5 min-w-5" alt="" />
          <p className="absolute -right-1.25 -bottom-1.25 w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
            0
          </p>
        </Link>

        <img
          onClick={() => {
            setVisible(true);
          }}
          src={assets.menu_icon}
          className="w-5 cursor-pointer sm:hidden"
          alt=""
        />
      </div>

      {/* Menu bar for small screens */}
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? "w-full" : "w-0"}`}
      >
        <div className="flex flex-col text-gray-600">
          <div
            onClick={() => {
              setVisible(false);
            }}
            className="flex items-center gap-4 p-3 cursor-pointer"
          >
            <img src={assets.dropdown_icon} className="h-4 rotate-180" alt="" />
            <p>Back</p>
          </div>

          <NavLink
            onClick={() => {
              setVisible(false);
            }}
            className="py-4 pl-5 border"
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            onClick={() => {
              setVisible(false);
            }}
            className="py-4 pl-5 border"
            to="/collections"
          >
            Collection
          </NavLink>
          <NavLink
            onClick={() => {
              setVisible(false);
            }}
            className="py-4 pl-5 border"
            to="/about"
          >
            About
          </NavLink>
          <NavLink
            onClick={() => {
              setVisible(false);
            }}
            className="py-4 pl-5 border"
            to="/contact"
          >
            Contact
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
