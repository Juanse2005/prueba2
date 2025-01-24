export interface Documentos {
    respuesta?: DocumentosResponse[];
    status?: number;
    mensaje?: string;
  }
  export interface DocumentosResponse {
    id_tipo_documento?: number | null;
    tipo_documento: string;
    descripcion: string;
    estado: string;
  }