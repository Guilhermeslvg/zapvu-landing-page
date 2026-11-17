/* Primeiros passos, Arquitetura, Planos e Dúvidas. */

/* ---------- Primeiros passos ----------
   A rota abaixo é a mesma que a landing já mostra (POST /v1/messages/text,
   Bearer + Idempotency-Key, resposta 202 com id e status).
   ATENÇÃO: confirme com o código do backend antes de publicar. Se mudar, troque só aqui. */
const ZAPVU_API = {
  base: 'https://api.exemplo.dev/v1', // endereço de demonstração, não é a API real
  enviarTexto: { metodo: 'POST', rota: '/messages/text' },
};

(() => {
  const root = document.querySelector('[data-ps]');
  if (!root) return;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const steps = [...root.querySelectorAll('[data-ps-go]')];
  const panes = steps.map((b) => document.getElementById(b.getAttribute('aria-controls')));
  const path = root.querySelector('[data-ps-path]');
  const PATHS = ['painel.zapvu · instâncias', 'painel.zapvu · conexão', 'painel.zapvu · chaves de API', 'seu-projeto · enviar-mensagem'];
  let cur = 0, timers = [];
  const later = (fn, ms) => timers.push(setTimeout(fn, reduce ? 0 : ms));

  function go(i, focus) {
    cur = i;
    timers.forEach(clearTimeout); timers = [];
    steps.forEach((b, k) => {
      b.setAttribute('aria-selected', k === i ? 'true' : 'false');
      b.tabIndex = k === i ? 0 : -1;
      b.closest('li').classList.toggle('done', k < i);
    });
    panes.forEach((p, k) => { p.hidden = k !== i; });
    path.textContent = PATHS[i];
    root.style.setProperty('--ps-p', String(i / (steps.length - 1)));
    if (focus) steps[i].focus();
    const cnt = root.querySelector('[data-ps-count]'); if (cnt) cnt.textContent = `Passo ${i + 1} de ${steps.length}`;
    const nx = root.querySelector('[data-ps-next]');
    if (nx) nx.firstChild.textContent = i === steps.length - 1 ? 'Ver de novo ' : 'Próximo passo ';
    steps.forEach((b, k) => b.closest('li').classList.toggle('is-next', k === i + 1));
    play(i);
  }

  function typeInto(el, txt, speed = 55) {
    el.textContent = '';
    if (reduce) { el.textContent = txt; return; }
    [...txt].forEach((ch, k) => later(() => { el.textContent += ch; }, k * speed));
  }

  function play(i) {
    if (i === 0) {
      const name = root.querySelector('[data-ps-type]');
      const btn = root.querySelector('[data-ps-create]');
      const ok = root.querySelector('[data-ps-created]');
      btn.classList.remove('is-press'); ok.classList.remove('is-on');
      typeInto(name, name.dataset.psType);
      later(() => btn.classList.add('is-press'), 1300);
      later(() => ok.classList.add('is-on'), 1650);
    }
    if (i === 1) {
      const st = root.querySelector('[data-ps-paired]');
      st.classList.remove('is-done'); st.querySelector('span').textContent = 'pareando…';
      later(() => { st.classList.add('is-done'); st.querySelector('span').textContent = 'conectado · minha-instancia'; }, 2600);
    }
    if (i === 2) {
      // chave de demonstração: gerada na hora, não é uma chave real
      const abc = 'abcdefghijkmnpqrstuvwxyz23456789';
      let k = 'zv_';
      for (let n = 0; n < 24; n++) k += abc[Math.floor(Math.random() * abc.length)];
      typeInto(root.querySelector('[data-ps-key]'), k, 28);
    }
  }

  steps.forEach((b, k) => b.addEventListener('click', () => go(k)));
  root.querySelector('[data-ps-next]').addEventListener('click', () => go((cur + 1) % steps.length));
  root.querySelector('.ps-steps').addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') { e.preventDefault(); go((cur + 1) % steps.length, true); }
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') { e.preventDefault(); go((cur + steps.length - 1) % steps.length, true); }
  });

  /* código: quatro linguagens com a mesma requisição */
  const URL_ = ZAPVU_API.base + ZAPVU_API.enviarTexto.rota;
  const CODE = {
    js: `// Exemplo ilustrativo: endereço e chave de demonstração
const res = await fetch("${URL_}", {
  method: "POST",
  headers: {
    "Authorization": \`Bearer \${process.env.SUA_CHAVE_DEMO}\`,
    "Content-Type": "application/json",
    "Idempotency-Key": "pedido-4821"
  },
  body: JSON.stringify({
    instance: "minha-instancia",
    to: "5511999999999",
    text: "Olá! Esta é minha primeira mensagem pela Zapvu."
  })
});

const data = await res.json();
console.log(data.id, data.status);`,
    py: `# Exemplo ilustrativo: endereço e chave de demonstração
import os
import requests

res = requests.post(
    "${URL_}",
    headers={
        "Authorization": f"Bearer {os.environ['SUA_CHAVE_DEMO']}",
        "Idempotency-Key": "pedido-4821",
    },
    json={
        "instance": "minha-instancia",
        "to": "5511999999999",
        "text": "Olá! Esta é minha primeira mensagem pela Zapvu.",
    },
)

data = res.json()
print(data["id"], data["status"])`,
    php: `<?php
// Exemplo ilustrativo: endereço e chave de demonstração
$ch = curl_init("${URL_}");
curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER => [
        "Authorization: Bearer " . getenv("SUA_CHAVE_DEMO"),
        "Content-Type: application/json",
        "Idempotency-Key: pedido-4821",
    ],
    CURLOPT_POSTFIELDS => json_encode([
        "instance" => "minha-instancia",
        "to" => "5511999999999",
        "text" => "Olá! Esta é minha primeira mensagem pela Zapvu.",
    ]),
]);

$data = json_decode(curl_exec($ch), true);
echo $data["id"] . " " . $data["status"];`,
    curl: `# Exemplo ilustrativo: endereço e chave de demonstração
curl -X POST "${URL_}" \\
  -H "Authorization: Bearer $SUA_CHAVE_DEMO" \\
  -H "Content-Type: application/json" \\
  -H "Idempotency-Key: pedido-4821" \\
  -d '{
    "instance": "minha-instancia",
    "to": "5511999999999",
    "text": "Olá! Esta é minha primeira mensagem pela Zapvu."
  }'`,
  };
  const RES = `{
  "id": "msg_7Hq2Lw9xT4",
  "status": "queued"
}`;
  const src = root.querySelector('[data-ps-src]');
  const res = root.querySelector('[data-ps-res]');
  const langs = [...root.querySelectorAll('[data-ps-lang]')];
  const esc = (t) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;');
  // destaque simples: textos entre aspas e palavras-chave
  const paint = (t) => esc(t)
    .replace(/(&quot;|"[^"\n]*"|'[^'\n]*')/g, '<span class="c-s">$1</span>')
    .replace(/\b(const|await|import|print|echo|true|curl_init|curl_setopt_array|json_encode|json_decode|curl_exec)\b/g, '<span class="c-k">$1</span>');
  let lang = 'js';
  function showLang(l, focus) {
    lang = l;
    langs.forEach((b) => { const on = b.dataset.psLang === l; b.setAttribute('aria-selected', on ? 'true' : 'false'); b.tabIndex = on ? 0 : -1; if (on && focus) b.focus(); });
    src.innerHTML = paint(CODE[l]);
  }
  langs.forEach((b) => b.addEventListener('click', () => showLang(b.dataset.psLang)));
  root.querySelector('.ps-tabs').addEventListener('keydown', (e) => {
    const order = langs.map((b) => b.dataset.psLang);
    const i = order.indexOf(lang);
    if (e.key === 'ArrowRight') showLang(order[(i + 1) % order.length], true);
    if (e.key === 'ArrowLeft') showLang(order[(i + order.length - 1) % order.length], true);
  });
  res.innerHTML = paint(RES);
  showLang('js');

  const copy = root.querySelector('[data-ps-copy]');
  copy.addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(CODE[lang]); }
    catch {
      const ta = document.createElement('textarea'); ta.value = CODE[lang]; document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); } catch {} ta.remove();
    }
    copy.textContent = 'Copiado'; copy.classList.add('is-ok');
    setTimeout(() => { copy.textContent = 'Copiar'; copy.classList.remove('is-ok'); }, 1600);
  });

  // começa o passo 1 quando a seção aparece
  let started = false;
  new IntersectionObserver(([e]) => { if (e.isIntersecting && !started) { started = true; go(0); } }, { threshold: 0.3 }).observe(root);
})();

