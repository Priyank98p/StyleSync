import React from "react";
import { assets } from "../assets/assets";

const NewsLetterBox = () => {
  const onSubmitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col md:flex-col lg:flex-row items-center justify-between bg-black rounded-3xl px-16 py-14 gap-6">
      <div className="items-start flex w-full flex-col justify-center">
        <p className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white">
          STAY UPTO DATE ABOUT OUR LATEST OFFERS
        </p>
      </div>

      <form
        onClick={onSubmitHandler}
        className="flex flex-col justify-center gap-3"
        action=""
      >
        <div className="flex items-center w-full rounded-full bg-white px-4 py-4 ">
          <img className="w-10" src={assets.mail} alt="" />
          <input
            type="email"
            placeholder="Enter your email address"
            className="h-full px-5 text-xl outline-none placeholder:text-lg"
          />
        </div>
        <button
          className="bg-gray-300 text-black hover:bg-gray-200 py-4 cursor-pointer rounded-full px-10 text-lg transition-all font-semibold"
          type="submit"
        >
          Subscribe to Newsletter
        </button>
      </form>
    </div>
  );
};

export default NewsLetterBox;
