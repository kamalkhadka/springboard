import React from "react";
import { render } from "@testing-library/react";
import Box from "./Box";

it("should render Box component", () => {
  render(<Box />);
});

it("should match snapshot", () => {
    const {asFragment} = render(<Box />);
    expect(asFragment).toMatchSnapshot();
})