/* ---------- Arquitetura: pontos só andam com o diagrama na tela ---------- */
(() => {
  const viz = document.querySelector('[data-pf]');
  if (!viz) return;
  const svg = viz.querySelector('svg');
  svg.pauseAnimations();
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  new IntersectionObserver(([e]) => { if (e.isIntersecting) svg.unpauseAnimations(); else svg.pauseAnimations(); }).observe(viz);
})();

/* ---------- Planos: monta os cards a partir de window.ZAPVU_PLANOS ---------- */
(() => {
  const box = document.querySelector('[data-pn]');
  const PL = window.ZAPVU_PLANOS;
  if (!box || !Array.isArray(PL)) return;
  const ciclo = document.querySelector('[data-pn-ciclo]');
  const temAnual = PL.some((p) => p.preco && typeof p.preco.anual === 'number');
  let modo = 'mensal';
  const brl = (v) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: v % 1 ? 2 : 0 });
  const esc = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;');
  const lista = (arr) => (arr && arr.length ? `<ul>${arr.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>` : '<p class="pn-tbd">a definir</p>');
  const val = (v) => (v ? esc(v) : '<span class="pn-tbd">a definir</span>');

  function render() {
    box.innerHTML = PL.map((p) => {
      const v = p.preco ? p.preco[modo] : null;
      const preco = typeof v === 'number'
        ? `<p class="pn-price"><b>${brl(v)}</b><small>${modo === 'anual' ? '/ano' : '/mês'}</small></p>`
        : '<p class="pn-price pn-price-tbd"><b>Preço a definir</b></p>';
      return `<article class="pn-card${p.destaque ? ' is-pro' : ''}">
        ${p.destaque ? '<span class="pn-badge">Mais indicado</span>' : ''}
        <h3>${esc(p.nome)}</h3>
        <p class="pn-pub">${esc(p.publico)}</p>
        ${preco}
        <a class="btn ${p.destaque ? 'btn-primary' : 'btn-ghost'} pn-cta" href="${esc(p.cta.href)}">${esc(p.cta.texto)}</a>
        <dl class="pn-rows">
          <div><dt>Instâncias</dt><dd>${val(p.instancias)}</dd></div>
          <div><dt>Suporte</dt><dd>${val(p.suporte)}</dd></div>
        </dl>
        <div class="pn-block"><h4>Recursos</h4>${lista(p.recursos)}</div>
        <div class="pn-block"><h4>Limites de utilização</h4>${lista(p.limites)}</div>
      </article>`;
    }).join('');
  }
  if (temAnual && ciclo) {
    ciclo.hidden = false;
    ciclo.querySelectorAll('[data-pn-c]').forEach((b) => b.addEventListener('click', () => {
      modo = b.dataset.pnC;
      ciclo.querySelectorAll('[data-pn-c]').forEach((x) => x.setAttribute('aria-pressed', x === b ? 'true' : 'false'));
      render();
    }));
  }
  render();
})();

