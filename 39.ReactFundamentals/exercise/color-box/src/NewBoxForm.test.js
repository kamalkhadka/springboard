import React from "react";
import { render } from "@testing-library/react";
import NewBoxForm from "./NewBoxForm";

it("should render NewBoxForm", () => {
  render(<NewBoxForm />);
});

it("should match snapshot", () => {
  const { asFragment } = render(<NewBoxForm />);
  expect(asFragment).toMatchSnapshot();
});
