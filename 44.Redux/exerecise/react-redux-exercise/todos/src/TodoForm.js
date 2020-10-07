import React, { useState } from "react";
import { v4 as uuid } from "uuid";

const DEFAULT_STATE = { todo: "" };

const TodoForm = ({ addTodo }) => {
  const [form, setForm] = useState(DEFAULT_STATE);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    addTodo({ ...form, id: uuid() });
    setForm(DEFAULT_STATE);
  };

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setForm((form) => ({ ...form, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={form.todo}
        onChange={handleChange}
        placeholder="add todo item"
        name="todo"
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default TodoForm;
