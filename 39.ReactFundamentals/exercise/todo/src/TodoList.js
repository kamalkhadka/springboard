import React, { useState } from "react";
import NewTodoForm from "./NewTodoForm";
import Todo from "./Todo";

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos((todos) => [...todos, { ...todo }]);
  };

  const removeTodo = (id) => {
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
  };

  return (
    <React.Fragment>
      <NewTodoForm addTodo={addTodo} />
      <ul>
        {todos.map(({ id, todo }) => (
          <li key={id}>
            <Todo id={id} todo={todo} removeTodo={removeTodo} />
          </li>
        ))}
      </ul>
    </React.Fragment>
  );
};

export default TodoList;
