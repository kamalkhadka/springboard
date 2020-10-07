import React from "react";
import "./Meme.css";

const Meme = ({ id, topText, url, bottomText, removeMeme }) => {
  const handleRemoveMeme = () => {
    removeMeme(id);
  };

  return (
    <div className="Meme-Container">
      <span className="Meme-TopText">{topText}</span>
      <img className="Meme-Image" src={url} alt="meme" />
      <span className="Meme-BottomText">{bottomText}</span>
      <br />
      <button onClick={handleRemoveMeme}>Remove</button>
    </div>
  );
};

export default Meme;
