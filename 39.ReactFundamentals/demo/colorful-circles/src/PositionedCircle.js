import React from "react";
import "./Circle.css";

function PositionedCircle(props) {
  const handleChange = () => {
    props.changePosition(props.idx);
  }

  return (
    <div
      className="Circle"
      style={{
        backgroundColor: props.colorObj.color,
        position: "absolute",
        top: `${props.colorObj.y}vh`,
        left: `${props.colorObj.x}vw`
      }}
      onClick={handleChange}
    >
      {props.idx + 1}
    </div>
  );
}

export default PositionedCircle;
