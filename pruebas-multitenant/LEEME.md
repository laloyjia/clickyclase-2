# Pruebas multi-tenant — Click&Clase (Fase 0)

Verifica en **local** que el modelo por colegio aísla los datos y respeta la
matriz de permisos, **antes** de subir nada a internet.

## Qué prueba

1. **Aislamiento entre colegios** — un profesor del Colegio B no puede leer
   estudiantes ni material del Colegio A.
2. **Dato sensible** — el profesor ve las *adecuaciones de aula* pero NO el
   *diagnóstico clínico*; la educadora diferencial sí lo ve.
3. **Autoría** — un profesor solo puede crear material a su propio nombre.

## Cómo correrlo

### 1. En una terminal: levantar el emulador (déjala abierta)
```bash
cd "C:\Users\electronica9\Desktop\Proyectos AVANTI\electrolearn"
firebase emulators:start --project demo-electrolearn --only auth,functions,firestore
```

### 2. En OTRA terminal: instalar dependencias y correr la prueba
```bash
cd "C:\Users\electronica9\Desktop\Proyectos AVANTI\electrolearn\pruebas-multitenant"
npm install
node permisos.test.mjs
```

## Resultado esperado

```
── AISLAMIENTO ENTRE COLEGIOS ──
  ✓ El profesor del Colegio A SÍ ve la ficha base de su estudiante
  ✓ El profesor del Colegio B NO ve al estudiante del Colegio A
  ✓ El profesor del Colegio B NO ve material del Colegio A

── DATO SENSIBLE (diagnóstico clínico) ──
  ✓ El profesor SÍ ve las ADECUACIONES de aula (las aplica en clase)
  ✓ El profesor NO ve el DIAGNÓSTICO clínico (dato sensible)
  ✓ La educadora diferencial SÍ ve el diagnóstico clínico

── AUTORÍA DEL MATERIAL ──
  ✓ El profesor puede crear material a su propio nombre
  ✓ El profesor NO puede crear material a nombre de otro

────────────────────────────
  RESULTADO:  8 ✓   0 ✗
────────────────────────────
```

Un ✗ significa que una regla no protege lo que debería: hay que ajustar
`firestore.rules` y volver a correr. **Esto es lo que verificas en local
cuantas veces quieras, sin riesgo y sin tocar producción.**

## Estructura del modelo (la que probamos)

```
/organizaciones/{orgId}
    (doc) ......................... configuración / lineamientos del colegio
    /miembros/{uid} ............... { rol: profesor | coordinador | convivencia |
                                            apoyo | pie_educadora | pie_encargada | org_admin }
    /estudiantes/{estId}
        (doc) ..................... ficha base (nombre, curso)
        /adecuaciones/{id} ........ qué hacer en aula  (la ve el profesor)
        /clinico/{id} ............. diagnóstico NEE — DATO SENSIBLE (acceso restringido)
        /notas/{id} ............... notas y asistencia
    /materiales/{matId} ........... material generado con IA (con autorUid)
```

> Nota técnica: el diagnóstico va en un documento aparte (`/clinico/`) porque
> Firestore no puede ocultar campos individuales en una lectura. Separarlo es
> lo que permite que el profesor lea la ficha pero no el diagnóstico.
