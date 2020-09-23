import React from "react";
import { useParams } from "react-router-dom";

const DogDetails = ({ dogs }) => {
  const { name } = useParams();
  console.log(name);
  const dog = dogs.find((dog) => dog.name === name);

  return (
    <>
      <h1>Name: {dog.name}</h1>
      <h2>Age: {dog.age}</h2>
      <h3>Facts</h3>
      <ul>
        {dog.facts.map((fact, index) => (
          <li key={index}>{fact}</li>
        ))}
      </ul>
    </>
  );
};

export default DogDetails;
