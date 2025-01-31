// src/components/UsuarioList.test.tsx

import { render, screen, waitFor } from "@testing-library/react";
import UsuarioList from "./UsuarioList";
import { UsuarioService } from "../services/UsuarioServices";
import { Usuario } from "../types/Usuario";

// Mock completo do UsuarioService
jest.mock("../services/UsuarioServices", () => ({
  UsuarioService: {
    getUsuarios: jest.fn(),
  },
}));

const mockUsuarios: Usuario[] = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Doe", email: "jane@example.com" },
];

describe("UsuarioList", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should render a loading spinner initially", async () => {
    (UsuarioService.getUsuarios as jest.Mock).mockResolvedValueOnce({
      data: [],
    });

    render(<UsuarioList />);

    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  test("should render a table with users", async () => {
    (UsuarioService.getUsuarios as jest.Mock).mockResolvedValueOnce({
      data: mockUsuarios,
    });

    render(<UsuarioList />);

    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText("Jane Doe")).toBeInTheDocument();
    });
  });

  test("should render an error message on fetch failure", async () => {
    (UsuarioService.getUsuarios as jest.Mock).mockRejectedValueOnce(
      new Error("Erro ao buscar usuários")
    );

    render(<UsuarioList />);

    await waitFor(() => {
      expect(screen.getByText("Erro ao buscar usuários")).toBeInTheDocument();
    });
  });
});
