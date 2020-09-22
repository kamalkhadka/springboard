import React from "react";
import { Link } from "react-router-dom";

const Sardine = ({ name }) => {
  return (
    <div>
      <h1>{name.toUpperCase()}</h1>
      <Link to="/">Go Back</Link>
    </div>
  );
};

export default Sardine;
