import React, { useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const PlaceOrder = () => {
  const [method, setMethod] = useState("COD")

  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh]">
      {/* Left side (Delivery information) */}
      <div className="flex flex-col gap-4 w-full sm:max-w-120">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"Delivery Information"} />
        </div>
        <div className="flex gap-3">
          <input
            type="text"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            placeholder="Firstname"
          />
          <input
            type="text"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            placeholder="Lastname"
          />
        </div>
        <input
          type="email"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          placeholder="Enter Your Email"
        />
        <input
          type="text"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          placeholder="Street"
        />

        <div className="flex gap-3">
          <input
            type="text"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            placeholder="City"
          />
          <input
            type="text"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            placeholder="State"
          />
        </div>

        <div className="flex gap-3">
          <input
            type="number"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            placeholder="Zipcode"
          />
          <input
            type="text"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            placeholder="Country"
          />
        </div>

        <input
          type="number"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          placeholder="Phone"
        />
      </div>

      {/* Right side */}
      <div className="mt-8">
        <div className="mt-9 min-w-80">
          <CartTotal />
        </div>
        <div className="mt-8">
          <Title text1={"Payment method"} />
          <div className="flex gap-3 flex-col lg:flex-row">
            <div onClick={() => setMethod('stripe')} className="flex items-center border border-gray-400 rounded-xl gap-3 p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border border-gray-500 rounded-full  ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
              <img className="h-5 mx-4" src={assets.stripe_logo} alt="" />
            </div>
            <div onClick={() => setMethod('razorpay')} className="flex items-center border border-gray-400 rounded-xl gap-3 p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border border-gray-500 rounded-full ${method === 'razorpay' ? 'bg-green-400' : ''}`}></p>
              <img className="h-5 mx-4" src={assets.razorpay_logo} alt="" />
            </div>
            <div onClick={() => setMethod('COD')} className="flex items-center border border-gray-400 rounded-xl gap-3 p-3 py-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border border-gray-500 rounded-full ${method === 'COD' ? 'bg-green-400' : ''}`}></p>
              <p className="text-gray-500 text-sm font-medium mx-4 ">
                Cash On Delivery
              </p>
            </div>
          </div>
        </div>
        <div className="w-full">
          <Link to="/orders">
              <button className="bg-black text-white p-3 rounded-4xl mt-4 cursor-pointer w-full">
                Place Order
              </button>
            </Link>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
