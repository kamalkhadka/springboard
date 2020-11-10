import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { addPost } from "./Actions";

const NewPost = () => {
  const DEFAULT_STATE = { title: "", description: "", body: "" };
  const [form, setForm] = useState(DEFAULT_STATE);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setForm((form) => ({ ...form, [name]: value, id: uuidv4(), comments: [] }));
  };

  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch(addPost(form));
    history.push("/");
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">Title:</label>
        <input
          required
          className="form-control"
          type="text"
          name="title"
          id="title"
          value={form.title}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description:</label>
        <input
          required
          type="text"
          id="description"
          name="description"
          value={form.description}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label htmlFor="body">Body:</label>
        <textarea
          required
          className="form-control"
          id="body"
          name="body"
          value={form.body}
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Save
      </button>
      <Link to="/" className="btn btn-secondary ml-2">
        Cancel
      </Link>
    </form>
  );
};

export default NewPost;
