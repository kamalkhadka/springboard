import React from "react";

const Card = ({ image }) => {
  return (
    <div style={{display: "inline-block", margin: `10px 0 0 0`}}>
      <img src={image} alt="" />
    </div>
  );
};

export default Card;
