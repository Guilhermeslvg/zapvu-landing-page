/* "O que é a Zapvu?": a animação só roda com a seção na tela,
   e os indicadores trocam de requisição e de evento devagar. */
(() => {
  const viz = document.querySelector('[data-oq]');
  if (!viz) return;
  const svg = viz.querySelector('svg');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduce) { svg.pauseAnimations(); return; }

  let on = false;
  new IntersectionObserver(([e]) => {
    on = e.isIntersecting;
    if (on) svg.unpauseAnimations(); else svg.pauseAnimations();
  }).observe(viz);
  svg.pauseAnimations();

  const req = viz.querySelector('[data-oq-req]');
  const evt = viz.querySelector('[data-oq-evt]');
  const REQ = ['/v1/messages/text', '/v1/messages/image', '/v1/messages/audio', '/v1/messages/location'];
  const EVT = ['message.received', 'message.delivered', 'message.read', 'connection.open'];
  let i = 0;
  const swap = (el, txt) => {
    el.classList.add('is-swap');
    setTimeout(() => { el.textContent = txt; el.classList.remove('is-swap'); }, 300);
  };
  setInterval(() => {
    if (!on || document.hidden) return;
    i++;
    swap(req, REQ[i % REQ.length]);
    setTimeout(() => swap(evt, EVT[i % EVT.length]), 900);
  }, 2800);
})();
