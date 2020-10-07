import React, { useState } from "react";
import { v4 as uuid } from "uuid";

const DEFAULT_STATE = {
  topText: "",
  url: "",
  bottomText: "",
};

const NewMemeForm = ({ addMeme }) => {
  const [formData, setFormData] = useState(DEFAULT_STATE);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    addMeme({ ...formData, id: uuid() });
    setFormData(DEFAULT_STATE);
  };

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((form) => ({ ...form, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="top text"
        value={formData.topText}
        onChange={handleChange}
        name="topText"
      />
      <br />
      <input
        type="url"
        placeholder="url to image"
        value={formData.url}
        name="url"
        onChange={handleChange}
      />
      <br />
      <input
        type="text"
        placeholder="bottom text"
        value={formData.bottomText}
        onChange={handleChange}
        name="bottomText"
      />
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default NewMemeForm;
