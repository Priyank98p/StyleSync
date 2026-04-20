import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductsItem from "./ProductsItem";
import Skeleton from "react-loading-skeleton";

const LatestCollection = () => {
  const { products, isLoading } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    if (products && products.length > 0) {
      setLatestProducts(products.slice(0, 8));
    }
  }, [products]);

  return (
    <div className="my-10">
      <div className="text-center py-10 text-5xl">
        <Title text1={"NEW ARRIVALS"} />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 gap-y-4">
        {isLoading
          ? Array(8)
              .fill(0)
              .map((_, i) => (
                <div key={i}>
                  <Skeleton height={300}  className="rounded-2xl shadow-sm border border-gray-100"/>
                  <Skeleton width="80%" className="mt-2" />
                  <Skeleton width="40%" />
                </div>
              ))
          : latestProducts.map((item) => (
              <ProductsItem
                key={item._id}
                id={item._id}
                image={item.image}
                name={item.name}
                price={item.price}
              />
            ))}
      </div>
    </div>
  );
};

export default LatestCollection;
