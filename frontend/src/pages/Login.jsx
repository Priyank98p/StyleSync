import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import {useNavigate} from "react-router-dom"

const Login = () => {
  const navigate = useNavigate()
  const [currentState, setCurrentState] = useState("Login");
  const { token, setToken, backendUrl } = useContext(ShopContext);

  const [fullname, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      let response
      if (currentState === "Sign-up") {
        response = await fetch(`${backendUrl}/api/v1/users/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ fullname, email, password }),
        });

      } else {
        response = await fetch(`${backendUrl}/api/v1/users/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        
      }
      const data = await response.json();

        if (data.success) {
          setToken(data.data.accessToken);
          toast.success(data.message);
          localStorage.setItem("token", data.data.accessToken);
        } else {
          toast.error(data.message);
        }
    } catch (error) {
      console.log("Fetch Error:", error.message);
      toast.error(error.message);
    }
  };

  useEffect(() =>{
    if(token){
      navigate("/")
    }
  },[token])

  return (
    <form
      onSubmit={onSubmitHandler}
      action=""
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mb-3 mt-10">
        <p className="text-3xl">{currentState}</p>
      </div>
      {currentState === "Login" ? (
        ""
      ) : (
        <input
          onChange={(e) => setFullName(e.target.value)}
          value={fullname}
          required
          type="text"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Full Name"
        />
      )}
      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        required
        type="email"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Enter email address"
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        required
        type="password"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Enter password"
      />

      <div className="w-full flex justify-between text-sm -mt-2">
        <p className="cursor-pointer">Forgot your password</p>
        {currentState === "Login" ? (
          <p
            onClick={() => setCurrentState("Sign-up")}
            className="cursor-pointer text-blue-800"
          >
            Create Account
          </p>
        ) : (
          <p
            onClick={() => setCurrentState("Login")}
            className="cursor-pointer text-blue-800"
          >
            Sign in
          </p>
        )}
      </div>
      <button className="bg-black text-white p-3 rounded-4xl w-[30%] cursor-pointer">
        {currentState === "Login" ? "Sign in" : "Sign up"}
      </button>
    </form>
  );
};

export default Login;
