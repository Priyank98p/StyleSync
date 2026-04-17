import React from "react";

const Navbar = ({ setToken }) => {
  const logout = () => {
    setToken("");
    localStorage.removeItem("token");
  };

  return (
    <div className="flex items-center py-2 px-[4%] justify-between">
      <div>
        <h1 className="font-extrabold text-4xl">StyleSync</h1>
        <p className="font-medium text-red-400 mt-2">ADMIN PANEL</p>
      </div>
      <button
        onClick={logout}
        className="bg-gray-900 text-white rounded-full px-5 py-2 sm:px-7 sm:py-2 cursor-pointer transition-all ease-in-out hover:scale-103"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
