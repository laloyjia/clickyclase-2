# -*- coding: utf-8 -*-
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER
from reportlab.platypus import (SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
                                 KeepTogether)

PRIMARY = colors.HexColor('#5B4BE0')
TEAL    = colors.HexColor('#0FB5A8')
DARK    = colors.HexColor('#1F2430')
MUTED   = colors.HexColor('#6B7280')
LIGHT   = colors.HexColor('#EEF0F8')
GREEN   = colors.HexColor('#0E9F6E')
AMBER   = colors.HexColor('#D97706')
RED     = colors.HexColor('#DC2626')
LINE    = colors.HexColor('#E2E5F0')

styles = getSampleStyleSheet()
def S(name, **kw):
    base = kw.pop('parent', styles['Normal'])
    return ParagraphStyle(name, parent=base, **kw)

st_title   = S('t', fontName='Helvetica-Bold', fontSize=23, textColor=colors.white, leading=27)
st_sub     = S('s', fontName='Helvetica', fontSize=10.5, textColor=colors.HexColor('#E7E4FF'), leading=15)
st_h2      = S('h2', fontName='Helvetica-Bold', fontSize=13.5, textColor=PRIMARY, leading=17, spaceBefore=14, spaceAfter=5)
st_body    = S('b', fontSize=9.7, textColor=DARK, leading=14.5, alignment=TA_LEFT, spaceAfter=4)
st_bullet  = S('bu', fontSize=9.7, textColor=DARK, leading=14, leftIndent=12, bulletIndent=2, spaceAfter=2.5)
st_small   = S('sm', fontSize=8.4, textColor=MUTED, leading=11.5)
st_cellh   = S('ch', fontName='Helvetica-Bold', fontSize=8.6, textColor=colors.white, leading=11)
st_cell    = S('c', fontSize=8.6, textColor=DARK, leading=11.5)
st_cellb   = S('cb', fontName='Helvetica-Bold', fontSize=8.6, textColor=DARK, leading=11.5)

story = []

