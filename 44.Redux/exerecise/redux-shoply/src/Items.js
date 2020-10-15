import React from "react";
import { useSelector } from "react-redux";
import Item from "./Item";

const Items = () => {
  const products = useSelector((state) => state.products);

  const items = Object.keys(products).map((id) => (
    
      <Item key={id} name={products[id].name} id={id} />
    
  ));

  return (
    <div className="row">
      {items}
    </div>
  );
};

export default Items;
