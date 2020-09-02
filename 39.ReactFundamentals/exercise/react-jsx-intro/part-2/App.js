const App = () => (
  <div>
    <Tweet
      username="test"
      name="test_user"
      date="jan 2020"
      message="This is test tweet"
    />
  </div>
);
ReactDOM.render(<App />, document.getElementById("root"));
