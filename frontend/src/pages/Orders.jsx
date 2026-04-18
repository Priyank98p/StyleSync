import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  const getOrderData = async () => {
    if (!token) return null;

    const response = await fetch(`${backendUrl}/api/v1/orders/user-orders`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (data.success) {
      let allOrdersItem = [];

      data.data.map((order) => {
        order.items.map((item) => {
          item["status"] = order.status;
          item["paymentMethod"] = order.paymentMethod;
          item["payment"] = order.payment;
          item["date"] = order.createdAt;

          allOrdersItem.push(item);
        });
      });

      setOrderData(allOrdersItem.reverse())
    }
  };

  useEffect(() => {
    getOrderData();
  }, [token]);
  return (
    <div className="pt-16">
      <div className="text-2xl">
        <Title text1={"Your orders"} />
      </div>

      <div className="">
        {orderData.map((item) => (
          <div
            key={item._id}
            className="py-4 border-t border-b border-gray-300 text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            <div className="flex items-start gap-6 text-sm">
              <img src={item.image[0]} className="w-16 sm:w-20" alt="" />
              <div>
                <p className="sm:text-base font-medium">{item.name}</p>
                <div className="flex items-center gap-3 mt-2 text-base text-gray-700">
                  <p>
                    {currency} {item.price}
                  </p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Size:{item.size} </p>
                </div>
                <p className="mt-2">
                  Date: <span className="text-gray-400">{new Date(item.date).toDateString()}</span>
                </p>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-between">
              <div className="flex items-center gap-2">
                <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                <p className="text-sm md:text-base">{item.status}</p>
              </div>
              <button onClick={getOrderData} className="border px-4 py-2 text-sm font-medium rounded-sm cursor-pointer hover:bg-gray-100">
                Track Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