/* ---------- Dúvidas: acordeão (teclado: Enter/Espaço abre, setas navegam) ---------- */
(() => {
  const fa = document.querySelector('[data-fa]');
  if (!fa) return;
  const qs = [...fa.querySelectorAll('.fa-q')];
  qs.forEach((q) => q.addEventListener('click', () => {
    const open = q.getAttribute('aria-expanded') === 'true';
    q.setAttribute('aria-expanded', open ? 'false' : 'true');
    q.closest('.fa-item').classList.toggle('is-open', !open);
  }));
  fa.addEventListener('keydown', (e) => {
    const i = qs.indexOf(document.activeElement);
    if (i < 0) return;
    if (e.key === 'ArrowDown') { e.preventDefault(); qs[(i + 1) % qs.length].focus(); }
    if (e.key === 'ArrowUp') { e.preventDefault(); qs[(i + qs.length - 1) % qs.length].focus(); }
    if (e.key === 'Home') { e.preventDefault(); qs[0].focus(); }
    if (e.key === 'End') { e.preventDefault(); qs[qs.length - 1].focus(); }
  });
})();

/* ---------- Arquitetura: cada indicador acende a parte do diagrama (avança sozinho) ---------- */
(() => {
  const box = document.querySelector('[data-pf2]');
  if (!box) return;
  const btns = [...box.querySelectorAll('[data-pf2-k]')];
  const title = box.querySelector('[data-pf2-title]');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let cur = 0, auto = !reduce, vis = false, hover = false, t = 0;
  function set(i, focus) {
    cur = (i + btns.length) % btns.length;
    box.dataset.active = String(cur);
    btns.forEach((b, k) => { b.setAttribute('aria-selected', k === cur ? 'true' : 'false'); b.tabIndex = k === cur ? 0 : -1; });
    title.textContent = btns[cur].dataset.title;
    if (window.zvPF && box.dataset.ready) window.zvPF(cur);
    const bar = btns[cur].querySelector('.pf2-prog'); bar.style.animation = 'none'; void bar.offsetWidth; bar.style.animation = '';
    if (focus) btns[cur].focus();
    sched();
  }
  function sched() {
    clearTimeout(t);
    box.classList.toggle('is-auto', auto && vis && !hover);
    if (auto && vis && !hover) t = setTimeout(() => set(cur + 1), 5000);
  }
  btns.forEach((b, k) => b.addEventListener('click', () => { auto = false; set(k); }));
  box.querySelector('.pf2-kpis').addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') { e.preventDefault(); auto = false; set(cur + 1, true); }
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') { e.preventDefault(); auto = false; set(cur - 1, true); }
  });
  box.addEventListener('pointerenter', () => { hover = true; sched(); });
  box.addEventListener('pointerleave', () => { hover = false; sched(); });
  new IntersectionObserver(([e]) => { vis = e.isIntersecting; sched(); }, { threshold: 0.3 }).observe(box);
  set(0);
  box.dataset.ready = '1';
})();

