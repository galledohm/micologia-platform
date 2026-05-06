import type { Seta, Pregunta } from '../types';

// ---------------------------------------------------------------------------
// DEMO DATA — replace or extend via Admin panel
// ---------------------------------------------------------------------------

export const SETAS_DEMO: Seta[] = [
  {
    id: 'seta_001',
    nombreCientifico: 'Amanita muscaria',
    nombreComun: 'Agárico',
    imagenUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Amanita_muscaria_3_vliegenzwammen_op_rij.jpg/800px-Amanita_muscaria_3_vliegenzwammen_op_rij.jpg',
    comestibilidad: 'toxica',
    nutricion: 'micorricica',
    tema: 'Amanitaceae',
    descripcion: 'Seta muy característica por su sombrero rojo con manchas blancas.',
  },
  {
    id: 'seta_002',
    nombreCientifico: 'Boletus edulis',
    nombreComun: 'Boleto comestible / Porcini',
    imagenUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Edible_Bolete.jpg/800px-Edible_Bolete.jpg',
    comestibilidad: 'comestible',
    nutricion: 'micorricica',
    tema: 'Boletaceae',
    descripcion: 'Uno de los hongos comestibles más apreciados en gastronomía.',
  },
  {
    id: 'seta_003',
    nombreCientifico: 'Cantharellus cibarius',
    nombreComun: 'Rebozuelo / Chantarela',
    imagenUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Cantharellus_cibarius_2013_G2.jpg/800px-Cantharellus_cibarius_2013_G2.jpg',
    comestibilidad: 'comestible',
    nutricion: 'micorricica',
    tema: 'Cantharellaceae',
    descripcion: 'Seta de color amarillo-anaranjado con pseudo-láminas ramificadas.',
  },
  {
    id: 'seta_004',
    nombreCientifico: 'Amanita phalloides',
    nombreComun: 'Oronja verde / Cicuta verde',
    imagenUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Amanita_phalloides_1.JPG/800px-Amanita_phalloides_1.JPG',
    comestibilidad: 'toxica',
    nutricion: 'micorricica',
    tema: 'Amanitaceae',
    descripcion: 'El hongo más venenoso del mundo. Responsable de la mayoría de las muertes por intoxicación fúngica.',
  },
  {
    id: 'seta_005',
    nombreCientifico: 'Pleurotus ostreatus',
    nombreComun: 'Seta de ostra',
    imagenUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Oyster_mushrooms_%28Pleurotus_ostreatus%29.jpg/800px-Oyster_mushrooms_%28Pleurotus_ostreatus%29.jpg',
    comestibilidad: 'comestible',
    nutricion: 'saprobia',
    tema: 'Pleurotaceae',
    descripcion: 'Crece en madera muerta o debilitada. Ampliamente cultivada para consumo.',
  },
  {
    id: 'seta_006',
    nombreCientifico: 'Lactarius deliciosus',
    nombreComun: 'Níscalo / Rovellón',
    imagenUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Lactarius_deliciosus_LC0306.jpg/800px-Lactarius_deliciosus_LC0306.jpg',
    comestibilidad: 'comestible',
    nutricion: 'micorricica',
    tema: 'Russulaceae',
    descripcion: 'Exuda látex de color anaranjado al corte. Muy apreciado en la gastronomía mediterránea.',
  },
  {
    id: 'seta_007',
    nombreCientifico: 'Armillaria mellea',
    nombreComun: 'Seta de miel',
    imagenUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Honey_fungus_%28Armillaria_mellea%29.jpg/800px-Honey_fungus_%28Armillaria_mellea%29.jpg',
    comestibilidad: 'doble-preparacion',
    nutricion: 'parasita-facultativa',
    tema: 'Physalacriaceae',
    descripcion: 'Puede parasitar árboles vivos y también crecer sobre madera muerta.',
  },
  {
    id: 'seta_008',
    nombreCientifico: 'Morchella esculenta',
    nombreComun: 'Colmenilla',
    imagenUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Morchella_esculenta_-_Morille_comestible.jpg/800px-Morchella_esculenta_-_Morille_comestible.jpg',
    comestibilidad: 'doble-preparacion',
    nutricion: 'saprosimbiota',
    tema: 'Morchellaceae',
    descripcion: 'Seta de primavera con aspecto de panal de abejas. Tóxica en crudo.',
  },
  {
    id: 'seta_009',
    nombreCientifico: 'Trametes versicolor',
    nombreComun: 'Cola de pavo',
    imagenUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Trametes_versicolor_-_Lindsey.jpg/800px-Trametes_versicolor_-_Lindsey.jpg',
    comestibilidad: 'sin-valor',
    nutricion: 'saprobia',
    tema: 'Polyporaceae',
    descripcion: 'Hongo políporo muy común sobre madera. Sin valor culinario pero con usos medicinales.',
  },
  {
    id: 'seta_010',
    nombreCientifico: 'Macrolepiota procera',
    nombreComun: 'Parasol / Galamperna',
    imagenUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Macrolepiota_procera_2010_G1.jpg/800px-Macrolepiota_procera_2010_G1.jpg',
    comestibilidad: 'comestible',
    nutricion: 'saprobia',
    tema: 'Agaricaceae',
    descripcion: 'Seta de gran tamaño con sombrero en forma de paraguas. Muy apreciada.',
  },
];

