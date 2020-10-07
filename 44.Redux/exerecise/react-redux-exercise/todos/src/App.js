import React from "react";
import "./App.css";
import TodoForm from "./TodoForm";
import { useDispatch, useSelector } from "react-redux";
import Todo from "./Todo";

function App() {
  const todos = useSelector((state) => state.todos);

  const dispatch = useDispatch();

  const addTodo = (newTodo) => {
    dispatch({ type: "ADD_TODO", todo: newTodo });
  };

  const removeTodo = (id) => {
    dispatch({ type: "REMOVE_TODO", id });
  };

  const todosList = todos.map((todo) => (
    <Todo key={todo.id} id={todo.id} todo={todo.todo} removeTodo={removeTodo} />
  ));

  return (
    <div className="App">
      <h1>Add Todo</h1>
      <TodoForm addTodo={addTodo} />
      <br />
      <ul>{todosList}</ul>
    </div>
  );
}

export default App;
