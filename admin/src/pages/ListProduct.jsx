import React, { useEffect, useState } from "react";
import { backendUrl, currency } from "../App.jsx";
import { toast } from "react-toastify";
import { useOutletContext } from "react-router-dom";
import { assets } from "../assets/assets.js";

const ListProduct = () => {
  const [listItems, setListItems] = useState([]);
  const { token } = useOutletContext();
  const fetchListItems = async () => {
    try {
      const response = await fetch(
        `${backendUrl}/api/v1/products/allProducts`,
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
        setListItems(data.data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Fetch Error:", error.message);
      toast.error("Failed to load products");
    }
  };

  const removeProduct = async (productId) => {
    try {
      const response = await fetch(`${backendUrl}/api/v1/products/remove`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: productId }),
      });

      const data = await response.json();
      if (data.success) {
        toast.success(data.message);
        await fetchListItems();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Fetch Error:", error.message);
      toast.error("Failed to remove product");
    }
  };

  useEffect(() => {
    fetchListItems();
  }, []);
  return (
    <div>
      <p className="mb-2">All Products List</p>
      <div className="flex flex-col gap-">
        <div className="hidden sm:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-2 px-4 border-gray-200 bg-gray-100 text-sm rounded-md">
          <b>Image</b>
          <b>Name</b>
          <b className="text-center">Category</b>
          <b className="text-center">Price</b>
          <b className="text-center">Action</b>
        </div>

        {listItems.length === 0 ? (
          <p className="text-center py-10 text-gray-400">No products found.</p>
        ) : (
          listItems.map((item) => (
            <div
              key={item._id}
              className="grid grid-cols-[1fr_3fr_1fr] sm:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-2 px-4 border border-gray-300 text-sm rounded-md hover:bg-gray-50 transition-colors"
            >
              <img
                className="w-12 mx-auto sm:mx-0"
                src={item?.image[0]}
                alt=""
              />
              <p>{item.name}</p>

              <p className="sm:text-center">{item.category}</p>
              <p className="sm:text-center">
                {currency}
                {item.price}
              </p>

              <div className="flex justify-center">
                <img
                  onClick={() => removeProduct(item._id)}
                  className="w-7 cursor-pointer hover:opacity-75 transition-opacity"
                  src={assets.remove}
                  alt="Remove"
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ListProduct;
