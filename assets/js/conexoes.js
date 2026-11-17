// Liga os ícones e os avisos ao símbolo do Zapvu, como uma rede.
// Um pulso de luz sai de um tipo de mensagem, passa pelo símbolo e acende um aviso:
// é o caminho que a mensagem faz na API (entra, é processada, vira evento).
// As linhas acompanham os ícones enquanto eles flutuam, e passar o mouse num ícone
// manda o pulso dele na hora.
(() => {
  const box = document.querySelector('.hero-visual');
  if (!box) return;
  const nodes = [...box.querySelectorAll('.node')];
  const chips = [...box.querySelectorAll('.chip')];
  const items = [...nodes, ...chips];
  const NS = 'http://www.w3.org/2000/svg';
  const el = (tag, cls) => { const e = document.createElementNS(NS, tag); if (cls) e.setAttribute('class', cls); return e; };

  const svg = el('svg', 'links');
  svg.setAttribute('aria-hidden', 'true');
  box.insertBefore(svg, box.querySelector('.node'));

  // uma linha por peça; a cauda e o ponto do pulso ficam por cima de todas
  const paths = new Map();
  items.forEach((it) => {
    const p = el('path', it.classList.contains('chip') ? 'link link-out' : 'link');
    svg.appendChild(p);
    paths.set(it, p);
  });
  const ripple = el('circle', 'ripple');
  const tail = el('path', 'tail');
  const dot = el('circle', 'pulse');
  dot.setAttribute('r', '3.5');
  svg.append(ripple, tail, dot);

  let W = 0, H = 0, r0 = 0;
  function measure() {
    W = box.clientWidth; H = box.clientHeight;
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
    r0 = Math.min(W, H) * 0.17; // a linha começa na borda do símbolo, não no meio dele
    ripple.setAttribute('cx', W / 2); ripple.setAttribute('cy', H / 2); ripple.setAttribute('r', r0);
  }
  new ResizeObserver(measure).observe(box);
  measure();

  // redesenha as curvas a partir da posição real de cada peça (que flutua)
  function draw() {
    const b = box.getBoundingClientRect();
    const cx = W / 2, cy = H / 2;
    items.forEach((it, i) => {
      const r = it.getBoundingClientRect();
      const px = r.left - b.left + r.width / 2, py = r.top - b.top + r.height / 2;
      const dx = px - cx, dy = py - cy;
      const len = Math.hypot(dx, dy) || 1;
      const ux = dx / len, uy = dy / len;
      const sx = cx + ux * r0, sy = cy + uy * r0;
      // termina na borda da peça (o pulso não aparece por dentro do vidro)
      const hw = r.width / 2 + 3, hh = r.height / 2 + 3;
      const te = Math.min(Math.abs(ux) > 1e-3 ? hw / Math.abs(ux) : Infinity, Math.abs(uy) > 1e-3 ? hh / Math.abs(uy) : Infinity);
      const ex = px - ux * te, ey = py - uy * te;
      // curva leve, alternando o lado
      const bend = (i % 2 ? 1 : -1) * (len - r0 - te) * 0.14;
      const mx = (sx + ex) / 2 - uy * bend, my = (sy + ey) / 2 + ux * bend;
      paths.get(it).setAttribute('d', `M${sx.toFixed(1)} ${sy.toFixed(1)} Q${mx.toFixed(1)} ${my.toFixed(1)} ${ex.toFixed(1)} ${ey.toFixed(1)}`);
    });
  }

  // etiqueta de vidro com o nome do ícone
  nodes.forEach((n) => { if (!n.dataset.tip) return; const t = document.createElement('span'); t.className = 'tip'; t.textContent = n.dataset.tip; n.appendChild(t); });

  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let visible = true;
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; }).observe(box);

  // linhas seguem as peças a cada quadro (só enquanto o hero está na tela)
  (function follow() {
    requestAnimationFrame(follow);
    if (visible && !document.hidden) draw();
  })();

  // passar o mouse acende a ligação
  items.forEach((it) => {
    it.addEventListener('pointerenter', () => paths.get(it).classList.add('is-hover'));
    it.addEventListener('pointerleave', () => paths.get(it).classList.remove('is-hover'));
  });

  if (reduce) return;

  const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const TAIL = 46;
  let token = 0; // muda quando um pulso novo interrompe o anterior

  function travel(path, reverse, ms, my) {
    return new Promise((done) => {
      path.classList.add('is-on');
      dot.classList.add('is-on'); tail.classList.add('is-on');
      const t0 = performance.now();
      (function step(now) {
        if (my !== token) { path.classList.remove('is-on'); return done(false); }
        const L = path.getTotalLength();
        const t = Math.min(1, (now - t0) / ms);
        const pos = (reverse ? 1 - ease(t) : ease(t)) * L;
        const pt = path.getPointAtLength(pos);
        dot.setAttribute('cx', pt.x); dot.setAttribute('cy', pt.y);
        // cauda: um trecho da própria curva atrás do ponto
        tail.setAttribute('d', path.getAttribute('d'));
        const a = reverse ? pos : Math.max(0, pos - TAIL);
        const len = reverse ? Math.min(TAIL, L - pos) : pos - a;
        tail.style.strokeDasharray = `0 ${a} ${len} ${L}`;
        if (t < 1) requestAnimationFrame(step);
        else { path.classList.remove('is-on'); done(true); }
      })(t0);
    });
  }
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  const ping = (it) => { it.classList.remove('ping'); void it.offsetWidth; it.classList.add('ping'); setTimeout(() => it.classList.remove('ping'), 1100); };
  const hit = () => {
    ripple.classList.remove('is-on'); void ripple.getBoundingClientRect(); ripple.classList.add('is-on');
    box.dispatchEvent(new Event('zapvu:hit'));
  };
  const off = () => { dot.classList.remove('is-on'); tail.classList.remove('is-on'); };

  // ícone -> símbolo -> aviso
  async function send(from, to) {
    const my = ++token;
    ping(from);
    if (!(await travel(paths.get(from), true, 700, my))) return false;
    hit();
    await wait(160);
    if (my !== token) return false;
    if (!(await travel(paths.get(to), false, 700, my))) return false;
    off();
    ping(to);
    return true;
  }

  // qual aviso cada ícone acende: mensagens viram "Envio"; o resto alterna
  const target = (n, i) => (chips.length > 1 ? chips[1 + (i % (chips.length - 1))] : chips[0]);

  let hovering = false;
  nodes.forEach((n, i) => {
    n.addEventListener('pointerenter', () => { hovering = true; send(n, target(n, i)); });
    n.addEventListener('pointerleave', () => { hovering = false; });
  });

  let k = 0;
  (async function loop() {
    await wait(1400);
    for (;;) {
      if (!visible || document.hidden || hovering) { await wait(400); continue; }
      const i = (k * 5 + 1) % nodes.length; // pula pelos ícones sem repetir em sequência
      const to = chips[k % chips.length];
      k++;
      const ok = await send(nodes[i], to);
      await wait(ok ? 1100 : 1600);
    }
  })();
})();
