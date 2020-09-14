import React from "react";

function NumberItemAlt(props) {
  return (
    <li>
      {props.value}
      <button onClick={props.remove}>X</button>
    </li>
  );
}
// end

export default NumberItemAlt;
