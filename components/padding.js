import React from "react";

const Padding = ({ children, className }) => {
  return (
    <div className={` ${className} px-[1rem] md:px-[2rem] lg:px-[3rem] `}>
      {children}
    </div>
  );
};

export default Padding;
