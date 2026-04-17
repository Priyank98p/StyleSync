import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets.js";

const Sidebar = () => {
  return (
    <div className="w-[18%] min-h-screen border-gray-300 border-r-2">
      <div className="flex flex-col gap-4 pt-6 text-[15px] pl-[20%] overflow-hidden">
        <NavLink
          className="flex items-center gap-3 transition-all ease-in-out hover:scale-103 border border-gray-300 border-r-0 px-3 py-2 rounded-1"
          to="/add"
        >
          <img className="w-8" src={assets.add_icon} alt="" />
          <p className="hidden sm:block">Add items</p>
        </NavLink>
        <NavLink
          className="flex items-center gap-3 transition-all ease-in-out hover:scale-103 border border-gray-300 border-r-0 px-3 py-2 rounded-1"
          to="/allProducts"
        >
          <img className="w-8" src={assets.list_icon} alt="" />
          <p className="hidden sm:block">List items</p>
        </NavLink>
        <NavLink
          className="flex items-center gap-3 transition-all ease-in-out hover:scale-103 border border-gray-300 border-r-0 px-3 py-2 rounded-1"
          to="/orders"
        >
          <img className="w-8" src={assets.order_icon} alt="" />
          <p className="hidden sm:block">Orders</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
