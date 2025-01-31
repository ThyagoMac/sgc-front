// src/components/UsuarioList.tsx
import React, { useEffect, useState } from "react";
import { Table, Spinner, Alert } from "react-bootstrap";
import { UsuarioService } from "../services/UsuarioServices";
import { Usuario } from "../types/Usuario";

const UsuarioList: React.FC = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    UsuarioService.getUsuarios()
      .then((response) => {
        setUsuarios(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Erro ao buscar usuários");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Spinner role="status" animation="border" />;
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {usuarios.map((usuario) => (
          <tr key={usuario.id}>
            <td>{usuario.id}</td>
            <td>{usuario.name}</td>
            <td>{usuario.email}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default UsuarioList;
