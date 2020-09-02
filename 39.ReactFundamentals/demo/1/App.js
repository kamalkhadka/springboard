const App = () => {
  return (
    <div>
      <RandomNumRange />
      <RandomNumRange min={20} max={30} />
      <RandomChoice choices={["red", "green", "yellow"]} />
      <Animal name="Stevie Chicks" species="Silkie Chicken" emoji="🐔" />
      <Animal name="Patrick" species="Red Fox" emoji="🦊" />
      <Animal emoji="🦊" />
      <RandomNum />
      <RandomNum />
      <RandomNum />
      <Bouncer age={19} />
      <Bouncer age={11} />
      <Bouncer age={39} />
      <TodoList todos={["walk chickens", "feed chickens", "eat chickens"]} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
