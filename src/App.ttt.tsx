import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { UsuarioService } from "./services/UsuarioServices";

// Mock do UsuarioService
jest.mock("./services/UsuarioServices", () => ({
  UsuarioService: {
    getUsuarios: jest.fn().mockResolvedValue({ data: [] }),
  },
}));

test("renders learn react link", async () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
