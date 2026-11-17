/* Funcionalidades em leque: um card por funcionalidade, abertos num arco.
   Setas, arrastar ou teclado giram o leque. Clicar num card abre a explicação completa.
   Só transform e opacity animam (leve). Conteúdo tirado da descrição do produto. */
(() => {
  const stage = document.querySelector('[data-leque]');
  if (!stage) return;
  const fan = stage.querySelector('.fl-fan');
  const sec = stage.closest('section');
  const modal = sec.querySelector('[data-fl-modal]');
  const $m = (s) => modal.querySelector(s);
  const nEl = sec.querySelector('[data-fl-n]');

  /* ícones neon (traço) */
  const I = {
    qr: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><path d="M14 14h3v3M21 14v7h-7M17 21v-3"/>',
    fila: '<path d="M8 6h12M8 12h12M8 18h12"/><circle cx="4" cy="6" r="1"/><circle cx="4" cy="12" r="1"/><circle cx="4" cy="18" r="1"/>',
    ritmo: '<path d="M4 5h16v11H9l-5 4V5Z"/><path d="M9 10.5h.01M12 10.5h.01M15 10.5h.01"/>',
    dup: '<rect x="8" y="8" width="12" height="12" rx="3"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/><path d="m11 14 2 2 4-4"/>',
    nove: '<rect x="6" y="2.5" width="12" height="19" rx="3"/><path d="M10.5 9.5a1.6 1.6 0 1 1 3 .8L11 15"/><path d="M11 18.5h2"/>',
    hook: '<path d="M12 3 4.5 6v5.5c0 4.6 3.1 8 7.5 9.5 4.4-1.5 7.5-4.9 7.5-9.5V6L12 3Z"/><path d="m9 12 2.2 2.2L15.5 10"/>',
    banco: '<ellipse cx="12" cy="6" rx="7" ry="3"/><path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6"/>',
    volta: '<path d="M20 11a8 8 0 0 0-14-4M4 4v4h4M4 13a8 8 0 0 0 14 4M20 20v-4h-4"/>',
    regras: '<path d="M4 7h10M18 7h2M4 17h2M10 17h10"/><circle cx="16" cy="7" r="2"/><circle cx="8" cy="17" r="2"/>',
    tipos: '<rect x="3" y="3" width="8" height="8" rx="2"/><rect x="13" y="3" width="8" height="8" rx="2"/><rect x="3" y="13" width="8" height="8" rx="2"/><path d="M15 15l4 2-4 2Z"/>',
    leve: '<path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z"/>',
    cadeado: '<rect x="4" y="10" width="16" height="11" rx="3"/><path d="M8 10V7a4 4 0 0 1 8 0v3M12 14.5v2.5"/>',
  };

  /* t: título em duas partes (forte + fraca), s: frase do card, lead e blocos da explicação */
  const F = [
    { i: 'qr', t: ['Conexão', 'por QR code'], s: 'O número conecta como no WhatsApp Web, sem ninguém mexer no celular depois.',
      lead: 'Você cria uma instância, que é um número de WhatsApp, e lê o QR code no celular. Pronto: daí em diante seu sistema manda e recebe mensagens por HTTP.',
      b: [['Como conectar', ['Crie a instância pelo painel ou pela API. Ela já vem com a própria chave de acesso.', 'No celular, abra Aparelhos conectados e leia o QR code.', 'Sem câmera? Use o código de pareamento de 8 caracteres.']],
          ['Depois de conectado', ['Listar, editar e excluir números.', 'Desconectar, reiniciar ou desvincular (logout) quando quiser.']]] },
    { i: 'fila', t: ['Envio', 'em fila'], s: 'Cada envio fica gravado no banco até sair. Reiniciou o servidor? Nada some.',
      lead: 'Toda mensagem que o seu sistema manda entra numa fila guardada no banco de dados, e não só na memória.',
      b: [['O que isso garante', ['Se o servidor reiniciar, a fila continua de onde parou.', 'Cada envio tem um status que você consulta pela API.', 'Dá para cancelar uma mensagem enquanto ela ainda está na fila.']]] },
    { i: 'ritmo', t: ['Ritmo', 'de gente'], s: 'Pausa aleatória e “digitando…” antes de cada envio, para não parecer robô.',
      lead: 'O WhatsApp bloqueia números que parecem spam. Por isso a Zapvu manda no ritmo de uma pessoa, e não de uma máquina.',
      b: [['Como funciona', ['Entre uma mensagem e outra, ela espera um tempo aleatório. O padrão é de 1,5 a 4 segundos, e você ajusta o intervalo por número.', 'Antes de cada envio, aparece “digitando…” para quem vai receber.']],
          ['Importante', ['Isso reduz o risco de bloqueio, mas não elimina. Mande só para quem espera falar com você.']]] },
    { i: 'dup', t: ['Sem', 'mensagem duplicada'], s: 'Seu sistema repetiu a chamada? A mensagem sai uma vez só.',
      lead: 'Sistemas repetem chamadas: a rede cai, o tempo esgota, alguém clica duas vezes. A Zapvu percebe a repetição.',
      b: [['Como funciona', ['Mande uma chave de idempotência no cabeçalho Idempotency-Key, por exemplo o número do pedido.', 'Se a mesma chave chegar de novo, a Zapvu devolve a mensagem que já existe e não envia outra.']]],
      code: 'POST /v1/messages/text\nIdempotency-Key: pedido-4821' },
    { i: 'nove', t: ['Corrige', 'o 9º dígito'], s: 'Número brasileiro com ou sem o 9? A Zapvu acerta sozinha.',
      lead: 'Muito cadastro no Brasil ainda tem celular sem o 9 na frente. Mandar para o número errado é mensagem perdida.',
      b: [['Como funciona', ['A Zapvu normaliza números brasileiros antes de enviar, incluindo o 9º dígito.', 'Você manda o número do jeito que está no seu cadastro.']]],
      code: '55 31 8888-7777  →  55 31 9 8888-7777' },
    { i: 'hook', t: ['Webhooks', 'assinados'], s: 'Tudo que acontece no número chega no seu sistema, com assinatura.',
      lead: 'Você informa um endereço e a Zapvu avisa o seu sistema de tudo que acontece, na hora.',
      b: [['O que chega', ['Mensagens recebidas.', 'Confirmação de entrega e de leitura.', 'Resultado de cada envio.', 'Mudanças de conexão, QR code e chamadas.']],
          ['Segurança e entrega', ['Cada aviso vai assinado com HMAC-SHA256, para você ter certeza de que veio da Zapvu.', 'Se o seu sistema estiver fora do ar, ela tenta de novo até 12 vezes ao longo de cerca de 1 hora.', 'Os eventos ficam guardados e podem ser reenviados.']]] },
    { i: 'banco', t: ['Nenhuma', 'mensagem perdida'], s: 'A Zapvu só confirma ao WhatsApp depois de gravar a mensagem.',
      lead: 'Quando chega uma mensagem, a ordem das coisas importa. A Zapvu grava primeiro e só depois confirma o recebimento ao WhatsApp.',
      b: [['Por que isso importa', ['Se algo falhar antes de gravar, o WhatsApp não recebeu a confirmação e entrega a mensagem de novo.', 'Assim, nenhuma mensagem recebida se perde no caminho.']]] },
    { i: 'volta', t: ['Avisa', 'e reconecta'], s: 'Caiu? Ela volta sozinha. Foi banido? Você fica sabendo na hora.',
      lead: 'Conexão cai. A diferença é o que acontece depois.',
      b: [['Como funciona', ['Se a conexão cair, a Zapvu reconecta sozinha, com espera crescente entre as tentativas.', 'Se o número foi desconectado, banido ou aberto em outro lugar, ela avisa por webhook em vez de ficar tentando sem parar.']]] },
    { i: 'regras', t: ['Regras', 'por número'], s: 'Cada número com a sua configuração.',
      lead: 'Cada número conectado tem as próprias regras. Uma loja pode recusar ligações e outra não, por exemplo.',
      b: [['O que dá para configurar', ['Rejeitar chamadas.', 'Ignorar grupos.', 'Incluir status.', 'Marcar como lido.', 'Simular “digitando”.', 'Intervalo entre envios.']]] },
    { i: 'tipos', t: ['Todo tipo', 'de mensagem'], s: 'Texto, mídia, localização e reação, para enviar e receber.',
      lead: 'Seu sistema manda e recebe o mesmo que uma pessoa manda pelo WhatsApp.',
      b: [['Tipos', ['Texto, com resposta e menções.', 'Imagem, vídeo e documento.', 'Áudio e áudio de voz.', 'Localização.', 'Reações.']]] },
    { i: 'leve', t: ['Leve', 'de verdade'], s: 'Cerca de 16 MB de memória por número conectado, medido em produção.',
      lead: 'A Zapvu é um único programa em Go que roda vários números ao mesmo tempo, gastando pouco.',
      b: [['Por que gasta pouco', ['Não baixa o histórico antigo de conversas.', 'Processa mídia em fluxo, sem carregar o arquivo inteiro na memória.', 'Descarta eventos que não servem, como “online” e “digitando” de outras pessoas.', 'Tem limite de memória automático.']],
          ['Para crescer', ['Os números podem ser divididos entre vários servidores usando o mesmo banco. Uma trava impede que o mesmo número abra em dois lugares.']]] },
    { i: 'cadeado', t: ['Segura', 'por padrão'], s: 'Chaves com escopo, painel com papéis e auditoria de 90 dias.',
      lead: 'Cada acesso passa por camadas, do servidor até o seu número.',
      b: [['API', ['Chaves zv_… das quais o banco guarda só o hash.', 'Escopo admin, para quem gerencia vários números, ou escopo de instância, que não enxerga os outros.']],
          ['Painel', ['Senha com argon2id e sessão protegida contra CSRF.', 'Três papéis: admin, operador e visualizador.']],
          ['Proteções', ['Limite de requisições e de tentativas de login.', 'Webhooks e downloads para endereços internos são bloqueados.', 'Só as portas 80 e 443 ficam abertas, com firewall e fail2ban.', 'Auditoria de 90 dias e backup diário do banco com 7 dias de retenção.']]] },
  ];

  const svg = (k) => `<svg viewBox="0 0 24 24">${I[k]}</svg>`;
  const pad = (n) => String(n).padStart(2, '0');
  sec.querySelector('[data-fl-total]').textContent = pad(F.length);

  /* monta os cards */
  const cards = F.map((f, idx) => {
    const li = document.createElement('li');
    li.className = 'fl-card';
    li.dataset.h = idx % 3; // varia o tom da luz: 0 lima, 1 amarelado, 2 verde
    li.innerHTML = `<button type="button" class="fl-in" aria-label="${f.t.join(' ')}: ver como funciona">
      <span class="fl-top" aria-hidden="true"><span class="fl-ico">${svg(f.i)}</span><span class="fl-num">${pad(idx + 1)}</span></span>
      <span class="fl-txt"><b>${f.t[0]} <span>${f.t[1]}</span></b><small>${f.s}</small></span>
    </button>`;
    fan.appendChild(li);
    li.querySelector('button').addEventListener('click', () => {
      if (moved) return;
      setActive(idx);
      open(idx);
    });
    return li;
  });

  /* leque: cada card gira em volta de um ponto bem abaixo, como cartas na mão */
  let active = 0;
  function layout() {
    const narrow = innerWidth < 700;
    const step = narrow ? 11 : 7;   // graus entre cartas
    const show = narrow ? 1 : 3;    // quantas de cada lado
    cards.forEach((c, i) => {
      let k = i - active;
      if (k > F.length / 2) k -= F.length;
      if (k < -F.length / 2) k += F.length;
      const a = Math.abs(k);
      c.style.transform = `rotate(${k * step}deg) translateY(${a * 6}px)`;
      c.style.zIndex = String(50 - a);
      c.style.opacity = a > show ? '0' : '1';
      c.style.pointerEvents = a > show ? 'none' : '';
      c.style.setProperty('--dim', String(Math.min(a * 0.22, 0.6)));
      c.classList.toggle('is-active', k === 0);
      c.querySelector('button').tabIndex = k === 0 ? 0 : -1;
    });
    nEl.textContent = pad(active + 1);
  }
  function setActive(i) { active = (i + F.length) % F.length; layout(); }

  sec.querySelector('[data-fl-prev]').addEventListener('click', () => setActive(active - 1));
  sec.querySelector('[data-fl-next]').addEventListener('click', () => setActive(active + 1));
  stage.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') { setActive(active - 1); cards[active].querySelector('button').focus(); }
    if (e.key === 'ArrowRight') { setActive(active + 1); cards[active].querySelector('button').focus(); }
  });

  /* arrastar para girar */
  let x0 = null, moved = false;
  stage.addEventListener('pointerdown', (e) => { x0 = e.clientX; moved = false; });
  addEventListener('pointerup', (e) => {
    if (x0 === null) return;
    const dx = e.clientX - x0; x0 = null;
    if (Math.abs(dx) > 40) { moved = true; setActive(active + (dx < 0 ? 1 : -1)); setTimeout(() => { moved = false; }, 50); }
  });
  addEventListener('resize', layout, { passive: true });
  layout();

  /* janela no estilo carrossel: card grande no centro, vizinhos atrás dos lados, pílula de pontos */
  let cur = 0;
  const esc = (t) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;');
  const card = $m('[data-fm-card]');
  const sidePrev = $m('[data-fm-prev]'), sideNext = $m('[data-fm-next]');
  const dotsBox = $m('[data-fm-dots]');
  const dots = F.map((f, k) => {
    const d = document.createElement('button');
    d.type = 'button'; d.setAttribute('role', 'tab'); d.setAttribute('aria-label', f.t.join(' '));
    d.addEventListener('click', () => go(k));
    dotsBox.appendChild(d);
    return d;
  });
  const mini = (f) => `<span class="fm-mini-ico">${svg(f.i)}</span><b>${f.t[0]} <span>${f.t[1]}</span></b>`;

  function fill(i, dir = 0) {
    cur = (i + F.length) % F.length;
    const f = F[cur];
    $m('[data-fl-m-ico]').innerHTML = svg(f.i);
    $m('[data-fl-m-k]').textContent = `${pad(cur + 1)} / ${pad(F.length)}`;
    $m('[data-fl-m-title]').innerHTML = `${f.t[0]} <span>${f.t[1]}</span>`;
    $m('[data-fl-m-lead]').textContent = f.lead;
    $m('[data-fl-m-body]').innerHTML =
      f.b.map(([h, items]) => `<section><h4>${h}</h4><ul>${items.map((x) => `<li>${esc(x)}</li>`).join('')}</ul></section>`).join('') +
      (f.code ? `<pre><code>${esc(f.code)}</code></pre>` : '');
    const pv = F[(cur - 1 + F.length) % F.length], nx = F[(cur + 1) % F.length];
    sidePrev.innerHTML = mini(pv); sideNext.innerHTML = mini(nx);
    sidePrev.dataset.h = (cur - 1 + F.length) % 3; sideNext.dataset.h = (cur + 1) % 3;
    modal.dataset.h = cur % 3;
    dots.forEach((d, k) => d.setAttribute('aria-selected', k === cur ? 'true' : 'false'));
    card.querySelector('.fm-scroll').scrollTop = 0;
    if (dir) {
      card.classList.remove('from-l', 'from-r'); void card.offsetWidth;
      card.classList.add(dir > 0 ? 'from-r' : 'from-l');
    }
  }
  function go(i) { const d = i > cur ? 1 : -1; fill(i, d); setActive(cur); }
  function open(i) { fill(i); if (!modal.open) modal.showModal(); }

  $m('[data-fl-close]').addEventListener('click', () => modal.close());
  sidePrev.addEventListener('click', () => { fill(cur - 1, -1); setActive(cur); });
  sideNext.addEventListener('click', () => { fill(cur + 1, 1); setActive(cur); });
  modal.addEventListener('click', (e) => { if (e.target === modal || e.target.classList.contains('fm-stage')) modal.close(); });
  modal.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') { fill(cur - 1, -1); setActive(cur); }
    if (e.key === 'ArrowRight') { fill(cur + 1, 1); setActive(cur); }
  });
  /* arrastar o card grande */
  let mx0 = null;
  card.addEventListener('pointerdown', (e) => { mx0 = e.clientX; });
  card.addEventListener('pointerup', (e) => {
    if (mx0 === null) return;
    const dx = e.clientX - mx0; mx0 = null;
    if (Math.abs(dx) > 50) { fill(cur + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1); setActive(cur); }
  });
})();
