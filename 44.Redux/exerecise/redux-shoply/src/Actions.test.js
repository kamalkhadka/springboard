import { addItem, removeItem } from "./Actions";
import { ADD_ITEM, REMOVE_ITEM } from "./ActionTypes";

describe("actions", () => {
  it("should create an action to add to cart", () => {
    const id = "1234";
    const addAction = {
      type: ADD_ITEM,
      id,
    };

    expect(addItem(id)).toEqual(addAction);
  });

  it("should create an action to add to cart", () => {
    const id = "1234";
    const removeAction = {
      type: REMOVE_ITEM,
      id,
    };

    expect(removeItem(id)).toEqual(removeAction);
  });
});
