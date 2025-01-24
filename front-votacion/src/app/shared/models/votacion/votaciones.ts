export interface Votaciones {
  respuesta?: VotacionesResponse[];
  status?: number;
  mensaje?: string;
}


export interface VotacionesResponse {
  id_votacion: number;
  id_usuario: number;
  id_opcion: number;
  id_pregunta: number;
  opcion: string;
  descripcion: string;
  total_votos: number;

}