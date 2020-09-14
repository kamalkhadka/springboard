import React, { useState } from "react";
import ColorButtons from "./ColorButtons";
import Circle from "./Circle";

function ColorfulCircles() {
  const [colors, setColors] = useState([]);

  const addColor = newColor => {
    setColors(colors => [...colors, newColor]); // make a *new* array
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

export default ColorfulCircles;
