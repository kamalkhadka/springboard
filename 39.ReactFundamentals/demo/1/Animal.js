const Animal = (props) => {
  return (
    <ul>
      <li>Emoji: {props.emoji}</li>
      <li>Name: {props.name}</li>
      <li>Species: {props.species}</li>
    </ul>
  );
};
