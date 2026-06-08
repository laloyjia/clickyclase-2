// =============================================
// DATOS CURRICULARES — Especialidad Ventas
// Archivo: js/curricula/tp/datos-ventas.js
//
// Estado: ESPECIALIDAD RETIRADA DEL CURRÍCULO MINEDUC (Reforma DS 452/2013).
// Ventas pasó a ser una mención dentro de Administración.
// Este archivo se mantiene como placeholder para retrocompatibilidad
// de datos guardados antiguamente en Firestore con clave 'ventas'.
//
// El alias 'ventas' → 'administracion' está declarado en
// js/curricula-chile.js (TP_ALIASES). La función _resolveEspKey()
// resuelve automáticamente el redireccionamiento.
//
// NO se carga este archivo desde ningún HTML.
// Si necesitas eliminarlo definitivamente, hazlo manualmente desde
// el sistema de archivos.
// =============================================

window.CURRICULA_FULL = window.CURRICULA_FULL || {};

// Entrada vacía solo por compatibilidad con código que asume que la clave existe.
// El verdadero contenido vive en CURRICULA_FULL['administracion'] vía alias.
CURRICULA_FULL['ventas'] = {
  _alias: 'administracion',
  _retirado: 'DS 452/2013',
  modulos: {}
};
