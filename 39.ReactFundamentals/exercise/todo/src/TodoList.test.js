import React from "react";
import { render } from "@testing-library/react";
import TodoList from "./TodoList";

it("should render", () => {
  render(<TodoList />);
});

it("should match snapshot", () => {
  const { asFragment } = render(<TodoList />);
  expect(asFragment).toMatchSnapshot();
});
