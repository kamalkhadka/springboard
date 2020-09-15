import React, { useState } from "react";
import { v4 as uuid } from "uuid";

const NewTodoForm = ({ addTodo }) => {
  const INTIAL_STATE = { todo: "" };
  const [formData, setFormData] = useState(INTIAL_STATE);

  const handleOnChange = (evt) => {
    const { name, value } = evt.target;
    setFormData({
      [name]: value,
    });
  };

  const handleOnSubmit = (evt) => {
    evt.preventDefault();
    addTodo({ ...formData, id: uuid() });
    setFormData(INTIAL_STATE);
  };
  return (
    <form onSubmit={handleOnSubmit}>
      <label htmlFor="todo">Add Todo</label>
      <input
        type="text"
        id="todo"
        name="todo"
        value={formData.todo}
        onChange={handleOnChange}
        placeholder="add a todo item"
      />
      <button>Add</button>
    </form>
  );
};

export default NewTodoForm;
