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
Miguel confirmó en respuesta directa al certificado Play App Signing la huella
`4D:06:89:31:44:F7:70:DC:72:C7:56:7D:C2:BC:55:95:07:BA:67:FE:16:9B:6E:3C:4B:09:51:B8:74:32:FC:20`.
La rama incluye solo esa huella para com.kimera.arde. La raíz publicada conserva
C4:B5:AD:F1:4A:4E:3D:04:F3:D3:F2:41:4C:B5:FA:73:CC:E0:EE:8A:9D:1F:41:35:07:08:35:F6:35:B5:B9:3F,
que no coincide con la firma Play confirmada. El JSON de esta rama es el candidato
para la raíz: no se ha desplegado ni cambiado el repo del sitio raíz. El archivo de este
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
