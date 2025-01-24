export interface Opciones {
  length: number;
  respuesta?: OpcionResponse[];
  status?: number;
  mensaje?: string;
}


export interface OpcionResponse {
  id_opcion: number;
  id_pregunta: number;
  opcion: string;

}