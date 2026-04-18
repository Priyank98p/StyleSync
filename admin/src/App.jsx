import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Login from "./components/Login";
import { ToastContainer } from "react-toastify";
import { Outlet } from "react-router-dom";

export const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const currency = "$"


function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || "");
  
  useEffect(()=>{

  })
  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer />
      {token === "" ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <Navbar setToken={setToken}/>
          <hr className="border-gray-300" />
          <div className="flex w-full">
            <Sidebar />
            <div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base">
              <Outlet context={{ token,backendUrl,currency }} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
