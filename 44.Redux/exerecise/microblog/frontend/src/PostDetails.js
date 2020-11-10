import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, useParams } from "react-router-dom";
import { removePost } from "./Actions";
import Comments from "./Comments";

const PostDetails = () => {
  const { id } = useParams();
  const posts = useSelector((state) => state.posts);

  const dispatch = useDispatch();
  // TODO:
  const post = posts[id];

  if (!post) {
    return <Redirect to="/" />;
  }

  const handleDelete = () => {
    dispatch(removePost(id));
    return <Redirect to="/" />;
  };

  return (
    <div>
      <div className="row">
        <div className="col-8">
          <h1>{post.title}</h1>
        </div>
        <div className="col-2">
          <Link to={`/edit/${id}`} className="btn btn-primary mr-2">
            Edit
          </Link>
          <button className="btn btn-danger" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
      <p className="font-italic">{post.description}</p>
      <p className="lead">{post.body}</p>
      <hr />
      <Comments />
    </div>
  );
};

export default PostDetails;
