import React from "react";
import CartItem from "./CartItem";
import "./ShoppingCart.css";

const ShoppingCart = ({ items }) => {
  const total = items.reduce((acc, i) => {
    return acc + i.price * i.quantity;
  }, 0);

  return (
    <div className="ShoppingCart">
      <h1 className="ShoppingCart-header">Shopping Cart</h1>
      <div>
        {items.map((i) => (
          <CartItem name={i.name} price={i.price} quantity={i.quantity} />
        ))}
      </div>
      <b className="ShoppingCart-total">Cart Total: ${total}</b>
    </div>
  );
};
export default ShoppingCart;
