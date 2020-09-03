import React from "react";
import pokedexes from "./Pokedex";
import Pokecard from "./Pokecard";
import "./App.css";

const App = () => {
  return (
    <React.Fragment>
      <h1 className="App-title">Pokedex</h1>
      <div style={{maxWidth: "1020px", margin: "auto"}}>
        {pokedexes.map((p) => {
          return (
            <Pokecard
              key={p.name}
              id={p.id}
              name={p.name}
              type={p.type}
              base_experience={p.base_experience}
            />
          );
        })}
      </div>
    </React.Fragment>
  );
};

export default App;
