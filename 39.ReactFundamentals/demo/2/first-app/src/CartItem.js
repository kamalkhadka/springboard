import React from "react";
import "./CartItem.css";

const CartItem = ({ name, price, quantity }) => {
  return (
    <div className="CartItem">
      <h4 className="CartItem-title">{name}</h4>
      <ul>
        <li style={{color: 'magenta', backgroundColor: 'yellow'}}>Price: ${price}</li>
        <li>Quantity: {quantity}</li>
        <li>Subtotal: ${price * quantity}</li>
      </ul>
    </div>
  );
};

export default CartItem;
