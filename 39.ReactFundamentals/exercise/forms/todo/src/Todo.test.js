import React from "react";
import { render } from "@testing-library/react";
import Todo from "./Todo";

it("should render", () => {
  render(<Todo />);
});

it("should match snapshot", () => {
  const { asFragment } = render(<Todo />);
  expect(asFragment).toMatchSnapshot();
});
