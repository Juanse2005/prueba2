export interface Preguntas {
  respuesta?: PreguntaResponse[];
  status?: number;
  mensaje?: string;
}


export interface PreguntaResponse {
  id_pregunta: number;
  descripcion: string;
  estado: string;
  id_asamblea: number;
  id_asamblea_p: number;
  id_asamblea_a: number;
  titulo_asamblea: string;
}
