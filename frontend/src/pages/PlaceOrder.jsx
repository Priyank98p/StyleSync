import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const [method, setMethod] = useState("COD");
  const navigate = useNavigate();
  const {
    backendUrl,
    token,
    cartItems,
    setCartItems,
    products,
    getCartAmount,
    delivery_fee,
  } = useContext(ShopContext);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    phone: "",
  });

  const initPay = (order) => {
    if (!order) {
    toast.error("Order initialization failed");
    return;
  }
  const options = {
    key: import.meta.env.VITE_RAZORPAY_KEY_ID, 
    amount: order.amount,
    currency: order.currency,
    name: "StyleSync",
    description: "Order Payment",
    order_id: order.id, 
    handler: async (response) => {
      try {
        const res = await fetch(`${backendUrl}/api/v1/orders/verify-razorpay`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ ...response, orderId: order.notes.orderId }),
        });
        
        const verificationData = await res.json();
        if (verificationData.success) {
          setCartItems({});
          navigate("/orders");
          toast.success("Payment Successful!");
        }
      } catch (error) {
        console.log(error)
        toast.error("Verification failed");
      }
    },
    theme: { color: "#000000" },
  };
  const rzp = new window.Razorpay(options);
  rzp.open();
};

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      let orderItems = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items),
            );

            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      if (orderItems.length === 0) {
        toast.error("Your cart is empty");
        return;
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };

      switch (method) {
        case "COD": {
          const response = await fetch(`${backendUrl}/api/v1/orders/place`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(orderData),
          });
          const data = await response.json();
          if (data.success) {
            setCartItems({});
            navigate("/orders");
            toast.success(data.message);
          } else {
            toast.error(data.message);
          }
          break;
        }
        case "Stripe": {
          const stripeResponse = await fetch(
            `${backendUrl}/api/v1/orders/stripe`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify(orderData),
            },
          );
          const data = await stripeResponse.json();
          if (data.success) {
            const { session_url } = data.data;
            window.location.replace(session_url);
          } else {
            toast.error(data.message);
          }
          break;
        }

        case "Razorpay": {
          const response = await fetch(`${backendUrl}/api/v1/orders/razorpay`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(orderData),
          });

          const responseData = await response.json();

          if (responseData.success) {
            initPay(responseData.data);
          } else {
            toast.error(responseData.message);
          }
          break;
        }

        default:
          break;
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData((data) => ({ ...data, [name]: value }));
  };
  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh]"
    >
      {/* Left side (Delivery information) */}
      <div className="flex flex-col gap-4 w-full sm:max-w-120">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"Delivery Information"} />
        </div>
        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            value={formData.firstname}
            name="firstname"
            type="text"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            placeholder="Firstname"
          />
          <input
            required
            onChange={onChangeHandler}
            value={formData.lastname}
            name="lastname"
            type="text"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            placeholder="Lastname"
          />
        </div>
        <input
          required
          onChange={onChangeHandler}
          value={formData.email}
          name="email"
          type="email"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          placeholder="Enter Your Email"
        />
        <input
          required
          onChange={onChangeHandler}
          value={formData.street}
          name="street"
          type="text"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          placeholder="Street"
        />

        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            value={formData.city}
            name="city"
            type="text"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            placeholder="City"
          />
          <input
            required
            onChange={onChangeHandler}
            value={formData.state}
            name="state"
            type="text"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            placeholder="State"
          />
        </div>

        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            value={formData.pincode}
            name="pincode"
            type="number"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            placeholder="Pincode"
          />
          <input
            required
            onChange={onChangeHandler}
            value={formData.country}
            name="country"
            type="text"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            placeholder="Country"
          />
        </div>
        <input
          required
          onChange={onChangeHandler}
          value={formData.phone}
          name="phone"
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
            <div
              onClick={() => setMethod("Stripe")}
              className="flex items-center border border-gray-400 rounded-xl gap-3 p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border border-gray-500 rounded-full  ${method === "Stripe" ? "bg-green-400" : ""}`}
              ></p>
              <img className="h-5 mx-4" src={assets.stripe_logo} alt="" />
            </div>
            <div
              onClick={() => setMethod("Razorpay")}
              className="flex items-center border border-gray-400 rounded-xl gap-3 p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border border-gray-500 rounded-full ${method === "Razorpay" ? "bg-green-400" : ""}`}
              ></p>
              <img className="h-5 mx-4" src={assets.razorpay_logo} alt="" />
            </div>
            <div
              onClick={() => setMethod("COD")}
              className="flex items-center border border-gray-400 rounded-xl gap-3 p-3 py-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border border-gray-500 rounded-full ${method === "COD" ? "bg-green-400" : ""}`}
              ></p>
              <p className="text-gray-500 text-sm font-medium mx-4 ">
                Cash On Delivery
              </p>
            </div>
          </div>
        </div>
        <div className="w-full">
          <button
            type="submit"
            className="bg-black text-white p-3 rounded-4xl mt-4 cursor-pointer w-full"
          >
            Place Order
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
