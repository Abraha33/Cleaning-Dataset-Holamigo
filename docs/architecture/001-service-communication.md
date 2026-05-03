# ADR 001: Comunicación de Servicios
Status: Proposed

## Contexto
Necesitamos conectar el procesamiento de datos (Python/Pandas) con el servidor de la aplicación (Node/Kotlin).

## Decisión
Usaremos una arquitectura de Microservicios donde el 'api-server' envía tareas al 'data-processor' vía colas de mensajes o llamadas REST internas.

## Consecuencias
- Desacoplamiento total.
- Escalabilidad independiente.
