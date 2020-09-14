import React, { useState } from "react";
import NumberItemAlt from "./NumberItemAlt";

function NumberListAlt() {
  const [nums, setNums] = useState([1, 2, 3, 4]);

  const remove = num => {
    setNums(nums.filter(n => n !== num));
  };

  const numsList = nums.map(n => (
    <NumberItemAlt 
      value={n}
      key={n} 
      remove={evt => remove(n)}
    />)
  );
  
  return <ul>{numsList}</ul>;
};
// end

export default NumberListAlt;
