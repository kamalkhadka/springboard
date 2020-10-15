import reducer from "./rootReducer";
import * as types from "./ActionTypes";
import data from "./data.json";

describe("shoply reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      products: data.products,
      cart: {},
    });
  });

});
