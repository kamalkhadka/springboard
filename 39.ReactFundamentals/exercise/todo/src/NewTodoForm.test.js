import React from "react";
import { render } from "@testing-library/react";
import NewTodoForm from "./NewTodoForm";

it("should render", () => {
  render(<NewTodoForm />);
});

it("should match snapshot", () => {
  const { asFragment } = render(<NewTodoForm />);
  expect(asFragment).toMatchSnapshot();
});
