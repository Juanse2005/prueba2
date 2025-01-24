export interface Asambleas {
  respuesta: AsambleaResponse[]; // Cambia "respuesta" a un array de Response
  status: number;
  mensaje: string;
}

export interface AsambleaResponse {
  status?: number;
  mensaje?: string;
  id_asamblea: number;    
  id_conjunto: number;     
  titulo: string;         
  descripcion: string;     
  estado: string;           
  fecha_inicio: Date;     
  fecha_fin: Date;       
  latitud: null;
  longitud: null;
  
  errorMessageGeolocation?: string;  
  geoErrorCode?: string;  
}