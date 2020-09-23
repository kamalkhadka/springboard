import React from "react";
import { Link } from "react-router-dom";

function Nav({ foods }) {
  return (
    <ul>
      {foods.map(food => (
        <li key={food}>
          <Link to={`/food/${food}`}>Show me the {food}!</Link>
        </li>
      ))}
    </ul>
  );
}

Nav.defaultProps = {
  foods: ["burrito", "salad", "sushi", "pasta"]
};

export default Nav;
