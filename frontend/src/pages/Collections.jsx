import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductsItem from "../components/ProductsItem";
import PriceSlider from "../components/PriceSlider";

const Collections = () => {
  const [showFilters, setShowFilter] = useState(false);
  const [filterProducts, setfilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubcategory] = useState([]);
  const [sortType, setSortType] = useState("newest");

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(500);

  const { products, search, showSearch } = useContext(ShopContext);

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubcategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubcategory((prev) => [...prev, e.target.value]);
    }
  };

  const applyFilterAndSort = () => {
    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category),
      );
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.subCategory),
      );
    }

    productsCopy = productsCopy.filter(
      (item) => item.price >= minPrice && item.price <= maxPrice,
    );

    switch (sortType) {
      case "highestPrice":
        productsCopy.sort((a, b) => b.price - a.price);
        break;

      case "lowestPrice":
        productsCopy.sort((a, b) => a.price - b.price);
        break;

      case "mostPopular":
        productsCopy.sort(
          (a, b) => Number(b.topSelling) - Number(a.topSelling),
        );
        break;

      case "newest":
      default:
        break;
    }

    setfilterProducts(productsCopy);
  };

  useEffect(() => {
    applyFilterAndSort();
  }, [
    category,
    subCategory,
    minPrice,
    maxPrice,
    sortType,
    products,
    search,
    showSearch,
  ]);

  useEffect(() => {
    setfilterProducts(products);
  }, [products]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 items-start">
      {/* Sidebar / Filter Container */}
      <div className="flex sm:sticky sm:top-21 flex-col sm:border-2 sm:border-gray-200  p-4 rounded-2xl min-w-60">
        {/* Mobile Filter Button */}
        <div className="flex items-center justify-between sm:mb-4">
          <p className="hidden sm:block text-xl font-bold">Filters</p>
          <p
            onClick={() => setShowFilter(true)}
            className="sm:hidden flex items-center gap-2 cursor-pointer font-medium"
          >
            Filters
            <img className="h-4" src={assets.filter} alt="" />
          </p>
        </div>

        {/* ========================================= */}
        {/* THE DRAWER (Mobile) / THE SIDEBAR (Desktop) */}
        {/* ========================================= */}
        <div
          className={`
            fixed inset-0 z-50 bg-white p-6 transition-transform duration-300 ease-in-out
            sm:static sm:z-auto sm:p-0 sm:bg-transparent sm:translate-y-0
            ${showFilters ? "translate-y-0" : "translate-y-full"}
          `}
        >
          {/* Mobile Drawer Header (Hidden on desktop) */}
          <div className="flex justify-between items-center mb-6 sm:hidden">
            <h2 className="text-xl font-bold">Filters</h2>
            <img
              onClick={() => setShowFilter(false)}
              src={assets.cross_icon}
              className="h-5 cursor-pointer"
              alt="Close"
            />
          </div>

          {/* Categories */}
          <div className="border border-gray-300 pl-5 py-3 sm:mt-0 mt-6">
            <p className="mb-3 text-sm font-medium">Categories</p>
            <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
              <label className="flex gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  value={"Men"}
                  onChange={toggleCategory}
                />{" "}
                Men
              </label>
              <label className="flex gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  value={"Women"}
                  onChange={toggleCategory}
                />{" "}
                Women
              </label>
              <label className="flex gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  value={"Kids"}
                  onChange={toggleCategory}
                />{" "}
                Kids
              </label>
            </div>
          </div>

          {/* Subcategories */}
          <div className="border border-gray-300 pl-5 py-3 my-5">
            <p className="mb-3 text-sm font-medium">Type</p>
            <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
              <label className="flex gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  value={"Topwear"}
                  onChange={toggleSubCategory}
                />{" "}
                Topwear
              </label>
              <label className="flex gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  value={"Bottomwear"}
                  onChange={toggleSubCategory}
                />{" "}
                Bottomwear
              </label>
              <label className="flex gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  value={"Winterwear"}
                  onChange={toggleSubCategory}
                />{" "}
                Winterwear
              </label>
            </div>
          </div>

          <div>
            <PriceSlider
              minPrice={minPrice}
              maxPrice={maxPrice}
              setMinPrice={setMinPrice}
              setMaxPrice={setMaxPrice}
            />
          </div>

          {/* Optional Mobile Apply Button */}
          <button
            onClick={() => setShowFilter(false)}
            className="w-full bg-black text-white py-3 mt-4 rounded sm:hidden"
          >
            Apply Filters
          </button>
        </div>
      </div>

      {/* Product Grid Area*/}
      <div className="flex-1 border-2 border-gray-200 p-4 rounded-2xl min-h-125">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={"All Products"} />
          <div className="flex items-center mb-4">
            <p className="text-sm text-gray-600 ">Sort by : </p>
            <select
              onChange={(e) => setSortType(e.target.value)}
              className="text-sm font-medium outline-none"
            >
              <option value="newest">Newest</option>
              <option value="mostPopular">Most Popular</option>
              <option value="highestPrice">Highest Price</option>
              <option value="lowestPrice">Lowest Price</option>
            </select>
          </div>
        </div>

        {/* Products */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-2">
          {filterProducts.map((item) => (
            <ProductsItem
              key={item._id}
              name={item.name}
              id={item._id}
              price={item.price}
              image={item.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collections;
