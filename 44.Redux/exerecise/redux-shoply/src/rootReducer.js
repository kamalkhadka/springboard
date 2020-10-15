import { ADD_ITEM, REMOVE_ITEM } from "./ActionTypes";

import data from "./data.json";

const INITIAL_STATE = { products: data.products, cart: {} };

function rootReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_ITEM:
      const quantity = (state.cart[action.id] || 0) + 1;
      return {
        ...state,
        cart: {
          ...state.cart,
          [action.id]: quantity,
        },
      };
    case REMOVE_ITEM:
      const cart = { ...state.cart };

      if (!cart[action.id]) return state;

      if (cart[action.id] === 0) {
        delete cart[action.id];
      } else {
        cart[action.id]--;
      }

      return {
        ...state,
        cart: cart,
      };
    default:
      return state;
  }
}

export default rootReducer;
