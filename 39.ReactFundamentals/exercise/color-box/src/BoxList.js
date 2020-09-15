import React, { useState } from "react";
import Box from "./Box";
import NewBoxForm from "./NewBoxForm";

const BoxList = () => {
  const [boxes, setBoxes] = useState([]);

  const addBox = (boxObj) => {
    setBoxes((boxes) => [...boxes, boxObj]);
  };

  const removeBox = (id) => {
    setBoxes((boxes) => boxes.filter((box) => box.id !== id));
  };

  return (
    <div>
      <NewBoxForm addBox={addBox} />
      {boxes.map(({ id, color, width, height }) => (
        <Box
          key={id}
          bgColor={color}
          width={width}
          height={height}
          id={id}
          removeBox={removeBox}
        />
      ))}
    </div>
  );
};

export default BoxList;
