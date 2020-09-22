import React from "react";
import { Link } from "react-router-dom";

const Snack = ({ name }) => {
  return <div><Link to={name}>{name}</Link></div>;
};

export default Snack;
