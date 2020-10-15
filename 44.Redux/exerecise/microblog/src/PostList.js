import React from "react";
import { useSelector } from "react-redux";
import Post from "./Post";

const PostList = () => {
  const posts = useSelector((state) => state.posts);

  const postList = Object.keys(posts).map((id) => {
    const post = posts[id];
    return (
      <Post
        key={id}
        id={id}
        title={post.title}
        description={post.description}
      />
    );
  });

  return (
    <>
      <p>
        Welcome to <strong>Microblog</strong>, our innovative site for
        communicating on the information superhightway.
      </p>
      {postList}
    </>
  );
};

export default PostList;
