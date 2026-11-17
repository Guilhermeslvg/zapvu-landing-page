/* Funcionalidades: as telinhas dos cards.
   Tudo só anda com a seção na tela (classe .is-live na grade). */
(() => {
  const root = document.getElementById('funcionalidades');
  const grid = root && root.querySelector('.fc-grid');
  if (!grid) return;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));

  let live = false;
  new IntersectionObserver(([e]) => {
    live = e.isIntersecting;
    grid.classList.toggle('is-live', live);
  }, { threshold: 0.15 }).observe(grid);
  const idle = () => !live || document.hidden;

  /* chaves: dá para clicar, e o cabeçalho confirma */
  const saved = grid.querySelector('[data-saved]');
  let savedT;
  grid.querySelectorAll('.d-tg .tg').forEach((b) => {
    b.addEventListener('click', () => {
      b.setAttribute('aria-checked', b.getAttribute('aria-checked') === 'true' ? 'false' : 'true');
      if (!saved) return;
      saved.textContent = 'salvo';
      saved.classList.add('on');
      clearTimeout(savedT);
      savedT = setTimeout(() => { saved.textContent = 'configurações'; saved.classList.remove('on'); }, 1400);
    });
  });

  /* cards de luz seguem o mouse */
  grid.querySelectorAll('.fc-intro, .fc-outro').forEach((c) => {
    c.addEventListener('pointermove', (e) => {
      const r = c.getBoundingClientRect();
      c.style.setProperty('--mx', ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
      c.style.setProperty('--my', ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
    });
    c.addEventListener('pointerleave', () => { c.style.setProperty('--mx', 0); c.style.setProperty('--my', 0); });
  });

  /* barra de disponibilidade começa cheia */
  const up = grid.querySelector('[data-up]');
  const BARS = 22;
  if (up) for (let i = 0; i < BARS; i++) { const b = document.createElement('i'); b.className = 'on'; up.appendChild(b); }

  if (reduce) {
    grid.querySelector('.q-list li')?.classList.add('sent');
    grid.querySelector('[data-hook]')?.classList.add('ok');
    return;
  }

  /* 1. fila: a primeira sai com os dois tiques, as outras sobem, entra uma nova */
  const q = grid.querySelector('[data-queue]');
  if (q) {
    const pool = [
      ['J', 'João', 'Seu código de acesso: 4821'],
      ['M', 'Marina', 'Pedido #4821 separado'],
      ['P', 'Paulo', 'Segue o link de pagamento'],
      ['C', 'Carla', 'Entrega prevista para hoje'],
      ['R', 'Rafael', 'Obrigado pela compra!'],
      ['A', 'Ana', 'Consulta confirmada'],
    ];
    const tk = q.querySelector('.tk').outerHTML;
    let k = 0;
    (async function loop() {
      for (;;) {
        await wait(1500);
        if (idle()) continue;
        const first = q.firstElementChild;
        first.classList.add('sent');
        await wait(700);
        first.classList.add('out');
        await wait(380);
        first.remove();
        const [i, n, t] = pool[k++ % pool.length];
        const li = document.createElement('li');
        li.className = 'in';
        li.innerHTML = `<b class="av">${i}</b><span class="q-t"><b>${n}</b><small>${t}</small></span>${tk}`;
        q.appendChild(li);
        requestAnimationFrame(() => requestAnimationFrame(() => li.classList.remove('in')));
      }
    })();
  }

  /* 2. webhook: assina e o seu sistema responde 200 */
  const hook = grid.querySelector('[data-hook]');
  if (hook) {
    const scr = hook.closest('.sc-code');
    (async function loop() {
      for (;;) {
        if (idle()) { await wait(500); continue; }
        hook.textContent = 'assinando…'; hook.classList.remove('ok'); scr.classList.remove('ok');
        await wait(1300);
        hook.textContent = '200 OK ✓'; hook.classList.add('ok'); scr.classList.add('ok');
        await wait(2400);
      }
    })();
  }

  /* 5. tipos: um balão por vez, e o nome acende embaixo */
  const types = grid.querySelector('.sc-types');
  if (types) {
    const bs = [...types.querySelectorAll('.ty-b')];
    const chips = [...types.querySelectorAll('.ty-chips li')];
    let i = 0;
    const show = (k) => {
      bs.forEach((b, j) => b.classList.toggle('on', j === k));
      chips.forEach((c) => c.classList.toggle('on', c.textContent === bs[k].dataset.t));
    };
    show(0);
    setInterval(() => { if (idle()) return; i = (i + 1) % bs.length; show(i); }, 1600);
  }

  /* 8. conexão: conectado -> caiu (webhook avisa) -> reconectando -> conectado */
  const conn = grid.querySelector('.sc-conn');
  if (conn && up) {
    const txt = conn.querySelector('[data-conn-txt]');
    const seq = [['on', 'conectado', 6], ['off', 'desconectado', 3], ['retry', 'reconectando', 3]];
    let s = 0, n = 0;
    setInterval(() => {
      if (idle()) return;
      const [st, label, len] = seq[s];
      conn.dataset.s = st; txt.textContent = label;
      const b = document.createElement('i'); b.className = st;
      up.appendChild(b);
      if (up.children.length > BARS) up.firstElementChild.remove();
      if (++n >= len) { n = 0; s = (s + 1) % seq.length; }
    }, 450);
  }
})();
