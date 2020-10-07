const INITIAL_STATE = { count: 0 };

const countReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "INCREMENT":
      return { ...state, count: state.count + 1 };
    case "DECREMENT":
      return { ...state, count: state.count - 1 };
    case "RESET":
      return { ...state, count: 0 };

    default:
      return state;
  }
};

const store = Redux.createStore(countReducer);
