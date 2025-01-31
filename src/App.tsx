// src/App.tsx
import React from "react";
import "./App.css";
import UsuarioList from "./components/UsuarioList";
import { Container } from "react-bootstrap";

function App() {
  return (
    <Container className="mt-5">
      <h1>Lista de Usuários</h1>
      <UsuarioList />
    </Container>
  );
}

export default App;
