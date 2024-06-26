import React from "react";

const Headers = ({ address, span, h1 }) => {
  return (
    <header className="flex flex-col justify-center items-center mb-4">
      <span className="font-semibold text-lg md:text-3xl lg:text-4xl">{span}</span>
      {/* <h1 className="font-normal text-md md:text-2xl lg:text-3xl">{h1}</h1> */}
      {/* <span className="font-medium text-xs md:text-sm">{address}</span> */}
    </header>
  );
};

export default Headers;
