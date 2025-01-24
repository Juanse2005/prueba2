export interface Conjuntos {
  respuesta?: ConjuntoResponse[];
  status?: number;
  mensaje?: string;
}
export interface ConjuntoResponse {
  status?: number;
  mensaje?: string;
  id_conjunto?: number;
  id_tipo_documento?: number | null;
  nro_documento: string;
  nombre: string;
  correo: string;
  telefono: number | null;
  direccion: string;
  cant_apartamentos: number | null;
  estado: string;
  ultima_modificacion: string;
  usuario_modificacion: string;
}