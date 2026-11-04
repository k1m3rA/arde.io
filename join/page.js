(function () {
  'use strict';
  const title = document.getElementById('title');
  const message = document.getElementById('message');
  const status = document.getElementById('status');
  const state = ArdeInvitation.classify(location.search, location.hash);
  const help = document.getElementById('help');
  if (state.kind !== 'current') document.getElementById('privacy').textContent = 'Comparte invitaciones, QR y códigos solo en privado con las personas que quieras invitar.';
  if (state.kind === 'generic') {
    message.textContent = 'Esta es la página general de invitaciones, no un enlace para unirte a una intención. Si ya tienes Arde, ábrela desde su icono. Para compartir una intención, ábrela en Arde y usa compartir: enlace, QR o código.';
    help.hidden = false;
    return;
  }
  if (state.kind === 'legacy') {
    message.textContent = 'Este enlace fue generado con un formato antiguo que ya no funciona, porque no incluye la clave de la intención. Pide a quien te invitó un enlace nuevo, o su QR o código.';
    help.hidden = false;
    return;
  }
  if (state.kind === 'invalid') {
    message.textContent = 'No se reconoce esta invitación. Puede estar incompleta o dañada. Pide el QR o código a quien te invitó. No se ha intentado unirse a ninguna sala.';
    help.hidden = false;
    return;
  }
  try {
    const invite = state.invite;
    title.textContent = invite.payload.titulo;
    message.textContent = 'Para unirte a esta intención, pulsa «Abrir en Arde» si ya tienes la app instalada. Si aún no la tienes, instálala desde Google Play y vuelve después a este mismo enlace.';
    const open = document.getElementById('open');
    open.href = invite.appLink;
    open.hidden = false;
    const copy = document.getElementById('copy');
    copy.hidden = false;
    help.hidden = false;
    copy.addEventListener('click', async function () {
      try {
        await navigator.clipboard.writeText(location.href);
        status.textContent = 'Enlace copiado. Guárdalo en privado y ábrelo con Arde.';
      } catch (_) { status.textContent = 'No se pudo copiar. Guarda el enlace desde la barra del navegador.'; }
    });
  } catch (_) {
    message.textContent = 'No se pudo preparar la invitación. Usa el QR o código de la intención.';
  }
})();
