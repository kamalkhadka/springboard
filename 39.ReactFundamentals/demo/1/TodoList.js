const TodoList = (props) => {
  return (
    <div>
      <h4>Todo List</h4>
      <ul>
        {props.todos.map((t) => (
          <li>{t}</li>
        ))}
      </ul>
    </div>
  );
};
