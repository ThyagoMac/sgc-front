import { api } from "../services/api/axios";
import { AxiosResponse } from "axios";
import { Usuario } from "../types/Usuario";

export const UsuarioService = {
  getUsuarios: (): Promise<AxiosResponse<Usuario[]>> => {
    return api.get<Usuario[]>("/users");
  },
};
