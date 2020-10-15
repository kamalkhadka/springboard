import React, { useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { CHANGE_NUM } from "./actionTypes";

const NumberInputs = () => {
  const { num1, num2 } = useSelector(
    (state) => ({
      num1: state.nums.num1,
      num2: state.nums.num2,
    }),
    shallowEqual
  );
  const [inputs, setInputs] = useState({ num1, num2 });

  const dispatch = useDispatch();

  const changeNum = (num) => {
    dispatch({
      type: CHANGE_NUM,
      num,
      value: inputs[num],
    });
  };

  const handleChange = (evt) => {
    const { value, name } = evt.target;
    setInputs((inputs) => ({ ...inputs, [name]: +value }));
  };
  return (
    <div>
      <div>
        <label htmlFor="num1">First Number:</label>
        <input
          type="number"
          id="num1"
          value={inputs.num1}
          onChange={handleChange}
          name="num1"
        />
        <button onClick={() => changeNum("num1")}>Update</button>
      </div>
      <div>
        <label htmlFor="num2">Second Number:</label>
        <input
          type="number"
          id="num2"
          value={inputs.num2}
          onChange={handleChange}
          name="num2"
        />
        <button onClick={() => changeNum("num1")}>Update</button>
      </div>
    </div>
  );
};

export default NumberInputs;
