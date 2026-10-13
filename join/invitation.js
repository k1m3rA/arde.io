/* No analytics, network requests, or logging of the bearer invitation. */
(function (root) {
  'use strict';
  function parse(fragment) {
    const code = new URLSearchParams(fragment.replace(/^#/, '')).get('invite');
    if (!code || code.length > 8192 || !/^[A-Za-z0-9_-]+$/.test(code)) throw Error('invalid');
    const base = code.replace(/-/g, '+').replace(/_/g, '/');
    const bytes = Uint8Array.from(atob(base.padEnd(Math.ceil(base.length / 4) * 4, '=')), c => c.charCodeAt(0));
    const p = JSON.parse(new TextDecoder('utf-8', {fatal: true}).decode(bytes));
    const uuid = /^[0-9a-f]{8}(-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i;
    if (p.v !== 1 || !uuid.test(p.intentionId) || !uuid.test(p.roomId) ||
        typeof p.titulo !== 'string' || !p.titulo.trim() || p.titulo.length > 500 ||
        typeof p.tipo !== 'string' || !p.tipo || p.tipo.length > 64 ||
        typeof p.key !== 'string' || !/^[A-Za-z0-9+/]{43}=$/.test(p.key) || atob(p.key).length !== 32 ||
        (p.maxParticipants != null && (!Number.isInteger(p.maxParticipants) || p.maxParticipants < 1)) ||
        (p.currentParticipants != null && (!Number.isInteger(p.currentParticipants) || p.currentParticipants < 0))) throw Error('invalid');
    return {code, payload: p, appLink: 'arde://join#invite=' + code};
  }
  if (typeof module !== 'undefined') module.exports = {parse};
  root.ArdeInvitation = {parse};
})(typeof window === 'undefined' ? globalThis : window);
