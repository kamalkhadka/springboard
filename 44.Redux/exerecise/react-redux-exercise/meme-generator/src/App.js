import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Meme from "./Meme";
import NewMemeForm from "./NewMemeForm";

function App() {
  const memes = useSelector((state) => state.memes);
  const dispatch = useDispatch();
  const addMeme = (newMeme) => {
    dispatch({ type: "ADD_MEME", payload: newMeme });
  };

  const removeMeme = (id) => {
    dispatch({ type: "REMOVE_MEME", id });
  };

  const memeList = memes.map((meme) => (
    <Meme
      key={meme.id}
      topText={meme.topText}
      url={meme.url}
      bottomText={meme.bottomText}
      id={meme.id}
      removeMeme={removeMeme}
    />
  ));

  return (
    <div className="App">
      <h1>Meme Generator</h1>
      <NewMemeForm addMeme={addMeme} />
      <br />
      {memeList}
    </div>
  );
}

export default App;
