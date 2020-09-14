import React from "react";
import "./ColorButtons.css";

function ColorButtons(props) {
  return (
    <div>
      {props.options.map(color => (
        <button
          className="ColorButtons-button"
          style={{ backgroundColor: color }}
          onClick={() => props.addColor(color)}
          key={color}
        >
          {color}
        </button>
      ))}
    </div>
  );
}

ColorButtons.defaultProps = {
  options: ["red", "green", "blue", "honeydew"]
};

export default ColorButtons;
