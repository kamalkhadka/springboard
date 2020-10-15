import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Cart = () => {
  const products = useSelector((state) => state.products);
  const cart = useSelector((state) => state.cart);

  let total = 0;
  for (let id in cart) {
    const { price } = products[id];
    const quantity = cart[id];
    total += price * quantity;
  }

  return (
    <div>
      <p>Cart Total: ${total}</p>
      <Link to="/cart">View Cart</Link>
    </div>
  );
};

export default Cart;
