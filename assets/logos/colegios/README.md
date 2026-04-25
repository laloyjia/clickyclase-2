# Logos de colegios / liceos

Esta carpeta almacena los logos institucionales que aparecen en el encabezado de los
documentos generados por ElectroLearn (guías, pruebas, planificaciones, fichas, etc.).

## Convención de nombres

- Cada colegio tiene un **slug** (identificador en minúsculas, sin tildes ni espacios,
  separado por guiones). Ej: `salesianos-talca`, `liceo-bicentenario-puerto-montt`.
- El archivo del logo debe llamarse `<slug>.png` (preferido) o `<slug>.svg`.
- Tamaño recomendado: **cuadrado**, mínimo **256×256 px**, fondo transparente.
- Peso máximo recomendado: 200 KB.

## Archivos por defecto

- `default.svg` — placeholder genérico que se usa cuando un profesor no tiene logo asignado.

## Cómo agregar un colegio nuevo

1. Subir el archivo `<slug>.png` a esta carpeta.
2. Registrar el colegio en `js/colegios.js` (slug + nombre oficial).
3. Desde la cuenta del profesor, en *Perfil del profesor* → *Institución educativa*,
   elegir el colegio del listado o usar el campo de texto libre.

## Resolución del logo en runtime

El cliente intenta cargar `assets/logos/colegios/<colegio.slug>.png`. Si no existe, hace
fallback a `default.svg`. La función `resolverLogoColegio(user)` está definida en
`js/colegios.js`.
