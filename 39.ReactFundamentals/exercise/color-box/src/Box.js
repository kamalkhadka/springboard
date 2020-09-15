import React from "react";

const Box = ({ bgColor, width, height, id, removeBox }) => {
  const remove = () => {
    removeBox(id);
  };
  return (
    <React.Fragment>
      <div
        style={{
          backgroundColor: bgColor,
          width: `${width}em`,
          height: `${height}em`,
        }}
      ></div>
      <button onClick={remove}>X</button>
    </React.Fragment>
  );
};

export default Box;