def header_band(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(PRIMARY)
    canvas.rect(0, A4[1]-42*mm, A4[0], 42*mm, fill=1, stroke=0)
    canvas.setFillColor(TEAL)
    canvas.rect(0, A4[1]-42*mm, A4[0], 2.5*mm, fill=1, stroke=0)
    canvas.restoreState()
    plain_footer(canvas, doc)

def plain_footer(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(MUTED); canvas.setFont('Helvetica', 7.5)
    canvas.drawString(20*mm, 12*mm, 'Click&Clase - Resumen ejecutivo - confidencial')
    canvas.drawRightString(A4[0]-20*mm, 12*mm, 'Pag. %d' % doc.page)
    canvas.setStrokeColor(LINE); canvas.line(20*mm, 15*mm, A4[0]-20*mm, 15*mm)
    canvas.restoreState()

story.append(Spacer(1, 4*mm))
story.append(Paragraph('Click&amp;Clase - Resumen Ejecutivo', st_title))
story.append(Paragraph('Plataforma multi-colegio de gestion escolar potenciada con IA &nbsp;&middot;&nbsp; Estado del proyecto y hoja de ruta', st_sub))
story.append(Paragraph('25 de junio de 2026 &nbsp;&middot;&nbsp; Entorno de pruebas: clickyclase-2 (GitHub &middot; Firebase &middot; Vercel)', st_sub))
story.append(Spacer(1, 12*mm))

story.append(Paragraph('1. Que estamos construyendo', st_h2))
story.append(Paragraph(
    'Click&amp;Clase es una plataforma <b>multi-colegio (multi-tenant)</b> que centraliza la gestion de un '
    'establecimiento escolar chileno y entrega a cada cargo -direccion, UTP, profesores, convivencia, apoyo '
    'psicosocial y PIE- un panel propio. Su diferencial es que <b>todo el material se genera con apoyo de IA</b>, '
    'fundamentado en los documentos de la institucion (PEI, reglamentos y protocolos) y en la normativa chilena vigente. '
    'El modelo sirve tanto a colegios completos (servidor dedicado) como a profesores independientes (servicio publico).', st_body))

story.append(Paragraph('2. Que tenemos hoy (MVP funcional)', st_h2))
logros = [
    ('Arquitectura multi-tenant real', 'Cada colegio queda aislado por su <i>orgId</i>; los datos se enrutan al colegio del usuario que inicia sesion.'),
    ('14 paneles por rol', 'Director y Profesor al 100%; Admin, Admin de Colegio, Rector, UTP (por segmento), Jefe TP, Convivencia, Apoyo, PIE y profesionales de area operativos.'),
    ('Persistencia compartida', 'Capa de datos sobre Firestore con respaldo local; lo que carga un usuario lo ven los demas del mismo colegio.'),
    ('IA fundamentada', 'Generacion de planificaciones, planes de accion e informes a partir de los documentos institucionales mas leyes (Ley 20.536, Decreto 170/83, Estatuto Docente).'),
    ('Asistente de creacion de colegios', 'El admin crea un colegio con un asistente por pasos: define niveles, asignaturas y especialidades, y se crean automaticamente las cuentas de cada cargo.'),
    ('Flujo academico completo', 'Admin define la malla, UTP asigna asignaturas a cada profesor, el profesor las ve en su panel.'),
]
for t, d in logros:
    story.append(Paragraph('<b>%s.</b> %s' % (t, d), st_bullet, bulletText='-'))

story.append(Paragraph('3. Estado por panel', st_h2))
def ec(txt, color):
    return Paragraph('<font color="white"><b>%s</b></font>' % txt,
                     S('ec', fontSize=8, alignment=TA_CENTER, backColor=color, leading=12))
rows = [
    [Paragraph('Panel', st_cellh), Paragraph('Estado', st_cellh), Paragraph('Destacado', st_cellh)],
    [Paragraph('Director', st_cellb), ec('100%', GREEN), Paragraph('7 secciones, KPIs, calendario, branding, carga de documentos', st_cell)],
    [Paragraph('Profesor', st_cellb), ec('100%', GREEN), Paragraph('Material con IA, libro de notas con promedio/riesgo, derivaciones', st_cell)],
    [Paragraph('Convivencia', st_cellb), ec('Profundizado', PRIMARY), Paragraph('Casos + plan IA + linea de tiempo / seguimiento de casos', st_cell)],
    [Paragraph('Apoyo psicosocial', st_cellb), ec('Profundizado', PRIMARY), Paragraph('Casos, informes y red de derivacion (OPD/CESFAM/Mejor Ninez)', st_cell)],
    [Paragraph('PIE', st_cellb), ec('Profundizado', PRIMARY), Paragraph('Carpeta por estudiante (diagnostico, PACI, evaluaciones, historial)', st_cell)],
    [Paragraph('Rector', st_cellb), ec('Profundizado', PRIMARY), Paragraph('Indicadores Mineduc con metas y semaforo (asistencia, SIMCE, IDPS)', st_cell)],
    [Paragraph('Jefe TP', st_cellb), ec('Profundizado', PRIMARY), Paragraph('Especialidades, modulos, practicas profesionales y titulacion', st_cell)],
    [Paragraph('UTP (x5 segmentos)', st_cellb), ec('Operativo', TEAL), Paragraph('Revision de planificaciones y asignacion de profesores', st_cell)],
    [Paragraph('Admin / Admin Colegio', st_cellb), ec('Operativo', TEAL), Paragraph('Gestion de usuarios, colegios y configuracion de IA', st_cell)],
]
t = Table(rows, colWidths=[38*mm, 26*mm, 106*mm])
t.setStyle(TableStyle([
    ('BACKGROUND',(0,0),(-1,0),PRIMARY),
    ('VALIGN',(0,0),(-1,-1),'MIDDLE'),
    ('TOPPADDING',(0,0),(-1,-1),5),('BOTTOMPADDING',(0,0),(-1,-1),5),
    ('LEFTPADDING',(0,0),(-1,-1),7),('RIGHTPADDING',(0,0),(-1,-1),7),
    ('ROWBACKGROUNDS',(0,1),(-1,-1),[colors.white, LIGHT]),
    ('LINEBELOW',(0,0),(-1,-1),0.4,LINE),
    ('BOX',(0,0),(-1,-1),0.6,LINE),
]))
story.append(t)
story.append(Spacer(1, 3))
story.append(Paragraph('"Profundizado" = mejorado hoy con gestion real, no solo demo.', st_small))

story.append(Paragraph('4. Mejoras incorporadas en esta sesion', st_h2))
for t_, d in [
    ('Convivencia', 'linea de tiempo de cada caso con registro de hitos en un clic, mas una bitacora de seguimiento.'),
    ('Apoyo psicosocial', 'directorio de la red de derivacion con accion "Derivar" que registra la derivacion automaticamente.'),
    ('PIE', 'carpeta por estudiante que reune diagnostico, documentos PACI, evaluaciones e historial; ahora tambien persiste y se aisla por colegio.'),
    ('Rector', 'panel de indicadores Mineduc con metas, barras de avance y semaforo.'),
    ('Jefe TP', 'gestion de practicas profesionales (720 h, tutor, empresa) y proceso de titulacion.'),
]:
    story.append(Paragraph('<b>%s:</b> %s' % (t_, d), st_bullet, bulletText='-'))

story.append(Paragraph('5. Que falta (hoja de ruta)', st_h2))
def block(titulo, color, items):
    cab = Paragraph('<font color="white"><b>&nbsp;%s&nbsp;</b></font>' % titulo,
                    S('bl', fontSize=9, backColor=color, leading=15, alignment=TA_LEFT))
    inner = [cab, Spacer(1,3)]
    for it in items:
        inner.append(Paragraph(it, st_bullet, bulletText='-'))
    return KeepTogether(inner)

story.append(block('PRIORIDAD ALTA - Seguridad e infraestructura', RED, [
    '<b>Reglas estrictas multi-tenant:</b> validar la pertenencia del usuario al colegio a nivel de base de datos (hoy las reglas son permisivas).',
    '<b>Storage de archivos reales:</b> hoy se lee el texto de los PDF; falta activar Firebase Storage y guardar los archivos.',
    '<b>IA con claves en Firestore</b> y <b>notificaciones</b> automaticas ante alertas.',
    '<b>Cambio de contrasena al primer ingreso, auditoria</b> de datos sensibles y <b>respaldo/exportacion</b>.',
]))
story.append(Spacer(1,5))
story.append(block('PRIORIDAD MEDIA - Profundidad de gestion', AMBER, [
    'Libro de clases completo, red de derivacion con estados, carpetas por estudiante en todos los paneles.',
    'Indicadores Mineduc conectados al PME; dashboards de uso por colegio.',
]))
story.append(Spacer(1,5))
story.append(block('EVOLUCION - IA avanzada y producto SaaS', TEAL, [
    'Busqueda semantica (RAG) sobre documentos largos; plantillas institucionales de salida; asistente-chat por rol; control de costos de IA.',
    'Onboarding guiado, autoservicio del profesor independiente, planes y facturacion, pagina publica, PWA y multi-idioma.',
]))

story.append(Paragraph('6. Recomendacion de proximos pasos', st_h2))
pasos = [
    'Probar a fondo lo construido con el checklist (CHECKLIST-PRUEBAS.md) antes de seguir agregando.',
    'Activar la seguridad real (reglas con pertenencia al colegio): bloqueador para mostrar datos sensibles a colegios.',
    'Habilitar Storage para subir y guardar archivos reales.',
    'Profundizar los paneles restantes y, luego, IA avanzada y funciones SaaS.',
]
for i, p in enumerate(pasos, 1):
    story.append(Paragraph('<b>%d.</b> %s' % (i, p), st_bullet, bulletText=''))

story.append(Spacer(1, 6))
prog = Table([[
    Paragraph('<font color="white"><b>Avance global estimado</b></font>', S('p', fontSize=9.5, leading=13)),
    Paragraph('<font color="white"><b>~55-60%</b></font>', S('p2', fontSize=11, leading=13, alignment=TA_CENTER)),
    Paragraph('<font color="white">Toda la base dificil resuelta: multi-tenant, persistencia, IA y roles. Lo que resta es mas predecible.</font>', S('p3', fontSize=8.6, leading=11.5)),
]], colWidths=[40*mm, 28*mm, 102*mm])
prog.setStyle(TableStyle([
    ('BACKGROUND',(0,0),(-1,-1),DARK),
    ('VALIGN',(0,0),(-1,-1),'MIDDLE'),
    ('TOPPADDING',(0,0),(-1,-1),8),('BOTTOMPADDING',(0,0),(-1,-1),8),
    ('LEFTPADDING',(0,0),(-1,-1),9),('RIGHTPADDING',(0,0),(-1,-1),9),
    ('LINEAFTER',(0,0),(1,-1),0.6,colors.HexColor('#3A3F4D')),
]))
story.append(prog)

import os
out = os.path.join(os.path.dirname(__file__), 'Resumen-Ejecutivo-ClickyClase.pdf')
doc = SimpleDocTemplate(out, pagesize=A4, topMargin=18*mm, bottomMargin=20*mm,
                        leftMargin=20*mm, rightMargin=20*mm,
                        title='Click&Clase - Resumen Ejecutivo', author='Click&Clase')
doc.build(story, onFirstPage=header_band, onLaterPages=plain_footer)
print('OK ->', out)
