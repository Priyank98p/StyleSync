import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";

const Cart = () => {
  const { products, currency, cartItems, updateQuantity } =
    useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
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
    }
  }, [cartItems, products]);
  return (
    <div className="pt-10">
      <div className="text-5xl mb-8">
        <Title text1={"Your Cart"} />
      </div>

      {/* 1. THE MAIN WRAPPER: Flex column on mobile, Flex row on desktop (lg:flex-row) */}
      <div className="flex flex-col lg:flex-row gap-2 items-start">
        {/* LEFT COLUMN: Cart Items (Takes up 2/3 of the screen on desktop) */}
        <div className="w-full">
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
                  key={`${item._id}-${item.size}`}
                  className="p-5 border border-gray-200 rounded-2xl my-3 text-gray-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm"
                >
                  {/* LEFT SIDE: Image and Product Details */}
                  <div className="flex items-start gap-4 sm:gap-6">
                    <div className="w-20 h-24 sm:w-24 sm:h-32 shrink-0 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                      <img
                        src={productData.image[0]}
                        className="w-full h-full object-cover mix-blend-multiply"
                        alt={productData.name}
                      />
                    </div>

                    <div className="flex flex-col">
                      <h3 className="text-base sm:text-xl font-bold mb-1">
                        {productData.name}
                      </h3>

                      <div className="text-sm text-gray-600 space-y-0.5 mb-3">
                        <p>Size: {item.size}</p>
                      </div>

                      <div className="flex items-center gap-3">
                        <p className="text-xl font-black">
                          {currency}
                          {productData.price}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* RIGHT SIDE: Quantity and Delete Button */}
                  <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center w-full sm:w-auto gap-4 sm:gap-8 mt-4 sm:mt-0">
                    <button
                      title="Remove from cart"
                      className="text-red-500 hover:text-red-600 transition-colors cursor-pointer order-2 sm:order-1"
                    >
                      <img
                        onClick={() => updateQuantity(item._id, item.size, 0)}
                        src={assets.delete_icon}
                        className="w-5"
                        alt="Delete"
                      />
                    </button>

                    <div className="flex items-center bg-gray-100 rounded-full overflow-hidden order-1 sm:order-2 h-10 w-38">
                      <button
                        onClick={() => {
                          if (item.quantity > 1) {
                            updateQuantity(
                              item._id,
                              item.size,
                              item.quantity - 1,
                            );
                          }
                        }}
                        className="flex-1 flex items-center justify-center hover:bg-gray-200 transition-colors h-full text-lg cursor-pointer"
                      >
                        <img src={assets.sub} alt="minus" />
                      </button>
                      <span className="flex-1 text-center font-normal text-xl">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item._id, item.size, item.quantity + 1)
                        }
                        className="flex-1 flex items-center justify-center hover:bg-gray-200 transition-colors h-full text-lg cursor-pointer"
                      >
                        <img src={assets.add} alt="plus" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
        {cartData.length > 0 && (
          <div className="w-full lg:w-1/3 lg:sticky lg:top-24">
            <CartTotal />
            <Link to="/place-order">
              <button className="bg-black text-white p-3 rounded-4xl mt-4 cursor-pointer w-full">
                Go to Checkout
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
