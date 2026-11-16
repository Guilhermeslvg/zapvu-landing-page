// Zapvu — landing page
const root = document.documentElement;
root.classList.add('js');
requestAnimationFrame(() => requestAnimationFrame(() => root.classList.add('ready')));

// Fundo preto / branco
const toggle = document.querySelector('[data-theme-toggle]');
const isSwitch = toggle.getAttribute('role') === 'switch';
function setLabel() {
  const dark = root.dataset.theme === 'dark';
  if (isSwitch) {
    toggle.setAttribute('aria-checked', String(dark));
    toggle.setAttribute('aria-label', 'Fundo escuro');
  } else {
    toggle.setAttribute('aria-label', dark ? 'Mudar para fundo branco' : 'Mudar para fundo preto');
  }
}
setLabel();
toggle.addEventListener('click', () => {
  root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
  try { localStorage.setItem('zapvu-tema', root.dataset.theme); } catch (e) {}
  setLabel();
  toggle.classList.remove('is-moving'); void toggle.offsetWidth; toggle.classList.add('is-moving');
  setTimeout(() => toggle.classList.remove('is-moving'), 600);
});

// Menu no celular
const menuBtn = document.querySelector('[data-menu]');
const links = document.getElementById('nav-links');
function closeMenu() {
  links.classList.remove('open');
  menuBtn.setAttribute('aria-expanded', 'false');
  menuBtn.setAttribute('aria-label', 'Abrir menu');
}
menuBtn.addEventListener('click', () => {
  const open = links.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', String(open));
  menuBtn.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
});
links.addEventListener('click', (e) => { if (e.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });

// Reflexo do vidro do menu acompanha o mouse
const nav = document.querySelector('.nav');
nav.addEventListener('pointermove', (e) => {
  const r = nav.getBoundingClientRect();
  nav.style.setProperty('--sheen-x', `${((e.clientX - r.left) / r.width) * 100}%`);
});
nav.addEventListener('pointerleave', () => nav.style.removeProperty('--sheen-x'));

// Abas de código (clique e setas do teclado) + copiar
const tabs = [...document.querySelectorAll('.code-tabs [role="tab"]')];
function selectTab(tab) {
  tabs.forEach((t) => {
    const on = t === tab;
    t.setAttribute('aria-selected', String(on));
    t.tabIndex = on ? 0 : -1;
    document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
  });
}
tabs.forEach((t, i) => {
  t.addEventListener('click', () => selectTab(t));
  t.addEventListener('keydown', (e) => {
    const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!d) return;
    const next = tabs[(i + d + tabs.length) % tabs.length];
    selectTab(next); next.focus();
  });
});
const copyBtn = document.querySelector('[data-copy]');
copyBtn?.addEventListener('click', async () => {
  const panel = document.querySelector('.code-box pre[role="tabpanel"]:not([hidden])');
  try {
    await navigator.clipboard.writeText(panel.innerText);
    copyBtn.textContent = 'Copiado';
  } catch (e) {
    const range = document.createRange(); range.selectNodeContents(panel);
    const sel = getSelection(); sel.removeAllRanges(); sel.addRange(range);
    copyBtn.textContent = 'Use Ctrl+C';
  }
  setTimeout(() => { copyBtn.textContent = 'Copiar'; }, 1600);
});

// Calculadora de preço (VALORES DE EXEMPLO até o preço oficial)
const PRECO = (n) => (n >= 20 ? 27 : n >= 5 ? 33 : 39);
const range = document.getElementById('qtd');
const out = document.getElementById('qtd-out');
const total = document.getElementById('total');
const unit = document.getElementById('unit');
const brl = (v) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });
function updatePrice() {
  const n = Number(range.value);
  out.textContent = n;
  total.textContent = brl(n * PRECO(n));
  unit.textContent = `${brl(PRECO(n))} por número · ${n} ${n === 1 ? 'número' : 'números'}`;
  document.querySelector('[data-step="-1"]').disabled = n <= 1;
  document.querySelector('[data-step="1"]').disabled = n >= 50;
}
range?.addEventListener('input', updatePrice);
document.querySelectorAll('[data-step]').forEach((b) => b.addEventListener('click', () => {
  range.value = Number(range.value) + Number(b.dataset.step);
  updatePrice();
}));
if (range) updatePrice();
