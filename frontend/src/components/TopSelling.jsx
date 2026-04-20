import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductsItem from "./ProductsItem";
import Skeleton from "react-loading-skeleton";

const TopSelling = () => {
  // Extracts the master product list from global context to access shared e-commerce data without relying on prop-drilling.
  const { products, isLoading } = useContext(ShopContext);
  const [topSelling, setTopSelling] = useState([]);

  // Filters the master list to find items marked as top sellers and isolates just the first four to create a curated preview, re-running whenever the global products data updates.
  useEffect(() => {
    const topProducts = products.filter((item) => item.topSelling);
    setTopSelling(topProducts.slice(0, 4));
  }, [products]);

  return (
    <div className="my-10">
      <div className="text-center py-8 text-5xl">
        <Title text1={"TOP SELLING"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta porro
          quam praesentium repudiandae, fugit fugiat nobis veniam ducimus
          laboriosam deserunt!
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 gap-y-4">
        {/* Dynamically renders a responsive grid of product cards by iterating over the filtered array and passing specific item details down as props. */}
        {isLoading
          ? Array(4)
              .fill(0)
              .map((_, i) => (
                <div key={i}>
                  <Skeleton height={300} className="rounded-2xl shadow-sm border border-gray-100"/>
                  <Skeleton width="80%" className="mt-2" />
                  <Skeleton width="40%" />
                </div>
              ))
          : topSelling.map((item) => (
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

export default TopSelling;
