import React, { useState } from "react";
import ColorButtons from "./ColorButtons";
import Circle from "./Circle";

function BrokenColorfulCircles() {
  const [colors, setColors] = useState([]);

  const addColor = newColor => {
    // this doesn't work!
    // without using setColors, component doesn't know
    // that it needs to re-render
    colors.push(newColor);
  };

  return (
    <div>
      <ColorButtons addColor={addColor} />
      {colors.map((color, i) => (
        <Circle color={color} key={i} idx={i} />
      ))}
    </div>
  );
}

export default BrokenColorfulCircles;
