import React, { useContext, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";

const Verify = () => {
  const navigate = useNavigate();
  const { token, setCartItems, backendUrl } = useContext(ShopContext);
  const [searchParams] = useSearchParams();

  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const verifyPayment = async () => {
    try {
      if (!token) {
        return null;
      }

      const response = await fetch(
        `${backendUrl}/api/v1/orders/verify-stripe`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ success, orderId }),
        },
      );
      const data = await response.json();
      if (data.success) {
        setCartItems({});
        navigate("/orders");
        toast.success(data.message);
      } else {
        navigate("/cart");
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
   if (token) {
      verifyPayment();
    }
  }, [token]);
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center">
      <div className="w-16 h-16 border-4 border-gray-300 border-t-black rounded-full animate-spin mb-4"></div>
      <p className="text-lg font-medium text-gray-700">
        Verifying your payment...
      </p>
      <p className="text-sm text-gray-500 mt-2">
        Please do not close this window.
      </p>
    </div>
  );
};

export default Verify;
