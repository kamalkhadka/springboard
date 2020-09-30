import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function NewColor({ addColor }) {
  const [form, setForm] = useState({ name: "white", color: "#ffffff" });
  const history = useHistory();

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    addColor({ [form.name]: form.color });
    history.push("/colors");
  };
  return (
    <div>
      <h2>Add new color</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="color">Select a color</label>
        <br />
        <input
          type="color"
          name="color"
          id="color"
          value={form.color}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="name">Color name</label>
        <br />
        <input
          type="text"
          id="name"
          type="name"
          onChange={handleChange}
          placeholder="give color a name"
        />
        <br />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default NewColor;
