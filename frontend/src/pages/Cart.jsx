import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { Link } from "react-router-dom";

const Cart = () => {
  const { products, currency, cartItems } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const data = [];
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          data.push({
            _id: items,
            size: item,
            quantity: cartItems[items][item],
          });
        }
      }
    }
    setCartData(data);
  }, [cartItems]);
  return (
    <div className="pt-10">
      <div className="text-5xl mb-4">
        <Title text1={"Your Cart"} />
      </div>

      <div className="">
        {cartData.length === 0 ? (
          <div className="border w-full h-100 gap-12 border-gray-300 rounded-3xl py-3 px-2 flex flex-col justify-center items-center">
            <p className="text-5xl font-extrabold">Your Cart Is Empty!</p>
            <Link to="/collections">
              <button className="py-4 px-6 border rounded-4xl w-50 bg-black text-white cursor-pointer transition ease-in-out hover:scale-102 hover:bg-gray-800">
                Shop Now
              </button>
            </Link>
          </div>
        ) : (
          cartData.map((item) => {
            const productData = products.find(
              (product) => product._id === item._id,
            );

            return (
              <div
                key={item._id}
                className="p-5 border border-gray-300 rounded-3xl my-3 text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
              >
                <div className="flex items-start gap-6">
                  <img
                    src={productData.image[0]}
                    className="w-16 sm:w-20 rounded"
                    alt=""
                  />
                  <div>
                    <p className="text-xs sm:text-lg font-medium">
                      {productData.name}
                    </p>
                    <p className="text-sm text-gray-500">Size: {item.size}</p>
                    <p className="text-lg font-bold mt-2">
                      {currency}
                      {productData.price}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-5 mt-2"></div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Cart;
