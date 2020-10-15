import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartAction from "./CartAction";

const CartDetails = () => {
  const cart = useSelector((state) => state.cart);
  const products = useSelector((state) => state.products);

  let total = 0;
  for (let id in cart) {
    const { price } = products[id];
    const quantity = cart[id];
    total += price * quantity;
  }

  const tableBody = Object.keys(cart).map((id) => {
    const quantity = cart[id];
    const { name, price } = products[id];

    return (
      <tr key={id}>
        <td>{name}</td>
        <td>{price}</td>
        <td>{quantity}</td>
        <td>
          <CartAction id={id} />
        </td>
      </tr>
    );
  });
  return (
    <div>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Item name</th>
            <th scope="col">Item Price</th>
            <th scope="col">Quantity</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>{tableBody}</tbody>
      </table>
      <p>Cart Total: ${total}</p>
      <Link to="/">Go Back</Link>
    </div>
  );
};

export default CartDetails;
