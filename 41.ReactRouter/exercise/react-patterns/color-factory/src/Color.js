import React from "react";
import { Link, useHistory, useParams } from "react-router-dom";

function Color({ colors }) {
  const { name } = useParams();
  const history = useHistory();
  if (!colors[name]) history.push("/colors");
  const color = colors[name];
  return (
    <>
      <div style={{ backgroundColor: color }}>
        <h2>Color</h2>
      </div>
      <Link to="/">Go back</Link>
    </>
  );
}

export default Color;
