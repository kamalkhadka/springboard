import React from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import CartAction from "./CartAction";

const ItemDetails = () => {
  const { id } = useParams();
  const { image_url, name, price, description } = useSelector((state) => ({
    ...state.products[id],
  }));

  return (
    <div className="row justify-content-center">
      <div className="card">
        <img class="card-img-top" src={image_url} alt={name} />
        <div className="card-body">
          <h5 class="card-title">{name}</h5>
          <p class="card-text">${price}</p>
          <p className="card-text">{description}</p>
          <CartAction id={id} />
        </div>
        <Link to="/">Go Back</Link>
      </div>
    </div>
  );
};

export default ItemDetails;
