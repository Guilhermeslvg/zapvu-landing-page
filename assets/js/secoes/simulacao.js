/* Funcionalidades: simulação de uma conversa de verdade.
   Esquerda: o que passa pelo seu sistema (chamadas, respostas, webhooks).
   Direita: o celular da cliente (Carla) conversando com a Loja Centro.
   Cada passo mostra uma funcionalidade. Roda sozinho, dá para pausar, voltar,
   avançar ou clicar numa funcionalidade para ir direto a ela. */
(() => {
  const root = document.querySelector('[data-sim]');
  if (!root) return;
  const $ = (s) => root.querySelector(s);
  const chips = [...root.querySelectorAll('[data-go]')];
  const bars = [...root.querySelectorAll('.sim-bar i')];
  const elN = $('[data-sim-n]'), elT = $('[data-sim-title]'), elD = $('[data-sim-desc]');
  const lines = $('[data-sim-lines]'), logBox = $('[data-sim-log]');
  const chat = $('[data-ph-chat]'), status = $('[data-ph-status]');
  const call = $('[data-ph-call]'), callTxt = $('[data-ph-call-txt]');
  const playBtn = $('[data-sim-play]');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const esc = (t) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;');
  const TAG = { req: 'você → Zapvu', res: 'Zapvu → você', hook: 'webhook → você', zv: 'Zapvu', err: 'webhook → você' };

  /* ações que os passos usam. instant = sem esperar (usado para refazer o histórico ao pular) */
  function makeCtx(token, instant) {
    const alive = () => token === run;
    return {
      wait: (ms) => (instant ? Promise.resolve() : new Promise((r) => setTimeout(r, ms))).then(alive),
      log(type, text, note) {
        const li = document.createElement('li');
        li.className = `t-${type}`;
        li.innerHTML = `<span class="tag">${TAG[type]}</span><code>${esc(text)}</code>${note ? `<em>${esc(note)}</em>` : ''}`;
        lines.appendChild(li);
        if (!instant) { li.classList.add('enter'); requestAnimationFrame(() => requestAnimationFrame(() => li.classList.remove('enter'))); }
        logBox.scrollTop = logBox.scrollHeight;
        requestAnimationFrame(() => { logBox.scrollTop = logBox.scrollHeight; });
      },
      typing(on) { status.textContent = on ? 'digitando…' : 'online'; status.classList.toggle('on', on); },
      msg(side, html, cls = '') {
        const p = document.createElement('div');
        p.className = `ph-b ${side} ${cls}`;
        p.innerHTML = html;
        chat.appendChild(p);
        if (!instant) { p.classList.add('enter'); requestAnimationFrame(() => requestAnimationFrame(() => p.classList.remove('enter'))); }
        chat.scrollTop = chat.scrollHeight;
        requestAnimationFrame(() => { chat.scrollTop = chat.scrollHeight; });
        return p;
      },
      call(state) {
        if (!state) { call.classList.remove('on'); return; }
        call.classList.add('on'); callTxt.textContent = state;
      },
    };
  }

  const TK = '<svg class="tk" viewBox="0 0 18 11"><path d="M1 6l3.2 3.2L11 2"/><path d="M7.2 9.2 7.6 9.6 15 2"/></svg>';

  /* roteiro */
  const STEPS = [
    {
      t: 'O número conecta pelo QR code',
      d: 'Você cria a instância loja-centro e lê o QR code no celular da loja. Sem câmera, vale o código de 8 caracteres.',
      async run(c) {
        c.log('req', 'POST /v1/instances  { "name": "loja-centro" }');
        if (!(await c.wait(700))) return;
        c.log('res', '201  qr + código K7Q2-M9XA');
        if (!(await c.wait(1100))) return;
        c.log('zv', 'QR lido no celular da loja');
        if (!(await c.wait(700))) return;
        c.log('hook', 'connection.open', 'loja-centro conectada');
      },
    },
    {
      t: 'Seu sistema manda a mensagem',
      d: 'Uma chamada HTTP com o número do jeito que está no seu cadastro. Faltou o 9? A Zapvu corrige antes de enviar.',
      async run(c) {
        c.log('req', 'POST /v1/messages/text  to: 55 31 8888-7777');
        if (!(await c.wait(900))) return;
        c.log('zv', 'número corrigido → 55 31 9 8888-7777', '9º dígito');
      },
    },
    {
      t: 'Ela entra na fila, gravada no banco',
      d: 'A resposta volta na hora com o id da mensagem. Se o servidor reiniciar agora, ela continua na fila. Dá para consultar o status ou cancelar antes de sair.',
      async run(c) {
        c.log('res', '202 Accepted  msg_7Hq2  status: queued');
        if (!(await c.wait(900))) return;
        c.log('zv', 'na fila · gravada no banco');
      },
    },
    {
      t: 'Pausa e “digitando…”, como gente',
      d: 'Antes de enviar, a Zapvu espera um tempo aleatório entre 1,5 e 4 s e mostra “digitando…” no celular da cliente. Isso reduz o risco de bloqueio.',
      async run(c) {
        c.log('zv', 'pausa de 2,3 s · simulando “digitando…”');
        c.typing(true);
      },
    },
    {
      t: 'Saiu, e o seu sistema fica sabendo',
      d: 'Cada mudança de status chega no seu webhook, assinada com HMAC-SHA256. Você confere a assinatura e sabe que veio da Zapvu.',
      async run(c) {
        c.typing(false);
        c.msg('from', 'Oi, Carla! Seu pedido #4821 saiu para entrega. Chega hoje até as 18h.<time>14:02</time>');
        c.log('hook', 'message.sent      msg_7Hq2', 'assinado');
        if (!(await c.wait(800))) return;
        c.log('hook', 'message.delivered msg_7Hq2', 'assinado');
        if (!(await c.wait(900))) return;
        c.log('hook', 'message.read      msg_7Hq2', 'assinado');
      },
    },
    {
      t: 'Chamada repetida não vira mensagem repetida',
      d: 'Seu sistema tentou de novo com a mesma Idempotency-Key. A Zapvu reconhece a repetição e não manda outra mensagem para a Carla.',
      async run(c) {
        c.log('req', 'POST /v1/messages/text  Idempotency-Key: pedido-4821');
        if (!(await c.wait(900))) return;
        c.log('res', '200  msg_7Hq2 já enviada · nada duplicado');
      },
    },
    {
      t: 'A cliente responde, e nada se perde',
      d: 'Texto, áudio, imagem, vídeo, documento, localização e reação: tudo chega. A Zapvu grava no banco antes de confirmar ao WhatsApp. Se algo falhar no meio, o WhatsApp entrega de novo.',
      async run(c) {
        if (!(await c.wait(400))) return;
        c.msg('out', '<span class="ph-audio"><i class="pl"></i><span class="wv"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></span><small>0:07</small></span><time>14:05 ' + TK + '</time>', 'audio');
        if (!(await c.wait(800))) return;
        c.log('zv', 'áudio recebido · gravado no banco → confirmado ao WhatsApp');
        if (!(await c.wait(700))) return;
        c.log('hook', 'message.received  audio · 0:07', 'assinado');
      },
    },
    {
      t: 'Seu sistema caiu? A Zapvu insiste',
      d: 'Se o seu webhook não responder, ela tenta de novo até 12 vezes ao longo de cerca de 1 hora. Os eventos ficam guardados e podem ser reenviados depois.',
      async run(c) {
        c.msg('out', 'Consegue entregar no portão de trás?<time>14:06 ' + TK + '</time>');
        if (!(await c.wait(600))) return;
        c.log('err', 'message.received  tentativa 1', 'sem resposta');
        if (!(await c.wait(900))) return;
        c.log('err', 'message.received  tentativa 2', 'sem resposta');
        if (!(await c.wait(900))) return;
        c.log('hook', 'message.received  tentativa 3', '200 OK');
      },
    },
    {
      t: 'O número caiu. Ela avisa e reconecta',
      d: 'Desconectado, banido ou aberto em outro lugar: você recebe um webhook na hora. Se foi só a rede, ela reconecta sozinha, com espera crescente entre as tentativas.',
      async run(c) {
        c.log('zv', 'conexão perdida · nova tentativa em 1 s, 2 s, 4 s…');
        if (!(await c.wait(700))) return;
        c.log('hook', 'instance.disconnected  loja-centro');
        if (!(await c.wait(1600))) return;
        c.log('hook', 'connection.open  loja-centro', 'reconectada');
      },
    },
    {
      t: 'Ligação? Cada número tem as suas regras',
      d: 'A loja configurou “rejeitar chamadas”. Cada número escolhe: rejeitar chamadas, ignorar grupos, incluir status, marcar como lido, “digitando” e intervalo entre envios.',
      async run(c, instant) {
        if (!instant) {
          c.call('chamando…');
          if (!(await c.wait(1500))) return;
          c.call('chamada recusada');
          c.log('hook', 'call.received  Carla', 'recusada pela regra');
          if (!(await c.wait(1300))) return;
          c.call(null);
        } else {
          c.log('hook', 'call.received  Carla', 'recusada pela regra');
        }
        c.msg('sys', 'Chamada de voz recusada · 14:07');
      },
    },
  ];

  /* estado */
  let cur = 0, run = 0, playing = !reduce, visible = false, timer = 0;

  function reset() {
    lines.textContent = '';
    chat.querySelectorAll('.ph-b').forEach((n) => n.remove());
    status.textContent = 'online'; status.classList.remove('on');
    call.classList.remove('on');
  }

  function paint(n) {
    elN.textContent = String(n + 1).padStart(2, '0');
    elT.textContent = STEPS[n].t;
    elD.textContent = STEPS[n].d;
    chips.forEach((c, i) => {
      c.classList.toggle('on', i === n);
      c.classList.toggle('done', i < n);
      c.setAttribute('aria-selected', i === n ? 'true' : 'false');
    });
    bars.forEach((b, i) => { b.classList.toggle('done', i < n); b.classList.toggle('on', i === n); });
    root.style.setProperty('--sim-step-ms', `${STEP_MS}ms`);
  }

  const STEP_MS = 5600;

  /* vai para o passo n: refaz o histórico sem animação e anima só o passo n */
  async function go(n) {
    clearTimeout(timer);
    const token = ++run;
    cur = (n + STEPS.length) % STEPS.length;
    reset();
    for (let i = 0; i < cur; i++) await STEPS[i].run(makeCtx(token, true), true);
    paint(cur);
    bars[cur].classList.remove('on'); void bars[cur].offsetWidth;
    bars[cur].classList.toggle('on', true);
    root.classList.toggle('is-playing', playing);
    await STEPS[cur].run(makeCtx(token, reduce), reduce);
    if (token !== run) return;
    schedule();
  }

  function schedule() {
    clearTimeout(timer);
    if (!playing) return;
    timer = setTimeout(() => {
      if (!visible || document.hidden) return schedule();
      go(cur + 1);
    }, 1800);
  }

  function setPlaying(p) {
    playing = p;
    root.classList.toggle('is-playing', p);
    playBtn.setAttribute('aria-label', p ? 'Pausar' : 'Continuar');
    if (p) schedule(); else clearTimeout(timer);
  }

  chips.forEach((c) => c.addEventListener('click', () => { setPlaying(false); go(+c.dataset.go); }));
  $('[data-sim-prev]').addEventListener('click', () => { setPlaying(false); go(cur - 1); });
  $('[data-sim-next]').addEventListener('click', () => { setPlaying(false); go(cur + 1); });
  playBtn.addEventListener('click', () => setPlaying(!playing));

  new IntersectionObserver(([e]) => {
    const was = visible;
    visible = e.isIntersecting;
    if (visible && !was && !root.dataset.started) { root.dataset.started = '1'; go(0); }
  }, { threshold: 0.3 }).observe(root);

  setPlaying(playing);
  paint(0);
})();
