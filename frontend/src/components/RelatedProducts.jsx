import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title"
import ProductsItem from "../components/ProductsItem"

const RelatedProducts = ({ category, subCategory }) => {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      let productsCopy = products.slice();
      productsCopy = productsCopy.filter((item) => category === item.category);
      productsCopy = productsCopy.filter(
        (item) => subCategory === item.subCategory,
      );

      setRelated(productsCopy.slice(0, 4));
    }
  }, [products]);
  return (
    <div className="my-24">
      <div className="text-center text-3xl py-2">
        <Title text1 = {"You might also like this"} />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 gap-y-5 text-start">
            {
                related.map((item) => (
                    <ProductsItem key={item._id} id={item._id} image={item.image} name={item.name} price={item.price}/>
                ))
            }
        </div>
      </div>
    </div>
  );
};

export default RelatedProducts;
