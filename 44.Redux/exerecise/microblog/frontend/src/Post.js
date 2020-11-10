import React from "react";
import { Link } from "react-router-dom";

const Post = ({ id, title, description }) => {
  return (
    <div className="card mb-2">
      <div className="card-body">
        <Link className="card-title" to={`/post/${id}`}>
          {title}
        </Link>
        <p className="card-text">{description}</p>
      </div>
    </div>
  );
};

export default Post;
