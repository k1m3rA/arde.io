(function () {
  'use strict';
  const title = document.getElementById('title');
  const message = document.getElementById('message');
  const status = document.getElementById('status');
  const state = ArdeInvitation.classify(location.search, location.hash);
  const help = document.getElementById('help');
  if (state.kind !== 'current') document.getElementById('privacy').textContent = 'Comparte invitaciones, QR y códigos solo en privado con las personas que quieras invitar.';
  if (state.kind === 'generic') {
    message.textContent = 'Esta es la página general de invitaciones, no un enlace para unirte a una intención. Si ya tienes Arde, ábrela desde su icono. Para compartir una intención con la versión actual, usa su QR o código.';
    help.hidden = false;
    return;
  }
  if (state.kind === 'legacy') {
    message.textContent = 'Este enlace fue generado con el formato anterior, que no incluye la clave de la intención. La página está publicada, pero la app actual de Play todavía no tiene la reparación del enlace. Para unirte ahora, pide el QR o código a quien te invitó.';
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
    message.textContent = 'Este enlace requiere una versión de Arde que incluya la reparación de invitaciones. La app actual de Play aún no la tiene. Si tienes instalada la versión de prueba compatible, pulsa Abrir en Arde. Si no, usa el QR o código de la intención.';
    const open = document.getElementById('open');
    open.href = invite.appLink;
    open.hidden = false;
    const copy = document.getElementById('copy');
    copy.hidden = false;
    help.hidden = false;
    copy.addEventListener('click', async function () {
      try {
        await navigator.clipboard.writeText(location.href);
        status.textContent = 'Enlace copiado. Guárdalo en privado y ábrelo con una versión compatible de Arde.';
      } catch (_) { status.textContent = 'No se pudo copiar. Guarda el enlace desde la barra del navegador.'; }
    });
  } catch (_) {
    message.textContent = 'No se pudo preparar la invitación. Usa el QR o código de la intención.';
  }
})();
