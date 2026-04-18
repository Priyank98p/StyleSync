import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

// eslint-disable-next-line react-refresh/only-export-components
export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = 10;

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("")

  const addToCart = async (itemId, size) => {
    let cartData = structuredClone(cartItems);
    if (!size) {
      toast.error("Please select product size!");
      return;
    }

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    setCartItems(cartData);

   if(token){
      await fetch(`${backendUrl}/api/v1/cart/add-to-cart`,
        {
          method:"POST",
          headers: {
             Authorization : `Bearer ${token}`,
             "Content-Type": "application/json"
          },
          body:JSON.stringify({itemId,size})
        }
      )
    }
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {

      for (const item in cartItems[items]) {
        
        if (cartItems[items][item] > 0) {
          totalCount += 1;
        }
      }
    }

    return totalCount;
  };

  const getProductData = async () => {
    try {
      const response = await fetch(
        `${backendUrl}/api/v1/products/all-products`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const data = await response.json();

      if (data.success) {
        setProducts(data.data);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const getUserCartData = async (token) => {
    try {
      const response = await fetch(
        `${backendUrl}/api/v1/cart/get-cart`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );
      const data = await response.json();
      if (data.success) {
        setCartItems(data.data);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getProductData();
  }, [backendUrl]);

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;
    setCartItems(cartData);

    if(token){
      await fetch(`${backendUrl}/api/v1/cart/update-cart`,
        {
          method:"POST",
          headers: {
             Authorization : `Bearer ${token}`,
             "Content-Type": "application/json"
          },
          body: JSON.stringify({itemId,size,quantity})
        }
      )
    }
  };

useEffect(() => {
  
  const storedToken = localStorage.getItem('token');
  if (storedToken) {
    setToken(storedToken);
    getUserCartData(storedToken); 
  }
}, []);

useEffect(() => {
  if(token){
    getUserCartData(token)
  }else{

    setCartItems()
  }
},[token])

  const getCartAmount = () => {
    let totalAmount = 0;

    for (const items in cartItems) {
      let productInfo = products.find((product) => product._id === items);
      for (const item in cartItems[items]) {
        if (productInfo && cartItems[items][item] > 0) {
          totalAmount += productInfo.price * cartItems[items][item];
        }
      }
    }
    return totalAmount;
  };

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getCartCount,
    setCartItems,
    updateQuantity,
    getCartAmount,
    backendUrl,
    token,
    setToken
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
