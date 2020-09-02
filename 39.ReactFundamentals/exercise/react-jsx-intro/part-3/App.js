const App = () => {
  return (
    <div>
      <Person name="test" age={18} hobbies={["testing", "software"]} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
