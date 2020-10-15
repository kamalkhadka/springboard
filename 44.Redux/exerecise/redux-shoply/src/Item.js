import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import CartAction from "./CartAction";

const Item = ({ name, id }) => {
  return (
    <div className="col">
      <div className="card mb-3">
        <div className="card-body" title="remove item">
          <p className="card-text">
            <Link to={`/products/${id}`}>{name}</Link>
          </p>
          <CartAction id={id} />
        </div>
      </div>
    </div>
  );
};

export default Item;
