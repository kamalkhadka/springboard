import React from "react";
import { render, fireEvent, getByLabelText } from "@testing-library/react";
import ShoppingList from "./ShoppingList";

it("renders without Crashing", function () {
  render(<ShoppingList />);
});

it("matches snapshot", function () {
  const { asFragment } = render(<ShoppingList />);
  expect(asFragment).toMatchSnapshot();
});

it("should add new item", function(){
    const {queryByText, getByLabelText} = render(<ShoppingList />)
    const input = getByLabelText("Product");
    const btn = queryByText("Add Item");
    expect(queryByText('Product name: Chocolate Milk')).not.toBeInTheDocument();
    fireEvent.change(input, {target: {value: 'Chocolate Milk'}});
    fireEvent.click(btn);
    expect(queryByText('Product name: Chocolate Milk')).toBeInTheDocument();
})