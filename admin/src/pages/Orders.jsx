import React from "react";
import { useState, useEffect } from "react";
import {toast} from "react-toastify"
import { assets } from "../assets/assets.js";
import { useOutletContext } from "react-router-dom";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { token,backendUrl,currency } = useOutletContext()

  const fetchOrders = async () => {
    if (!token) return null;

    try {
      const response = await fetch(`${backendUrl}/api/v1/orders/allorders`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log(data);
      if (data.success) {
        setOrders(data.data.reverse()); // Show latest orders at the top
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load all orders");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [token]);
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-xl font-bold mb-4">Order Administration</h3>
      {orders.map((order, index) => (
        <div
          key={index}
          className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] md:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700 rounded-lg"
        >
          <img className="w-12" src={assets.parcel_icon} alt="Parcel" />

          <div>
            <div>
              {order.items.map((item, idx) => (
                <p key={idx} className="py-0.5">
                  {item.name} x {item.quantity} <span>{item.size}</span>
                  {idx !== order.items.length - 1 && ","}
                </p>
              ))}
            </div>
            <p className="mt-3 font-medium">
              {order.address.firstname + " " + order.address.lastname}
            </p>
            <p>{order.address.street + ","}</p>
            <p>
              {order.address.city +
                ", " +
                order.address.state +
                ", " +
                order.address.country +
                ", " +
                order.address.pincode}
            </p>
            <p>{order.address.phone}</p>
          </div>

          {/* Column 3: Stats */}
          <div>
            <p className="text-sm sm:text-[15px]">
              Items: {order.items.length}
            </p>
            <p className="mt-3">Method: {order.paymentMethod}</p>
            <p>Payment: {order.payment ? "Done" : "Pending"}</p>
            <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
          </div>

          {/* Column 4: Price */}
          <p className="text-sm sm:text-[15px] font-semibold">
            {currency}
            {order.amount}
          </p>

          {/* Column 5: Status Update Dropdown */}
          <select
            value={order.status}
            onChange={(e) => updateStatus(order._id, e.target.value)}
            className="p-2 font-semibold border border-gray-300 rounded outline-none"
          >
            <option value="Order Placed">Order Placed</option>
            <option value="Packing">Packing</option>
            <option value="Shipped">Shipped</option>
            <option value="Out for delivery">Out for delivery</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>
      ))}
    </div>
  );
};

export default Orders;
