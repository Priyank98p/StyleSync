import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { Link } from "react-router-dom";

const Orders = () => {
  const { backendUrl, token, currency, isLoading } = useContext(ShopContext);
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

      setOrderData(allOrdersItem.reverse());
    }
  };

  useEffect(() => {
    getOrderData();
  }, [token]);
  return (
    <div className="pt-16">
      <div className="text-3xl">
        <Title text1={"Your orders"} />
      </div>
      {orderData.length > 0 ? (
        <div className="">
          {isLoading
            ? Array(4)
                .fill(0)
                .map((_, i) => (
                  <div
                    key={i}
                    className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="flex items-start gap-6">
                      <Skeleton width={80} height={80} />
                      <div>
                        <Skeleton width={150} height={20} className="rounded-xl shadow-sm border border-gray-100"/>
                        <Skeleton width={100} className="mt-2" />
                      </div>
                    </div>
                    <Skeleton width={100} height={40} />
                  </div>
                ))
            : orderData.map((item) => (
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
                        Date:{" "}
                        <span className="text-gray-400">
                          {new Date(item.date).toDateString()}
                        </span>
                      </p>
                      <p>
                        Payment method:{" "}
                        <span className="text-gray-500">
                          {" "}
                          {item.paymentMethod}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="md:w-1/2 flex justify-between">
                    <div className="flex items-center gap-2">
                      <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                      <p className="text-sm md:text-base">{item.status}</p>
                    </div>
                    <button
                      onClick={getOrderData}
                      className="border px-4 py-2 text-sm font-medium rounded-sm cursor-pointer hover:bg-gray-100"
                    >
                      Track Order
                    </button>
                  </div>
                </div>
              ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center my-[30vh] gap-5">
          <h1 className="text-2xl font-bold">You have no orders</h1>
          <div>
            <Link to="/collections">
              <button className="bg-black text-white px-8 py-4 m-2 rounded-full cursor-pointer">
                Shop now
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
