import React from "react";
import { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProfileView = ({ isOpen, setProfileOpen }) => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const { token, setToken, setCartItems } = useContext(ShopContext);
  const logout = async () => {
    setIsLoggingOut(true);
    if (!token) return;
    try {
      const response = await fetch(`${backendUrl}/api/v1/users/logout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });
      const data = await response.json();
      console.log(data);
      if (data.success) {
        toast.success(data.message);
        localStorage.removeItem("token");
        setToken("");
        setCartItems({});
        navigate("/login");
      }
    } catch (error) {
      console.error("Logout Error:", error.message);
      localStorage.removeItem("token");
      setToken("");
      setCartItems({});
      navigate("/login");
    }
    setIsLoggingOut(false);
  };

  return (
    <div
      className={`absolute dropdown-menu right-0 pt-4 z-20 ${isOpen ? "block" : "hidden group-hover:block"}`}
    >
      <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
        <p className="cursor-pointer hover:text-black">My profiles</p>
        <p
          onClick={() => {
            if (setProfileOpen) setProfileOpen(false);
            navigate("/orders");
          }}
          className="cursor-pointer hover:text-black"
        >
          Orders
        </p>
        <p onClick={logout} className="cursor-pointer hover:text-black">
          {isLoggingOut ? "Logging out..." : "Logout"}
        </p>
      </div>
    </div>
  );
};

export default ProfileView;
