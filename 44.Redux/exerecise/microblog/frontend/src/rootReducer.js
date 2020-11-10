import {
  ADD_COMMENT,
  ADD_POST,
  EDIT_POST,
  REMOVE_COMMENT,
  REMOVE_POST,
} from "./ActionTypes";

const INITIAL_STATE = { posts: {} };
// posts : { id: {title, description, body, comments: { id: comment}}, ...}
function rootReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_POST:
    case EDIT_POST:
      const { id, title, description, body, comments } = action.post;
      return {
        ...state,
        posts: {
          ...state.posts,
          [id]: { title, description, body, comments: comments || [] },
        },
      };

    case REMOVE_POST:
      const postsCopy = { ...state.posts };
      delete postsCopy[action.id];

      return {
        ...state,
        posts: postsCopy,
      };

    case ADD_COMMENT:
      const { postID, comment } = action;
      const post = state.posts[postID];
      return {
        ...state,
        posts: {
          ...state.posts,
          [postID]: {
            ...post,
            comments: {
              ...post.comments,
              [comment.id]: comment.comment,
            },
          },
        },
      };
    case REMOVE_COMMENT:
      const postToRemoveFrom = { ...state.posts[action.postID] };
      delete postToRemoveFrom.comments[action.commentID];
      return {
        ...state,
        posts: { ...state.posts, [action.postID]: postToRemoveFrom },
      };

    default:
      return state;
  }
}

export default rootReducer;
