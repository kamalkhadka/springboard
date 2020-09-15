import React from "react";

const Todo = ({ todo, id, removeTodo }) => {
  const remove = () => {
    removeTodo(id);
  };
  return (
    <React.Fragment>
      <div>
        <div style={{ display: "inline-block" }}>{todo}</div>
        <button style={{ margin: `0 0 0 8px` }} onClick={remove}>
          X
        </button>
      </div>
    </React.Fragment>
  );
};

export default Todo;
