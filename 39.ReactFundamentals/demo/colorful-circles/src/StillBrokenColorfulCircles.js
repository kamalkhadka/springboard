import React, { useState } from "react";
import ColorButtons from "./ColorButtons";
import Circle from "./Circle";

function StillBrokenColorfulCircles() {
  const [colors, setColors] = useState([]);

  const addColor = newColor => {
    setColors(colors => {
      colors.push(newColor);
      return colors;
    });
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

export default StillBrokenColorfulCircles;
