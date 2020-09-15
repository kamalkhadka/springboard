import React from "react";
import { fireEvent, render } from "@testing-library/react";
import BoxList from "./BoxList";

it("should render BoxList", () => {
  render(<BoxList />);
});

it("snapshot should match", () => {
  const { asFragment } = render(<BoxList />);
  expect(asFragment).toMatchSnapshot();
});

it("add a box", () => {
  const { queryByText, queryByLabelText } = render(<BoxList />);

  expect(queryByText("X")).not.toBeInTheDocument();

  const color = queryByLabelText("Background Color:");
  const width = queryByLabelText("Width (em):");
  const height = queryByLabelText("Height (em):");
  const btn = queryByText("Add Box");
  fireEvent.change(color, { target: { value: "red" } });
  fireEvent.change(width, {target: {value: "10"}})
  fireEvent.change(height, {target: {value: "10"}})
  fireEvent.click(btn);

  expect(queryByText("X")).toBeInTheDocument();
});

it("remove a box", () => {
  const { queryByText, queryByLabelText } = render(<BoxList />);

  expect(queryByText("X")).not.toBeInTheDocument();

  const color = queryByLabelText("Background Color:");
  const width = queryByLabelText("Width (em):");
  const height = queryByLabelText("Height (em):");
  const btn = queryByText("Add Box");
  fireEvent.change(color, { target: { value: "red" } });
  fireEvent.change(width, {target: {value: "10"}})
  fireEvent.change(height, {target: {value: "10"}})
  fireEvent.click(btn);

  expect(queryByText("X")).toBeInTheDocument();

  const removeBtn = queryByText("X");
  fireEvent.click(removeBtn);
  expect(queryByText("X")).not.toBeInTheDocument();
  
});
