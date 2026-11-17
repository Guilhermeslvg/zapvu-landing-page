/* Motor de fluxo no estilo editor de automação: blocos ligados por linhas curvas,
   um pulso de luz corre pela linha e o bloco acende quando a execução chega nele.
   Uso: Fluxo(container, { edges, seqs, onStep })
   - container: elemento com blocos [data-wf="id"] e um <svg class="wf-svg"> vazio
   - edges: { id: [de, para, tipo] }  tipo: 'h' (lado a lado), 'v' (de cima para baixo), 'u' (volta por baixo)
   - seqs: lista de sequências; cada passo: { e: 'id', rev: true? } ou { n: 'id', badge: 'texto' } ou { wait: ms }
   As linhas são recalculadas a partir da posição real dos blocos (responsivo). */
window.Fluxo = function Fluxo(box, cfg) {
  const NS = 'http://www.w3.org/2000/svg';
  const svg = box.querySelector('.wf-svg');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const node = (id) => box.querySelector(`[data-wf="${id}"]`);
  const mk = (tag, cls) => { const e = document.createElementNS(NS, tag); if (cls) e.setAttribute('class', cls); return e; };

  const defs = mk('defs');
  defs.innerHTML = '<marker id="wf-arrow-' + (box.id || Math.random().toString(36).slice(2)) + '" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M1 1 L8 5 L1 9" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></marker>';
  svg.appendChild(defs);
  const arrowId = defs.querySelector('marker').id;

  const paths = {}, ports = {};
  Object.keys(cfg.edges).forEach((id) => {
    const p = mk('path', 'wf-line'); p.setAttribute('marker-end', `url(#${arrowId})`); svg.appendChild(p); paths[id] = p;
    ports[id] = [mk('circle', 'wf-port'), mk('circle', 'wf-port')];
    ports[id].forEach((c) => { c.setAttribute('r', '3.2'); svg.appendChild(c); });
  });
  const tail = mk('path', 'wf-tail'); svg.appendChild(tail);
  const dot = mk('circle', 'wf-dot'); dot.setAttribute('r', '4'); svg.appendChild(dot);

  function rect(el) {
    const b = box.getBoundingClientRect(), r = el.querySelector('.wf-tile').getBoundingClientRect();
    return { l: r.left - b.left, r: r.right - b.left, t: r.top - b.top, b: r.bottom - b.top, cx: r.left - b.left + r.width / 2, cy: r.top - b.top + r.height / 2 };
  }
  function draw() {
    const w = box.clientWidth, h = box.clientHeight;
    svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
    Object.entries(cfg.edges).forEach(([id, [a, z, kind]]) => {
      const A = rect(node(a)), Z = rect(node(z));
      let d, s, e;
      if (kind === 'v') {
        s = [A.cx, A.b + 4]; e = [Z.cx, Z.t - 6];
        const my = (s[1] + e[1]) / 2;
        d = `M${s[0]} ${s[1]} C ${s[0]} ${my}, ${e[0]} ${my}, ${e[0]} ${e[1]}`;
      } else if (kind === 'u') {
        s = [A.cx, A.b + 4]; e = [Z.cx, Z.b + 6];
        const dy = Math.max(A.b, Z.b) + Math.abs(A.cx - Z.cx) * 0.32;
        d = `M${s[0]} ${s[1]} C ${s[0]} ${dy}, ${e[0]} ${dy}, ${e[0]} ${e[1]}`;
      } else {
        s = [A.r + 4, A.cy]; e = [Z.l - 6, Z.cy];
        const k = Math.max(30, (e[0] - s[0]) * 0.5);
        d = `M${s[0]} ${s[1]} C ${s[0] + k} ${s[1]}, ${e[0] - k} ${e[1]}, ${e[0]} ${e[1]}`;
      }
      paths[id].setAttribute('d', d);
      ports[id][0].setAttribute('cx', s[0]); ports[id][0].setAttribute('cy', s[1]);
      ports[id][1].setAttribute('cx', e[0] + (kind === 'h' ? 2 : 0)); ports[id][1].setAttribute('cy', e[1] + (kind === 'h' ? 0 : 2));
    });
  }
  new ResizeObserver(draw).observe(box);
  draw();

  let token = 0, visible = false;
  const wait = (ms, my) => new Promise((r) => setTimeout(() => r(my === token), ms));
  const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

  function travel(id, rev, ms, my) {
    return new Promise((done) => {
      const p = paths[id];
      p.classList.add('is-on');
      dot.classList.add('is-on'); tail.classList.add('is-on');
      tail.setAttribute('d', p.getAttribute('d'));
      box.classList.toggle('wf-back', !!rev);
      const L = p.getTotalLength(), T = Math.min(70, L * 0.45), t0 = performance.now();
      (function step(now) {
        if (my !== token) { p.classList.remove('is-on'); return done(false); }
        const t = Math.min(1, (now - t0) / ms), k = ease(t);
        const pos = rev ? L * (1 - k) : L * k;
        const pt = p.getPointAtLength(pos);
        dot.setAttribute('cx', pt.x); dot.setAttribute('cy', pt.y);
        const a = rev ? pos : Math.max(0, pos - T);
        const len = rev ? Math.min(T, L - pos) : pos - a;
        tail.style.strokeDasharray = `0 ${a} ${len} ${L + 10}`;
        if (t < 1) requestAnimationFrame(step);
        else { setTimeout(() => p.classList.remove('is-on'), 250); done(true); }
      })(t0);
    });
  }
  function lightNode(id, badge) {
    const n = node(id);
    n.classList.remove('is-run'); void n.offsetWidth; n.classList.add('is-run');
    if (badge) {
      let b = n.querySelector('.wf-badge');
      if (!b) { b = document.createElement('span'); b.className = 'wf-badge'; n.appendChild(b); }
      b.textContent = badge; b.classList.remove('is-on'); void b.offsetWidth; b.classList.add('is-on');
      setTimeout(() => b.classList.remove('is-on'), 1600);
    }
    setTimeout(() => n.classList.remove('is-run'), 1300);
  }

  async function run(seq) {
    const my = ++token;
    for (const st of seq) {
      if (my !== token) return false;
      if (st.n) { lightNode(st.n, st.badge); if (cfg.onStep) cfg.onStep(st); if (!(await wait(st.hold || 260, my))) return false; }
      else if (st.e) { if (!(await travel(st.e, st.rev, st.ms || 850, my))) return false; }
      else if (st.wait) { if (!(await wait(st.wait, my))) return false; }
    }
    dot.classList.remove('is-on'); tail.classList.remove('is-on');
    return true;
  }

  let k = 0, paused = false;
  async function loop() {
    for (;;) {
      if (!visible || document.hidden || paused || reduce) { await new Promise((r) => setTimeout(r, 400)); continue; }
      const seq = cfg.seqs[k++ % cfg.seqs.length];
      const ok = await run(seq);
      await new Promise((r) => setTimeout(r, ok ? 900 : 300));
    }
  }
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { threshold: 0.2 }).observe(box);
  loop();

  return {
    run: (seq) => { paused = true; return run(seq).then((ok) => { setTimeout(() => { paused = false; }, 1200); return ok; }); },
    stop: () => { token++; },
    redraw: draw,
  };
};
