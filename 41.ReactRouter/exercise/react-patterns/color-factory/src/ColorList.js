import React from "react";
import { Link } from "react-router-dom";
import "./ColorList.css";

function ColorList({ colors }) {
  const result = Object.keys(colors).map((name) => (
    <li key={name}>
      <Link to={`/colors/${name}`}>{name}</Link>
    </li>
  ));
  return (
    <>
      <div className="ColorList-header">
        <h1>Welcome to color factory</h1>
        <Link to="/colors/new">Add a color</Link>
      </div>
      <ul>{result}</ul>
    </>
  );
}

export default ColorList;
