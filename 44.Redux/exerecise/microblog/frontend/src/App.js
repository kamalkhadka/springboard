import React from "react";
import "./App.css";
import Navigation from "./Navigation";
import Routes from "./Routes";

function App() {
  return (
    <>
      <Navigation />
      <div className="container">
        <Routes />
      </div>
    </>
  );
}

export default App;
