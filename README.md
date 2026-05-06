# Plataforma Educativa de Micologia

Aplicacion web para formacion micologica con dos modos de evaluacion:

1. Test de preguntas tipo test (20 preguntas aleatorias).
2. Test de identificacion por imagenes de setas (15 imagenes aleatorias).

El proyecto esta orientado a uso docente y permite mantener los datos sin base de datos externa, usando archivos JSON versionados en GitHub y desplegados en Vercel.

## Funcionalidades principales

- Inicio con selector de modo de prueba.
- Test de preguntas con tema asociado en cada pregunta.
- Test de imagenes donde el alumnado responde:
  - nombre cientifico,
  - comestibilidad,
  - tipo de nutricion.
- Pantalla de resultados con correccion detallada.
- Panel de administracion para:
  - anadir o eliminar setas,
  - anadir o eliminar preguntas,
  - importar preguntas desde TXT,
  - exportar JSON actualizado.

## Tecnologias

- React 19 + TypeScript
- Vite
- React Router
- Tailwind CSS
- Lucide React

## Estructura de datos

Los contenidos se almacenan en:

- public/data/setas.json
- public/data/preguntas.json

Categorias de comestibilidad usadas por la app:

- comestible
- toxica
- sin-valor
- doble-preparacion

Categorias de nutricion usadas por la app:

- saprobia
- micorricica
- parasita-facultativa
- saprosimbiota

## Instalacion local

Requisitos:

- Node.js 20 o superior
- npm

Comandos:

```bash
npm install
npm run dev
```

La app quedara disponible en la URL local que indique Vite (normalmente http://localhost:5173).

## Scripts disponibles

- npm run dev: arranca el entorno de desarrollo.
- npm run build: genera la build de produccion.
- npm run preview: sirve la build localmente.
- npm run lint: ejecuta ESLint.

## Uso docente recomendado

1. Editar contenidos desde el panel admin.
2. Descargar setas.json y preguntas.json.
3. Sustituir los archivos en public/data del repositorio.
4. Hacer commit y push a GitHub.
5. Vercel despliega automaticamente la nueva version.

## Despliegue en Vercel

1. Importar el repositorio en Vercel.
2. Framework: Vite.
3. Build command: npm run build.
4. Output directory: dist.

La configuracion de rutas SPA ya esta contemplada mediante vercel.json.

## Importacion de preguntas desde TXT

El parser soporta formato sencillo, por ejemplo:

```text
TEMA: Taxonomia fungica

1. Pregunta...
a) Opcion A
*b) Opcion correcta
c) Opcion C
d) Opcion D
```

La opcion correcta se marca con asterisco al inicio.

## Licencia

Este proyecto se distribuye bajo licencia MIT. Consulta el archivo LICENSE.

## Agradecimientos

Con agradecimiento especial a la Asociacion Micologica "La Senderuela" y a Javier Marcos por su apoyo y colaboración en el contexto formativo del proyecto.
