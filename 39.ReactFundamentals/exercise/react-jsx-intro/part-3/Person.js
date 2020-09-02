const Person = ({ name, age, hobbies }) => {
  const message = age > 18 ? "please go vote" : "you must be 18";
  const displayName = name.length > 8 ? name.substring(0, 5) : name;
  return (
    <div>
      <p>
        Learn some information abou this person. <br />
        {message} <br />
        Name: {displayName} <br />
      </p>
      <h3>Hobbies</h3>
      <ul>
        {hobbies.map((h) => (
          <li>{h}</li>
        ))}
      </ul>
    </div>
  );
};
