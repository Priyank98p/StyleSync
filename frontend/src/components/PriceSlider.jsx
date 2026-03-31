import React from "react"; // Removed useState here

// Accept the props passed from Collections.jsx
const PriceSlider = ({ minPrice, maxPrice, setMinPrice, setMaxPrice }) => {
  // Define your absolute minimum and maximum allowed prices
  const minAllowed = 0;
  const maxAllowed = 500;

  const handleMinChange = (e) => {
    const value = Math.min(Number(e.target.value), maxPrice - 10);
    setMinPrice(value); // Now updates the state in Collections!
  };

  const handleMaxChange = (e) => {
    const value = Math.max(Number(e.target.value), minPrice + 10);
    setMaxPrice(value); // Now updates the state in Collections!
  };

  return (
    <div className="w-full max-w-sm mt-4">
      <h3 className="text-xl font-bold mb-6">Price</h3>

      <div className="relative h-1.5 bg-gray-200 rounded-full">
        <div
          className="absolute h-full bg-black rounded-full"
          style={{
            left: `${(minPrice / maxAllowed) * 100}%`,
            right: `${100 - (maxPrice / maxAllowed) * 100}%`,
          }}
        ></div>

        <input
          type="range"
          min={minAllowed}
          max={maxAllowed}
          value={minPrice}
          onChange={handleMinChange}
          className="absolute w-full -top-1.5 appearance-none bg-transparent pointer-events-none 
                     [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:pointer-events-auto 
                     [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-black 
                     [&::-webkit-slider-thumb]:rounded-full cursor-pointer"
        />

        <input
          type="range"
          min={minAllowed}
          max={maxAllowed}
          value={maxPrice}
          onChange={handleMaxChange}
          className="absolute w-full -top-1.5 appearance-none bg-transparent pointer-events-none 
                     [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:pointer-events-auto 
                     [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-black 
                     [&::-webkit-slider-thumb]:rounded-full cursor-pointer"
        />
      </div>

      <div className="flex justify-between items-center mt-4 text-gray-700">
        <p>${minPrice}</p>
        <p>${maxPrice}</p>
      </div>
    </div>
  );
};

export default PriceSlider;
