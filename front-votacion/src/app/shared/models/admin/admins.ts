export interface Admins {
  id_admin: any;
  msg: string;
  respuesta?: AdminResponse[];
  status?: number;
  mensaje?: string;
}

export interface AdminResponse {
  status?: number;
  mensaje?: string;
  id_admin?: number;
  id_tipo_documento: number | null;
  nro_documento: string;
  nombre: string;
  correo: string;
  pass: string;
  password: string;
  telefono: string;
  nombre_conjunto: string ;
  conjuntos: string;
  tipo_rol: number | null;

  id_conjunto?: number | null;
  id_rol?: number | null;

  estado: string; // activo o inactivo
  ultima_modificacion: string; // date
  usuario_modificacion: string; // string
}