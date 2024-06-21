import React from "react";

const Button = ({ onClick, className, icons }) => {
  return (
    <div>
      <button className={className} onClick={onClick}>
        {icons}
      </button>
    </div>
  );
};

export default Button;
