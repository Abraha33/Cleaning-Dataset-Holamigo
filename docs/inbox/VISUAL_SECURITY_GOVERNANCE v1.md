````md id="r93kvt"
# VISUAL_SECURITY_GOVERNANCE_V1.md

## Estado

Documento oficial de seguridad, permisos y gobierno operativo del ecosistema visual.

Define cómo proteger datos, controlar accesos y mantener trazabilidad total.

---

# Objetivo

Asegurar que el sistema visual sea usable y seguro al mismo tiempo.

```text
quién entra
qué puede hacer
qué hizo
qué cambió
qué se expuso
````

---

# Principio Rector

```text id="x6m2pq"
Operación rápida, control estricto.
```

---

# Riesgos Reales que Resuelve

* usuarios borrando imágenes
* accesos no autorizados
* links públicos expuestos
* cambios sin rastro
* aprobación indebida
* robo de credenciales
* dispositivos perdidos

---

# Modelo de Seguridad

## Capas

```text id="m8r4za"
Identidad
Autorización
Datos
Archivos
Auditoría
Dispositivo
```

---

# Roles Oficiales

```text id="h5q7dw"
ADMIN
SUPERVISOR
CAPTURADOR
REVISOR
VIEWER
AUDITOR
```

---

# Matriz Base de Permisos

## ADMIN

* usuarios
* roles
* configuración
* integraciones
* ver todo

## SUPERVISOR

* asignar tareas
* ver dashboards
* reasignar
* cerrar backlog

## CAPTURADOR

* ver solo sus tareas
* subir fotos
* editar borradores propios

## REVISOR

* aprobar
* retoma
* rechazar

## VIEWER

* solo lectura autorizada

## AUDITOR

* acceso logs/reportes

---

# Autenticación

## MVP Recomendado

```text id="v2n8ke"
JWT access token
refresh token
```

## Mejoras Fase 2

```text id="z1r6mc"
MFA admin
SSO empresa
device trust
```

---

# Políticas de Password

```text id="q7w3pd"
mínimo 10 caracteres
bloqueo intentos fallidos
rotación opcional admin
```

---

# Sesiones

## Controles

* logout remoto
* expiración inactividad
* revocar tokens
* ver sesiones activas

---

# Autorización Técnica

## Backend obligatorio

Cada endpoint valida:

```text id="u3m9fx"
usuario autenticado
rol permitido
recurso permitido
```

## Ejemplo

Capturador no puede abrir tareas ajenas salvo permiso.

---

# Seguridad de Archivos

## Object Storage

Usar privado por defecto.

## Entrega

```text id="t4q2lh"
signed URLs temporales
```

## Públicas solo:

* thumbnails web necesarias
* assets comerciales definidos

---

# Auditoría Total

## Tabla audit_logs

Registrar:

```text id="n9v5ra"
usuario
acción
entidad
antes
después
ip
device
timestamp
```

---

# Eventos Críticos

```text id="e6m1zc"
LOGIN_SUCCESS
LOGIN_FAILED
PHOTO_DELETED
ROLE_CHANGED
PHOTO_APPROVED
PRIMARY_CHANGED
USER_DISABLED
EXPORT_DONE
```

---

# Gobierno de Cambios

## Acciones sensibles requieren doble control

```text id="f8r3qp"
borrar asset oficial
cambiar rol admin
desactivar usuario crítico
publicar masivo
```

---

# Seguridad Móvil

## Controles

* PIN opcional
* bloqueo app inactividad
* limpiar cache logout
* detectar root (fase 2)

---

# Protección de Datos

## Mínimos

* cifrado en tránsito HTTPS
* hashes password fuertes
* cifrado backups
* secretos fuera código

---

# Logs y Monitoreo

Alertar:

```text id="j2q7tn"
muchos login fallidos
descargas masivas
borrados inusuales
errores permisos
```

---

# Retención de Datos

## Sugerida

```text id="w5m4kd"
audit logs: 2 años
sync logs: 90 días
sesiones: 30 días
```

---

# Backup y Recuperación

## Política MVP

```text id="r7n1ps"
DB diario
media incremental
restore probado mensual
```

---

# Cumplimiento Operativo

* mínimo privilegio
* separación funciones
* trazabilidad completa
* acceso need-to-know

---

# Riesgos a Evitar

* todos admin
* URLs permanentes públicas
* sin logs
* permisos solo frontend
* secretos en app móvil
* borrar sin historial

---

# Roadmap Fase 2

* MFA completo
* SIEM básico
* detección anomalías IA
* políticas por sede
* watermark interno

---

# Veredicto Técnico

Un sistema operativo sin seguridad se rompe internamente antes que externamente.

---

# Estado

Documento oficial VISUAL_SECURITY_GOVERNANCE v1.

```
```
