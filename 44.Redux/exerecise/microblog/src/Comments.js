import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import AddComment from "./AddComment";
import Comment from "./Comment";

const Comments = () => {
  const { id } = useParams();
  const posts = useSelector((state) => state.posts);

  const post = posts[id];

  const comments = Object.keys(post.comments).map((cID) => {
    const comment = posts[id].comments[cID];
    return <Comment key={cID} comment={comment} id={cID} postID={id}/>;
  });

  return (
    <>
      <h3>Comments</h3>
      {comments}
      <AddComment pID={id} />
    </>
  );
};

export default Comments;
