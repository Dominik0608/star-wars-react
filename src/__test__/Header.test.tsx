import { render, screen } from "@testing-library/react";
import Header from "../components/Header";

test("renders the header", () => {
  render(<Header />);

  const h1 = screen.getByRole("heading", { level: 1 });

  expect(h1).toBeInTheDocument();
});
