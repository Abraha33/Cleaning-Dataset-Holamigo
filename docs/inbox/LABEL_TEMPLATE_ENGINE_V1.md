# LABEL_TEMPLATE_ENGINE_V1.md## EstadoDocumento oficial : LABEL_TEMPLATE_ENGINE_V1.mdMotor central para generación, versionado y control de plantillas de etiquetas físicas y digitales.---# ObjetivoPermitir crear etiquetas reutilizables para múltiples productos, tamaños e impresoras sin rediseñar cada vez.```textun dato maestromuchas plantillasimpresión consistenterápida adaptación

Problema Real
Sin motor de plantillas ocurre:
cada usuario diseña diferentetexto cortadoprecios mal ubicadoslogos deformadostiempo perdido ajustando tamañoserrores frecuentes

Principio Rector
Datos variables + diseño fijo = etiqueta escalable

Entidades Principales
label_templates
idcodenamecategorywidth_mmheight_mmdpiprinter_typeorientationversionactivecreated_atupdated_at
label_template_fields
idtemplate_idfield_codefield_typexywidthheightfont_sizefont_weightalignvisibleformat_rulesort_order
label_template_assets
idtemplate_idasset_typefile_pathactive

Tipos de Plantilla MVP
PRICE_SMALLPRICE_LARGESHELF_TAGBARCODE_STANDARDPROMO_REDWAREHOUSE_LOCATIONQR_INFO

Campos Variables Soportados
product_nameshort_namepriceold_priceskubarcodebrandunitpack_qtypromo_textdate_printedbatch_code

Tipos de Elementos
textbarcodeqrcodeimagelineboxprice_block

Flujo Oficial
Paso 1
Admin crea plantilla base.
Paso 2
Define dimensiones.
Paso 3
Arrastra campos dinámicos.
Paso 4
Guarda versión.
Paso 5
Usuarios imprimen usando plantilla aprobada.

Ejemplo Plantilla Precio
Nombre productoPrecio grandeUnidad pequeñaCódigo barras abajo

Ejemplo Plantilla Promoción
ANTESprecio viejo tachadoAHORAprecio nuevo grandevigencia

Reglas de Render
Texto
auto wrapellipsis si excedeuppercase opcional
Precio
separador milessin decimales por defecto
Barcode
EAN13CODE128QR

Versionado
Nunca sobrescribir plantilla usada.
PRICE_SMALL v1PRICE_SMALL v2
Trabajos viejos conservan versión original.

Compatibilidad Impresoras
Térmica
Zebra Technologies / TSC Auto ID
Láser
HP Inc. / Canon Inc.

UI Admin Plantillas
Panel Izquierdo


lista plantillas


versiones


filtros


Centro
Canvas visual.
Derecha
Propiedades campo.

Seguridad
Solo roles:
ADMINSUPERVISOR autorizado
pueden editar plantillas.

Auditoría
Registrar:
quién creóquién modificóversióncambiosfecha

KPIs Útiles
plantilla más usadaerrores impresión por plantillareimpresionestiempo promedio render

Riesgos a Evitar
editar HTML libre sin controlsin versionadomedidas manuales inconsistentescampos hardcodeadosusuarios tocando producción

Roadmap Fase 2
editor drag & drop avanzadopreview móvilplantillas por sucursalA/B testing comercial

Veredicto Técnico
Sin motor de plantillas imprimes.
Con motor de plantillas estandarizas operación.

Estado
Documento oficial : LABEL_TEMPLATE_ENGINE_V1.md