import React from "react";

const Todo = ({ id, todo, removeTodo }) => {
  const handleClick = () => {
    removeTodo(id);
  };

  return (
    <li>
      {todo}
      <button onClick={handleClick}>Remove</button>
    </li>
  );
};

export default Todo;
