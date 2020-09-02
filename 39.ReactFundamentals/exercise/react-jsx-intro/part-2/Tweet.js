const Tweet = ({ username, name, date, message }) => {
  return (
    <p>
      <b>{name}</b> @{username} <br /> {message} at {date}{" "}
    </p>
  );
};
