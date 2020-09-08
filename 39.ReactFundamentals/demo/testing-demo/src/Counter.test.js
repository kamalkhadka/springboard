import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Counter from "./Counter";


it("it renders without crashing", function() {
  render(<Counter />);
});