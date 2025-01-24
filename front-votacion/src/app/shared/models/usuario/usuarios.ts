export interface Usuarios {
  respuesta?: UsuariosResponse[];
  status?: number;
  mensaje?: string;
}

export interface UsuariosResponse {
  id_usuario: number;
  nombre: string;
  apartamento: string;
  email: string;
  pass: string;
  password: string;
  estado: string;
  id_rol: number;
  tipo_rol: string;
  id_conjunto: number;
  nombre_conjunto: string;
}