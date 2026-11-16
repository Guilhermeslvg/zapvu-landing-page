// Liga os ícones e os avisos ao símbolo do Zapvu, como uma rede.
// Um pulso de luz sai de um tipo de mensagem, passa pelo símbolo e acende um aviso:
// é o caminho que a mensagem faz na API (entra, é processada, vira evento).
(() => {
  const box = document.querySelector('.hero-visual');
  if (!box) return;
  const nodes = [...box.querySelectorAll('.node')];
  const chips = [...box.querySelectorAll('.chip')];
  const NS = 'http://www.w3.org/2000/svg';

  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('class', 'links');
  svg.setAttribute('aria-hidden', 'true');
  box.insertBefore(svg, box.querySelector('.node'));

  const dot = document.createElementNS(NS, 'circle');
  dot.setAttribute('class', 'pulse');
  dot.setAttribute('r', '4');

  let paths = new Map(); // elemento -> path

  function centerOf(el) {
    const b = box.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    return { x: r.left - b.left + r.width / 2, y: r.top - b.top + r.height / 2 };
  }

  function build() {
    const w = box.clientWidth, h = box.clientHeight;
    svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
    svg.textContent = '';
    paths = new Map();
    const c = { x: w / 2, y: h / 2 };
    const r0 = Math.min(w, h) * 0.16; // começa na borda do símbolo, não no meio dele

    [...nodes, ...chips].forEach((el, i) => {
      const p = centerOf(el);
      const dx = p.x - c.x, dy = p.y - c.y;
      const len = Math.hypot(dx, dy) || 1;
      const ux = dx / len, uy = dy / len;
      const sx = c.x + ux * r0, sy = c.y + uy * r0;
      // curva leve: ponto de controle deslocado na perpendicular, alternando o lado
      const side = i % 2 ? 1 : -1;
      const mx = (sx + p.x) / 2 - uy * len * 0.12 * side;
      const my = (sy + p.y) / 2 + ux * len * 0.12 * side;
      const path = document.createElementNS(NS, 'path');
      path.setAttribute('d', `M${sx.toFixed(1)} ${sy.toFixed(1)} Q${mx.toFixed(1)} ${my.toFixed(1)} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`);
      path.setAttribute('class', el.classList.contains('chip') ? 'link link-out' : 'link');
      svg.appendChild(path);
      paths.set(el, path);
    });

    svg.appendChild(dot);
  }

  new ResizeObserver(build).observe(box);
  build();

  // passar o mouse destaca a ligação
  [...nodes, ...chips].forEach((el) => {
    el.addEventListener('pointerenter', () => paths.get(el)?.classList.add('is-on'));
    el.addEventListener('pointerleave', () => paths.get(el)?.classList.remove('is-on'));
  });

  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const ease = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
  function travel(path, reverse, ms) {
    return new Promise((done) => {
      const L = path.getTotalLength();
      path.classList.add('is-on');
      dot.classList.add('is-on');
      const t0 = performance.now();
      (function step(now) {
        const t = Math.min(1, (now - t0) / ms);
        const k = ease(t);
        const pt = path.getPointAtLength(reverse ? L * (1 - k) : L * k);
        dot.setAttribute('cx', pt.x); dot.setAttribute('cy', pt.y);
        if (t < 1) requestAnimationFrame(step);
        else { path.classList.remove('is-on'); dot.classList.remove('is-on'); done(); }
      })(t0);
    });
  }
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  const ping = (el) => { el.classList.remove('ping'); void el.offsetWidth; el.classList.add('ping'); setTimeout(() => el.classList.remove('ping'), 1100); };

  let visible = true;
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; }).observe(box);

  let n = 0;
  (async function loop() {
    await wait(1400);
    for (;;) {
      if (!visible || document.hidden) { await wait(500); continue; }
      const from = nodes[(n * 5 + 1) % nodes.length]; // pula pelos ícones sem repetir em sequência
      const to = chips[n % chips.length];
      n++;
      if (!paths.get(from) || !paths.get(to)) { await wait(500); continue; }
      ping(from);
      await travel(paths.get(from), true, 750);   // do ícone até o símbolo
      await wait(180);
      await travel(paths.get(to), false, 750);    // do símbolo até o aviso
      ping(to);
      await wait(900);
    }
  })();
})();
