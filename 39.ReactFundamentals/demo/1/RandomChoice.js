const RandomChoice = (props) => {
  const idx = Math.floor(Math.random() * props.choices.length);
  const choice = props.choices[idx];
  return (
    <div>
      <h4>Random choice is: {choice}</h4>
    </div>
  );
};
