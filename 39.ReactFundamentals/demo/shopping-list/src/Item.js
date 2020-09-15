import React, { useState } from "react";

const Item = ({ id, name, qty }) => {
  return (
    <ul>
      <li>Product name: {name}</li>
      <li>Quantity: {qty}</li>
    </ul>
  );
};

export default Item;
