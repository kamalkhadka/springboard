import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { addComment } from "./Actions";

const AddComment = ({ pID }) => {
  const [form, setForm] = useState({ comment: "" });

  const dispatch = useDispatch();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const comment = { ...form, id: uuidv4() };
    dispatch(addComment(pID, comment));
    setForm({ comment: "" });
  };

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setForm((form) => ({ ...form, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="form-control"
        type="text"
        placeholder="New Comment"
        value={form.comment}
        onChange={handleChange}
        name="comment"
        required
      />
      <button className="btn btn-primary mt-2" type="submit">
        Save
      </button>
    </form>
  );
};

export default AddComment;
