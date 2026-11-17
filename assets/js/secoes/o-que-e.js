/* Fluxos animados: "O que é a Zapvu?" e Arquitetura (motor em assets/js/fluxo.js). */
(() => {
  if (!window.Fluxo) return;

  /* ---------- O que é: seu sistema -> Zapvu -> WhatsApp, e o evento voltando ---------- */
  const oq = document.querySelector('[data-flow="oq"]');
  if (oq) {
    const log = oq.querySelector('[data-oq-log]');
    const SYS = ['crm', 'erp', 'bot', 'auto', 'web'];
    const ROTA = { crm: '/messages/text', erp: '/messages/document', bot: '/messages/text', auto: '/messages/image', web: '/messages/location' };
    const setLog = (a, b) => { log.innerHTML = `<b>${a}</b> <span>${b}</span>`; };
    const seqFor = (s) => [
      { n: s, badge: 'POST' },
      { e: s, ms: 900 },
      { n: 'zv', badge: '202 · na fila' },
      { e: 'w', ms: 650 },
      { n: 'wa', badge: 'entregue ✓', hold: 700 },
      { e: 'w', rev: true, ms: 650 },
      { n: 'zv', badge: 'assinado' },
      { e: s, rev: true, ms: 900 },
      { n: s, badge: 'webhook ✓' },
    ];
    const edges = { w: ['zv', 'wa', 'h'] };
    SYS.forEach((s) => { edges[s] = [s, 'zv', 'h']; });
    const fl = window.Fluxo(oq, {
      edges,
      seqs: SYS.map(seqFor),
      onStep: (st) => {
        if (SYS.includes(st.n) && st.badge === 'POST') setLog('POST', `/v1${ROTA[st.n]}`);
        if (st.n === 'wa') setLog('webhook', 'message.delivered');
      },
    });
    SYS.forEach((s) => oq.querySelector(`[data-wf="${s}"]`).addEventListener('pointerenter', () => fl.run(seqFor(s))));
  }

  /* ---------- Arquitetura: Aplicações -> API -> Motor -> WhatsApp, com banco e webhooks ---------- */
  const pf = document.querySelector('[data-flow="pf"]');
  if (pf) {
    const SEQ = [
      // 0: processo leve: a mensagem atravessa o motor
      [{ n: 'app', badge: 'POST' }, { e: 'a1' }, { n: 'api', badge: 'Bearer ✓' }, { e: 'a2' }, { n: 'core', badge: 'processando' }, { e: 'a3', ms: 700 }, { n: 'wpp', badge: 'enviada ✓', hold: 600 }],
      // 1: webhook com reenvio
      [{ n: 'wpp', badge: 'evento' }, { e: 'a3', rev: true, ms: 700 }, { n: 'core' }, { e: 'hk', ms: 1100 }, { n: 'app', badge: 'tentativa 1 ✕' }, { wait: 300 }, { e: 'hk', ms: 900 }, { n: 'app', badge: 'tentativa 3 ✓', hold: 600 }],
      // 2: grava no banco (fila e auditoria)
      [{ n: 'api' }, { e: 'a2' }, { n: 'core', badge: 'na fila' }, { e: 'db', ms: 700 }, { n: 'db', badge: 'gravado', hold: 500 }, { e: 'db', rev: true, ms: 700 }, { n: 'core', badge: 'auditoria' }],
      // 3: evento assinado chegando nas aplicações
      [{ n: 'wpp', badge: 'mensagem' }, { e: 'a3', rev: true, ms: 700 }, { n: 'core', badge: 'HMAC' }, { e: 'hk', ms: 1100 }, { n: 'app', badge: 'sha256 ✓', hold: 600 }],
    ];
    const fl = window.Fluxo(pf, {
      edges: { a1: ['app', 'api', 'h'], a2: ['api', 'core', 'h'], a3: ['core', 'wpp', 'h'], db: ['core', 'db', 'v'], hk: ['core', 'app', 'u'] },
      seqs: SEQ,
    });
    window.zvPF = (i) => fl.run(SEQ[i]);
  }
})();
