import {
  ADD_COMMENT,
  ADD_POST,
  EDIT_POST,
  REMOVE_COMMENT,
  REMOVE_POST,
} from "./ActionTypes";

export function addPost(post) {
  return {
    type: ADD_POST,
    post,
  };
}

export function removePost(id) {
  return {
    type: REMOVE_POST,
    id,
  };
}

export function editPost(post) {
  return {
    type: EDIT_POST,
    post,
  };
}

export function addComment(postID, comment) {
  return {
    type: ADD_COMMENT,
    postID,
    comment,
  };
}

export function removeComment(postID, commentID) {
  return {
    type: REMOVE_COMMENT,
    postID,
    commentID
  };
}