/* ---------- Segurança: um item aceso por vez; passar o mouse acende aquele ---------- */
(() => {
  const sec = document.querySelector('[data-sec]');
  if (!sec) return;
  const items = [...sec.querySelectorAll('.pf-sec li')];
  let i = 0, hover = false, vis = false;
  const lit = (k) => items.forEach((li, j) => li.classList.toggle('is-on', j === k));
  items.forEach((li, k) => li.addEventListener('pointerenter', () => { hover = true; i = k; lit(k); }));
  sec.addEventListener('pointerleave', () => { hover = false; });
  new IntersectionObserver(([e]) => { vis = e.isIntersecting; }, { threshold: 0.2 }).observe(sec);
  lit(0);
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  setInterval(() => { if (!vis || hover || document.hidden) return; i = (i + 1) % items.length; lit(i); }, 2200);
})();

/* ---------- Enterprise: simulador (sem preço; só cenário e memória estimada a partir de ~16 MB/número) ---------- */
(() => {
  const sim = document.querySelector('[data-pz-sim]');
  if (!sim) return;
  const range = sim.querySelector('#pz-n');
  const out = sim.querySelector('#pz-n-out');
  const seg = [...sim.querySelectorAll('.pz-seg button')];
  const sum = sim.querySelector('[data-pz-sum]');
  const ram = sim.querySelector('[data-pz-ram]');
  const cta = document.querySelector('[data-pz-cta]');
  let vol = '10 mil';
  const fmtRam = (mb) => (mb >= 1024 ? `≈ ${(mb / 1024).toLocaleString('pt-BR', { maximumFractionDigits: 1 })} GB` : `≈ ${mb} MB`);
  function update() {
    const n = Number(range.value);
    out.textContent = n;
    range.style.setProperty('--p', `${((n - range.min) / (range.max - range.min)) * 100}%`);
    sum.textContent = `${n} números · ${vol} msgs/dia`;
    ram.textContent = fmtRam(n * 16);
    cta.textContent = `Pedir proposta para ${n} números`;
  }
  range.addEventListener('input', update);
  seg.forEach((b) => b.addEventListener('click', () => {
    vol = b.dataset.v;
    seg.forEach((x) => x.setAttribute('aria-checked', x === b ? 'true' : 'false'));
    update();
  }));
  update();
})();
