# Página de invitación

Se prepara en fix/invitation-links desde master. No está desplegada.
El payload se recibe solo en `#invite=...`, no query. Es una clave bearer:
cualquiera con el enlace completo puede unirse. La página valida el formato,
no registra ni transmite el payload, no usa analytics ni recursos de terceros,
y aplica no-referrer/CSP. No publicar invitaciones ni capturas con claves reales.

El botón Abrir en Arde usa el fallback `arde://join#invite=...` con gesto del
usuario. Esto necesita la versión de app de fix/invitation-links instalada;
no modifica la versión actual de Play. HTTPS verificado sigue siendo el camino
principal y depende de la firma de la app instalada y el archivo de asociación
en la raíz del dominio. No se deduce instalación de una app por un timeout.
Los esquemas personalizados no prueban la identidad de la app; pueden ser
registrados por otra app. No equivalen a enlaces HTTPS verificados.

Ficha Android confirmada: https://play.google.com/store/apps/details?id=com.kimera.arde&hl=es
La huella actual de assetlinks.json NO se ha cotejado con Play App Signing.
No se modifica ni se despliega una huella sin verificarla. El archivo de este
repo bajo /arde.io/.well-known NO sustituye a
https://k1m3ra.github.io/.well-known/assetlinks.json (repo de sitio raíz).

iOS permanece bloqueado para asociación HTTPS: AASA raíz devuelve 404 y
el repo conserva un Team ID de ejemplo. Se han quitado del fallback los
botones con App Store ID ficticio. Team ID, bundle ID, firma/entitlements y
ficha real deben configurarse antes de ofrecer descarga iOS.

Prueba local: `node join/invitation.test.cjs`.
Pendiente: apertura HTTPS/fallback en Android Play y en iOS, con app fría y
abierta, instalación nueva, reenlace tras instalar y unión cifrada real entre
dos dispositivos. Sin despliegue no se da por arreglado el sitio en producción.
