import React from "react";
import { shallowEqual, useSelector } from "react-redux";

const Math = () => {
  const { num1, num2 } = useSelector(
    (state) => ({
      num1: state.nums.num1,
      num2: state.nums.num2,
    }),
    shallowEqual
  );
  return (
    <div>
      <h3>Math Facts:</h3>
      <ul>
        <li>Sum: {num1 + num2}</li>
        <li>Difference: {num1 - num2}</li>
        <li>Product: {num1 * num2}</li>
        <li>Quotient: {num1 % num2}</li>
      </ul>
    </div>
  );
};

export default Math;
