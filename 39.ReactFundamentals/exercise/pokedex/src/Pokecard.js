import React from "react";
import "./Pokecard.css";

const Pokecard = ({ id, name, type, base_experience }) => {
  const src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  return (
    <div className="Pokecard">
      <h3 className="Pokecard-title">{name}</h3>
      <img src={src} alt="" />
      <p>Type: {type}</p>
      <p>EXP: {base_experience}</p>
    </div>
  );
};

export default Pokecard;
