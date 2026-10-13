(function () {
  'use strict';
  const title = document.getElementById('title');
  const message = document.getElementById('message');
  const status = document.getElementById('status');
  try {
    const invite = ArdeInvitation.parse(location.hash);
    title.textContent = invite.payload.titulo;
    message.textContent = 'Si Arde está instalada, pulsa Abrir en Arde. El navegador no permite saber con certeza si está instalada. Si no abre, comprueba los enlaces admitidos de la app o copia este enlace y vuelve a abrirlo tras instalar la versión nueva.';
    const open = document.getElementById('open');
    open.href = invite.appLink;
    open.hidden = false;
    const copy = document.getElementById('copy');
    copy.hidden = false;
    copy.addEventListener('click', async function () {
      try {
        await navigator.clipboard.writeText(location.href);
        status.textContent = 'Enlace copiado. Guárdalo en privado y vuelve a abrirlo después de instalar.';
      } catch (_) { status.textContent = 'No se pudo copiar. Guarda el enlace desde la barra del navegador.'; }
    });
    // Do not repeatedly redirect the same HTTPS URL. Verified App Links open
    // before this fallback page loads. Custom schemes require a user gesture.
  } catch (_) {
    message.textContent = 'Este enlace está incompleto, es antiguo o no es válido. Pide un enlace nuevo o usa el QR de la intención. No se ha intentado unirse a ninguna sala.';
  }
})();
