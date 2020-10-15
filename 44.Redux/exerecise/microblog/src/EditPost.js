import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, useHistory, useParams } from "react-router-dom";
import { editPost } from "./Actions";

const EditPost = () => {
  const { id } = useParams();
  const posts = useSelector((state) => state.posts);

  const post = posts[id];

  const [form, setForm] = useState(post);

  const history = useHistory();
  const dispatch = useDispatch();
  if (!post) {
    return <Redirect to="/" />;
  }
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setForm((form) => ({ ...form, [name]: value }));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log(form);
    dispatch(editPost({ ...form, id }));

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

export default EditPost;
