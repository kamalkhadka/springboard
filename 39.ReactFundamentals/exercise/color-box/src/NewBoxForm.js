import React, { useState } from "react";
import { v4 as uuid } from "uuid";

const NewBoxForm = ({ addBox }) => {
  const INITIAL_STATE = { color: "", width: "", height: "" };
  const [formData, setFormData] = useState(INITIAL_STATE);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addBox({ ...formData, id: uuid() });
    setFormData(INITIAL_STATE);
  };

  return (
    <div>
      <h1>Create a box</h1>
      <p>Please specify the background color, width, and height of a box</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="color">Background Color:</label>
        <input
          id="color"
          type="text"
          placeholder="color"
          name="color"
          value={formData.color}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="width">Width (em):</label>
        <input
          id="width"
          name="width"
          type="number"
          value={formData.width}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="height">Height (em):</label>
        <input
          id="height"
          name="height"
          type="number"
          value={formData.height}
          onChange={handleChange}
        />
        <br />
        <button>Add Box</button>
      </form>
    </div>
  );
};

export default NewBoxForm;
