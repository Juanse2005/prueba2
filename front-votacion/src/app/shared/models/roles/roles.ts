export interface Roles {
  respuesta?: RolesResponse[];
  status?: number;
  mensaje?: string;
}

export interface RolesResponse {
  id_rol: number;
  tipo_rol: string;
  estado: string;
  descripcion_rol: string;
}