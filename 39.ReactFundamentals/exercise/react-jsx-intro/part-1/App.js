const App = () => {
    return (
      <div>
        <FirstComponent />
        <NamedComponent name="test" />
      </div>
    );
  };
  
  ReactDOM.render(<App />, document.getElementById("root"));
  