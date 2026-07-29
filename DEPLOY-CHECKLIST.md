# 🚦 Checklist Pre-Deploy · Click&Clase

**Regla de oro:** ningún cambio va directo a `clickyclase.cl` sin pasar por staging primero. Si el checklist falla en algún paso, se hace **rollback** antes de investigar.

---

## Flujo recomendado

### 1) Deploy a staging (URL temporal, NO afecta producción)

```bash
firebase hosting:channel:deploy staging --project electrolearn-prod --expires 7d
```

Firebase te devuelve una URL tipo `https://electrolearn-prod--staging-abc123.web.app` que expira en 7 días. Ahí probás **todo el checklist de smoke test** de abajo.

### 2) Correr el smoke test automático

Andá a `https://<url-de-staging>/admin-smoke-test.html`, corre los 8 checks. Si alguno falla, no promovas.

### 3) Smoke test manual (10 min con dos ventanas)

Ventana 1 — sesión ADMIN plataforma:
- [ ] Login funciona
- [ ] Sidebar aparece completa con todos los grupos
- [ ] Panel Admin Colegio abre sin errores en consola
- [ ] Puedo agregar un profesor de prueba y aparece en la lista
- [ ] Diagnóstico de usuarios carga la lista sin 403

Ventana 2 — sesión de PROFESOR TP (o híbrido):
- [ ] Login funciona
- [ ] Dashboard carga con Acceso Rápido en 3 filas
- [ ] Planificador: elegir curso + módulo → **aparecen los OAs** ← el que se rompió
- [ ] Planificador: elegir OA → aparecen AEs → aparecen CEs
- [ ] Material con IA: generar un doc de prueba → guardar → **modal de visibilidad aparece**
- [ ] Biblioteca: el material recién creado aparece con chip "MÍO" y visibilidad
- [ ] Ficha alumno: se abre desde `alumnos.html` → botón 👤 → tabs cargan sin error
- [ ] Nueva anotación se guarda sin 403
- [ ] Nueva alerta genera el link WhatsApp/Mail

### 4) Si TODO pasa → promover a producción

```bash
firebase deploy --only hosting --project electrolearn-prod
```

### 5) Si algo falla → rollback inmediato

```bash
firebase hosting:rollback --project electrolearn-prod
```

Después investigá con calma en local o en un nuevo canal staging.

---

## Reglas no negociables

1. **Compatibilidad hacia atrás.** Toda función que reciba un ID, role, especialidad o cualquier dato con más de un formato válido tiene que aceptar todas las variantes. Nunca cambio unilateral.

2. **Firestore rules nuevas → deploy separado.** Primero `firebase deploy --only firestore:rules`. Verificás en la consola de Firebase que compilaron sin warnings, y recién después el hosting.

3. **Nunca borrar campos de usuarios existentes.** Solo agregar. Los usuarios legacy son ciudadanos de primera.

4. **Preview del cambio antes del edit destructivo.** Si voy a reemplazar una función grande, primero muestro el diff.

---

## Comandos de emergencia

```bash
# Ver estado actual de despliegues
firebase hosting:channel:list --project electrolearn-prod

# Ver versiones publicadas
firebase hosting:releases:list --project electrolearn-prod

# Rollback rápido a versión anterior
firebase hosting:rollback --project electrolearn-prod

# Ver rules activas (compilar sin deploy)
firebase deploy --only firestore:rules --project electrolearn-prod --dry-run

# Ver logs de auth/Firestore
firebase functions:log --project electrolearn-prod --lines 100
```

---

## Cuando algo falla en producción

1. **Rollback primero** (`firebase hosting:rollback`) — recuperás en 30 seg
2. **Reproducir en staging** — armá el escenario ahí, no en producción
3. **Fix + tests** — corregí y agrega al smoke test un check que hubiera detectado el bug
4. **Deploy con checklist completo** — no salte pasos

---

_Última actualización: 2026-07-15_
