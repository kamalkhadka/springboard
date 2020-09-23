import React from "react";
import { Link } from "react-router-dom";

const DogList = ({ names }) => {
  return (
    <ul>
      {names.map((name) => (
        <li key={name}>
          <Link  to={"/dogs/" + name}>
            {name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default DogList;
