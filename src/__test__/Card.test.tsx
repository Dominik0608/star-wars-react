import { render, screen } from "@testing-library/react";
import Card from "../components/Card";

test("renders the card", () => {
  render(<Card name="John Doe" />);

  const text = screen.getByText(/John Doe/i);
  const image = screen.getByAltText(/John Doe/i);

  expect(text).toBeInTheDocument();
  expect(image).toBeInTheDocument();
});
