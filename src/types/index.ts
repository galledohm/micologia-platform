export type Comestibilidad =
  | 'comestible'
  | 'toxica'
  | 'sin-valor'
  | 'doble-preparacion';

export type Nutricion =
  | 'saprobia'
  | 'micorricica'
  | 'parasita-facultativa'
  | 'saprosimbiota';

export interface Seta {
  id: string;
  nombreCientifico: string;
  nombreComun: string;
  imagenUrl: string;
  comestibilidad: Comestibilidad;
  nutricion: Nutricion;
  tema: string;
  descripcion?: string;
}

export interface OpcionPregunta {
  id: string;
  texto: string;
}

export interface Pregunta {
  id: string;
  texto: string;
  opciones: OpcionPregunta[];
  respuestaCorrecta: string;
  tema: string;
  fuente?: string;
}

export interface RespuestaSeta {
  setaId: string;
  nombreCientifico: string;
  comestibilidad: Comestibilidad | '';
  nutricion: Nutricion | '';
}

export interface RespuestaPregunta {
  preguntaId: string;
  respuestaSeleccionada: string;
}

export interface ResultadoTest {
  tipo: 'imagenes' | 'preguntas';
  respuestas: RespuestaSeta[] | RespuestaPregunta[];
  fechaFin: Date;
}

export const COMESTIBILIDAD_LABELS: Record<Comestibilidad, string> = {
  comestible: 'Comestible',
  toxica: 'Tóxica',
  'sin-valor': 'Sin valor culinario',
  'doble-preparacion': 'Comestible con doble preparación',
};

export const NUTRICION_LABELS: Record<Nutricion, string> = {
  saprobia: 'Saprobia',
  micorricica: 'Micorrícica',
  'parasita-facultativa': 'Parásita facultativa',
  saprosimbiota: 'Saprosimbiota',
};

export const COMESTIBILIDAD_BADGE: Record<Comestibilidad, string> = {
  comestible: 'badge-comestible',
  toxica: 'badge-toxica',
  'sin-valor': 'badge-sin-valor',
  'doble-preparacion': 'badge-doble-prep',
};

export const NUTRICION_BADGE: Record<Nutricion, string> = {
  saprobia: 'badge-saprobia',
  micorricica: 'badge-micorricica',
  'parasita-facultativa': 'badge-parasita',
  saprosimbiota: 'badge-saprosimbiota',
};
