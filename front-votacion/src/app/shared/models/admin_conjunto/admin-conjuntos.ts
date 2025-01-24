export interface AdminConjuntos {
  respuesta?: AdminConjuntosResponse[];
  status?: number;
  mensaje?: string;
}

export interface AdminConjuntosResponse {
  id_admin: number;
  id_conjunto: number | null;
  nombre_conjunto: string;
}