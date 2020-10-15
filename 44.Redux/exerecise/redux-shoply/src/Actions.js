import { ADD_ITEM, REMOVE_ITEM } from "./ActionTypes";

export function addItem(id) {
  return {
    type: ADD_ITEM,
    id,
  };
}

export function removeItem(id) {
  return {
    type: REMOVE_ITEM,
    id,
  };
}
