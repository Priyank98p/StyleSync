import React, { useState } from "react";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const response = await fetch(`${backendUrl}/api/v1/users/admin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Tells the server we are sending JSON
        },
        body: JSON.stringify({ email, password }), // Manual stringification
      });
      const data = await response.json();

      if (response.ok && data.success) {
        setToken(data.data.accessToken);
        toast.success("Login Successful");
      } else {
        toast.error(data.message || "Admin login failed!");
      }

      if (data.success) {
        const token = data.data.accessToken;
        setToken(token);
        // Store ONLY the access token in localStorage for now
        localStorage.setItem("token", token);
      }

      console.log(data);
      return data;
    } catch (error) {
      console.error("Fetch Error:", error.message);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center w-full">
      <div className="bg-white shadow-md rounded-lg px-8 max-w-md">
        <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
        <form onSubmit={onSubmitHandler}>
          <div className="mb-3 min-w-72">
            <p className="text-sm font-medium text-gray-700 mb-2">
              Email address
            </p>
            <input
              className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Enter email"
              required
            />
          </div>
          <div className="mb-3 min-w-72">
            <p className="text-sm font-medium text-gray-700 mb-2">Password</p>
            <input
              className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Enter password"
              required
            />
          </div>

          <button
            className="my-4 w-full px-2 py-4 rounded-md text-white bg-black cursor-pointer"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