export const PREGUNTAS_DEMO: Pregunta[] = [
  {
    id: 'preg_001',
    texto: '¿Qué tipo de espora produce Amanita muscaria?',
    opciones: [
      { id: 'a', texto: 'Ascosporas' },
      { id: 'b', texto: 'Basidiosporas' },
      { id: 'c', texto: 'Conidios' },
      { id: 'd', texto: 'Zigosporas' },
    ],
    respuestaCorrecta: 'b',
    tema: 'Reproducción fúngica',
    fuente: 'demo',
  },
  {
    id: 'preg_002',
    texto: '¿Cuál de las siguientes toxinas es la principal responsable de la mortalidad por Amanita phalloides?',
    opciones: [
      { id: 'a', texto: 'Muscarina' },
      { id: 'b', texto: 'Ibotenico' },
      { id: 'c', texto: 'Amatoxinas (alfa-amanitina)' },
      { id: 'd', texto: 'Orellanina' },
    ],
    respuestaCorrecta: 'c',
    tema: 'Toxicología fúngica',
    fuente: 'demo',
  },
  {
    id: 'preg_003',
    texto: '¿Cómo se denomina la relación simbiótica entre el hongo y la raíz de una planta?',
    opciones: [
      { id: 'a', texto: 'Liquen' },
      { id: 'b', texto: 'Micorriza' },
      { id: 'c', texto: 'Endofitismo' },
      { id: 'd', texto: 'Parasitismo' },
    ],
    respuestaCorrecta: 'b',
    tema: 'Ecología fúngica',
    fuente: 'demo',
  },
  {
    id: 'preg_004',
    texto: '¿A qué división pertenecen las setas con hifas septadas y basidios?',
    opciones: [
      { id: 'a', texto: 'Ascomycota' },
      { id: 'b', texto: 'Zygomycota' },
      { id: 'c', texto: 'Basidiomycota' },
      { id: 'd', texto: 'Chytridiomycota' },
    ],
    respuestaCorrecta: 'c',
    tema: 'Taxonomía fúngica',
    fuente: 'demo',
  },
  {
    id: 'preg_005',
    texto: '¿Cuál es la función principal del micelio en un hongo?',
    opciones: [
      { id: 'a', texto: 'Reproducción sexual' },
      { id: 'b', texto: 'Fotosíntesis' },
      { id: 'c', texto: 'Absorción de nutrientes y crecimiento vegetativo' },
      { id: 'd', texto: 'Producción de esporas' },
    ],
    respuestaCorrecta: 'c',
    tema: 'Morfología fúngica',
    fuente: 'demo',
  },
  {
    id: 'preg_006',
    texto: '¿Qué estructura caracteriza al género Boletus frente a otros Agáricos?',
    opciones: [
      { id: 'a', texto: 'Láminas bajo el sombrero' },
      { id: 'b', texto: 'Tubos y poros bajo el sombrero' },
      { id: 'c', texto: 'Aguijones o espinas' },
      { id: 'd', texto: 'Pliegues o falsas láminas' },
    ],
    respuestaCorrecta: 'b',
    tema: 'Morfología fúngica',
    fuente: 'demo',
  },
  {
    id: 'preg_007',
    texto: '¿Qué compuesto da el color naranja al látex de Lactarius deliciosus?',
    opciones: [
      { id: 'a', texto: 'Clorofila' },
      { id: 'b', texto: 'Carotenoides (azuleno-derivados)' },
      { id: 'c', texto: 'Antocianinas' },
      { id: 'd', texto: 'Melaninas' },
    ],
    respuestaCorrecta: 'b',
    tema: 'Bioquímica fúngica',
    fuente: 'demo',
  },
  {
    id: 'preg_008',
    texto: '¿Cuál es el principal componente de la pared celular de los hongos?',
    opciones: [
      { id: 'a', texto: 'Celulosa' },
      { id: 'b', texto: 'Pectina' },
      { id: 'c', texto: 'Quitina' },
      { id: 'd', texto: 'Peptidoglicano' },
    ],
    respuestaCorrecta: 'c',
    tema: 'Bioquímica fúngica',
    fuente: 'demo',
  },
  {
    id: 'preg_009',
    texto: '¿Cuál de las siguientes especies es un ascomiceto?',
    opciones: [
      { id: 'a', texto: 'Amanita muscaria' },
      { id: 'b', texto: 'Boletus edulis' },
      { id: 'c', texto: 'Morchella esculenta' },
      { id: 'd', texto: 'Cantharellus cibarius' },
    ],
    respuestaCorrecta: 'c',
    tema: 'Taxonomía fúngica',
    fuente: 'demo',
  },
  {
    id: 'preg_010',
    texto: '¿Qué tipo de nutrición tiene Trametes versicolor?',
    opciones: [
      { id: 'a', texto: 'Micorrícica' },
      { id: 'b', texto: 'Parásita' },
      { id: 'c', texto: 'Saprobia' },
      { id: 'd', texto: 'Fotosintética' },
    ],
    respuestaCorrecta: 'c',
    tema: 'Ecología fúngica',
    fuente: 'demo',
  },
  {
    id: 'preg_011',
    texto: '¿Qué es el carpóforo?',
    opciones: [
      { id: 'a', texto: 'El conjunto de hifas que forman el micelio' },
      { id: 'b', texto: 'El cuerpo fructífero visible del hongo' },
      { id: 'c', texto: 'El órgano de reproducción asexual' },
      { id: 'd', texto: 'La parte subterránea del hongo' },
    ],
    respuestaCorrecta: 'b',
    tema: 'Morfología fúngica',
    fuente: 'demo',
  },
  {
    id: 'preg_012',
    texto: '¿En qué época del año es más habitual encontrar Morchella esculenta?',
    opciones: [
      { id: 'a', texto: 'Verano' },
      { id: 'b', texto: 'Otoño' },
      { id: 'c', texto: 'Invierno' },
      { id: 'd', texto: 'Primavera' },
    ],
    respuestaCorrecta: 'd',
    tema: 'Ecología fúngica',
    fuente: 'demo',
  },
  {
    id: 'preg_013',
    texto: '¿Cuál de los siguientes géneros contiene la volva (saco basal)?',
    opciones: [
      { id: 'a', texto: 'Boletus' },
      { id: 'b', texto: 'Amanita' },
      { id: 'c', texto: 'Cantharellus' },
      { id: 'd', texto: 'Pleurotus' },
    ],
    respuestaCorrecta: 'b',
    tema: 'Morfología fúngica',
    fuente: 'demo',
  },
  {
    id: 'preg_014',
    texto: '¿Qué diferencia a los Basidiomycota de los Ascomycota en cuanto a reproducción sexual?',
    opciones: [
      { id: 'a', texto: 'Los Basidiomycota producen esporas en ascos' },
      { id: 'b', texto: 'Los Basidiomycota producen esporas en basidios externos' },
      { id: 'c', texto: 'Los Ascomycota no tienen reproducción sexual' },
      { id: 'd', texto: 'No existe diferencia estructural' },
    ],
    respuestaCorrecta: 'b',
    tema: 'Reproducción fúngica',
    fuente: 'demo',
  },
  {
    id: 'preg_015',
    texto: '¿Cuál es la intoxicación más grave que puede producir Armillaria mellea si se consume cruda?',
    opciones: [
      { id: 'a', texto: 'Síndrome muscarínico' },
      { id: 'b', texto: 'Síndrome gastrointestinal' },
      { id: 'c', texto: 'Síndrome faloidiano' },
      { id: 'd', texto: 'Síndrome alucinógeno' },
    ],
    respuestaCorrecta: 'b',
    tema: 'Toxicología fúngica',
    fuente: 'demo',
  },
  {
    id: 'preg_016',
    texto: '¿Qué término describe a hongos que viven sobre materia orgánica muerta en descomposición?',
    opciones: [
      { id: 'a', texto: 'Simbiontes' },
      { id: 'b', texto: 'Parásitos' },
      { id: 'c', texto: 'Saprobios' },
      { id: 'd', texto: 'Mutualistas' },
    ],
    respuestaCorrecta: 'c',
    tema: 'Ecología fúngica',
    fuente: 'demo',
  },
  {
    id: 'preg_017',
    texto: '¿Cuál es la especie de Pleurotus más cultivada industrialmente?',
    opciones: [
      { id: 'a', texto: 'Pleurotus eryngii' },
      { id: 'b', texto: 'Pleurotus ostreatus' },
      { id: 'c', texto: 'Pleurotus cornucopiae' },
      { id: 'd', texto: 'Pleurotus djamor' },
    ],
    respuestaCorrecta: 'b',
    tema: 'Micología aplicada',
    fuente: 'demo',
  },
  {
    id: 'preg_018',
    texto: '¿Qué se entiende por "doble preparación" en micología culinaria?',
    opciones: [
      { id: 'a', texto: 'Cocinar dos veces a alta temperatura para reducir toxinas' },
      { id: 'b', texto: 'Hervir, desechar el agua y luego cocinar de nuevo' },
      { id: 'c', texto: 'Marinar y luego saltear' },
      { id: 'd', texto: 'Secar y luego rehidratar' },
    ],
    respuestaCorrecta: 'b',
    tema: 'Gastronomía y seguridad',
    fuente: 'demo',
  },
  {
    id: 'preg_019',
    texto: '¿Cuál es la estructura reproductora de los Ascomycota?',
    opciones: [
      { id: 'a', texto: 'Basidio' },
      { id: 'b', texto: 'Asca' },
      { id: 'c', texto: 'Cleistotecio' },
      { id: 'd', texto: 'Peritecio' },
    ],
    respuestaCorrecta: 'b',
    tema: 'Reproducción fúngica',
    fuente: 'demo',
  },
  {
    id: 'preg_020',
    texto: '¿Qué tipo de micorriza forman la mayoría de los árboles forestales con hongos como Boletus?',
    opciones: [
      { id: 'a', texto: 'Endomicorriza arbuscular' },
      { id: 'b', texto: 'Ectomicorriza' },
      { id: 'c', texto: 'Ericoides' },
      { id: 'd', texto: 'Orquideoides' },
    ],
    respuestaCorrecta: 'b',
    tema: 'Ecología fúngica',
    fuente: 'demo',
  },
];

export function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function getRandomSetas(setas: Seta[], count: number): Seta[] {
  return shuffleArray(setas).slice(0, Math.min(count, setas.length));
}

export function getRandomPreguntas(preguntas: Pregunta[], count: number): Pregunta[] {
  return shuffleArray(preguntas).slice(0, Math.min(count, preguntas.length));
}
