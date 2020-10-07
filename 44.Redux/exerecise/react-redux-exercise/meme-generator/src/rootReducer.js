const INITIAL_STATE = { memes: [] };

const rootReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "ADD_MEME":
      return { ...state, memes: [...state.memes, { ...action.payload }] };
    case "REMOVE_MEME":
      return {
        ...state,
        memes: state.memes.filter((meme) => meme.id !== action.id),
      };
    default:
      return state;
  }
};

export default rootReducer;
