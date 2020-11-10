import React from "react";
import { useDispatch } from "react-redux";
import { removeComment } from "./Actions";

const Comment = ({ comment, id, postID }) => {
  const dispatch = useDispatch();

  const handleOnClick = () => {
    dispatch(removeComment(postID, id));
  };

  return (
    <div className="row">
      <div className="col-1">
        <button title="Remove" onClick={handleOnClick}>
          X
        </button>
      </div>
      <div className="col-11">
        <p>{comment}</p>
      </div>
    </div>
  );
};

export default Comment;
