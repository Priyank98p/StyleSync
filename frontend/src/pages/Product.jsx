import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";
import { toast } from "react-toastify";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart, token } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");
  const navigate = useNavigate();

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
        return null;
      }
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);
  return productData ? (
    <div className="pt-10 transition-opacity ease-in duration-500 opacity-100">
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* Product images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row ">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.5%] w-full">
            {productData.image.map((item) => (
              <div
                key={item._id}
                className="w-[24%] sm:w-full sm:mb-3 shrink-0 overflow-hidden rounded-2xl"
              >
                <img
                  onClick={() => setImage(item)}
                  src={item}
                  className="w-full h-full cursor-pointer hover:scale-105 transition ease-in-out"
                  alt=""
                />
              </div>
            ))}
          </div>
          <div className="w-full sm:w-[80%] overflow-hidden rounded-3xl">
            <img
              className="w-full h-auto hover:scale-105 transition ease-in-out cursor-pointer"
              src={image}
              alt=""
            />
          </div>
        </div>
        <div className="flex-1">
          <h1 className="font-bold text-3xl mt-2">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} className="w-3" alt="" />
            <img src={assets.star_icon} className="w-3" alt="" />
            <img src={assets.star_icon} className="w-3" alt="" />
            <img src={assets.star_icon} className="w-3" alt="" />
            <img src={assets.star_dull_icon} className="w-3" alt="" />
            <p className="pl-2">{122}</p>
          </div>
          <p className="mt-5 text-3xl font-medium">
            {currency}
            {productData.price}
          </p>
          <p className="mt-5 text-gray-500 md:w-4/5">
            {productData.description}
          </p>
          <div className="flex flex-col gap-4 my-5">
            <p>Choose size</p>
            <div className="flex gap-4">
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  className={`border w-12 h-12 rounded-full cursor-pointer py-2 px-2 bg-gray-100 ${item === size ? "bg-gray-900 text-white " : ""}`}
                  key={index}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={() => (token ? addToCart(productData._id, size) : navigate("/login") && toast.info("Please login to continue"))}
            className="bg-black text-white text-center px-8 py-3 rounded-4xl active:bg-gray-600 cursor-pointer"
          >
            Add to Cart
          </button>

          <div className="text-sm text-gray-600 mt-5 flex flex-col gap-1">
            <p className="">100% Original Product.</p>
            <p className="">Cash on Delivery Available.</p>
            <p className="">Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      {/* Description and reviews */}
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm">Reviews (122)</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-600">
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vel atque
            recusandae reiciendis, ipsum possimus consectetur non soluta dolore
            repellat iure, eius dolorum iste ab enim optio, similique at quae
            dolorem!
          </p>
          <p>
            doloribus sed sunt, officiis, nihil facilis aspernatur vero
            blanditiis fuga recusandae quaerat incidunt soluta.
          </p>
        </div>
      </div>

      {/* display related products */}

      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
      <div></div>
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
