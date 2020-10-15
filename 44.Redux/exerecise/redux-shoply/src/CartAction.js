import React from "react";
import { useDispatch } from "react-redux";
import { removeItem, addItem } from "./Actions";

const CartAction = ({ id }) => {
  const dispatch = useDispatch();

  const remove = () => dispatch(removeItem(id));
  const add = () => dispatch(addItem(id));

  return (
    <div>
      <button className="btn btn-secondary mr-3" onClick={remove}>
        -
      </button>
      <button className="btn btn-primary" onClick={add} title="add item">
        +
      </button>
    </div>
  );
};

export default CartAction;
