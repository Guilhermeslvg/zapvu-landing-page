// Fundo de "gosma" líquida (WebGL puro, sem biblioteca).
// Folhas de cor escorrendo devagar, nas cores da marca: oliva e lima no preto, lima claro no branco.
(() => {
  const canvas = document.querySelector('.gosma');
  if (!canvas) return;
  const gl = canvas.getContext('webgl', { antialias: false, premultipliedAlpha: false });
  if (!gl) return;

  const vs = `attribute vec2 p; void main(){ gl_Position = vec4(p, 0.0, 1.0); }`;
  const fs = `
  precision highp float;
  uniform vec2 res; uniform float t; uniform float dark; uniform float mobile;
  uniform vec3 base, mid, deep, glow;

  float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float noise(vec2 p){
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1,0)), u.x), mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), u.x), u.y);
  }
  float fbm(vec2 p){
    float v = 0.0, a = 0.5;
    mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
    for (int i = 0; i < 4; i++){ v += a * noise(p); p = m * p; a *= 0.5; }
    return v;
  }

  float tt;
  // campo da gosma: domain warping (formato orgânico, escorrendo)
  float field(vec2 p){
    vec2 q = vec2(fbm(p + vec2(0.0, tt)), fbm(p + vec2(5.2, 1.3) - tt));
    vec2 r = vec2(fbm(p + 2.6 * q + vec2(1.7, 9.2) + tt * 1.3), fbm(p + 2.6 * q + vec2(8.3, 2.8) - tt));
    return fbm(p + 2.4 * r);
  }

  void main(){
    vec2 uv = gl_FragCoord.xy / res;
    vec2 p = (gl_FragCoord.xy - 0.5 * res) / min(res.x, res.y) * 0.95;
    tt = t * 0.05;

    float f = field(p);
    // relevo: gosma grossa com borda definida (slime), não degradê
    float e = 0.008;
    float fx = field(p + vec2(e, 0.0)), fy = field(p + vec2(0.0, e));
    float body = smoothstep(0.505, 0.52, f);                 // onde tem gosma
    float thick = smoothstep(0.50, 0.75, f);                // mais grossa no meio
    vec3 n = normalize(vec3(-(fx - f) / e * 0.11, -(fy - f) / e * 0.11, 1.0));
    vec3 L = normalize(vec3(-0.45, 0.6, 0.65));
    float diff = clamp(dot(n, L), 0.0, 1.0);
    float spec = pow(max(dot(reflect(-L, n), vec3(0.0, 0.0, 1.0)), 0.0), 60.0);
    float rim = pow(1.0 - n.z, 1.6);                         // brilho na borda curva

    vec3 slime = mix(deep, mid, thick);
    slime *= 0.55 + 0.6 * diff;
    slime += glow * rim * 0.55;
    slime += vec3(1.0) * spec * (dark > 0.5 ? 0.55 : 0.75);

    // sombra suave da gosma no fundo
    float shadow = smoothstep(0.42, 0.52, field(p + vec2(0.05, 0.07))) * (1.0 - body);
    vec3 bg = base * (1.0 - shadow * (dark > 0.5 ? 0.35 : 0.08));

    vec3 col = mix(bg, slime, body);

    // calma atrás do texto, forte atrás do símbolo; some embaixo
    float side = mobile > 0.5 ? mix(0.5, 0.95, uv.y) : mix(0.32, 1.0, smoothstep(0.2, 0.8, uv.x));
    float fade = smoothstep(0.0, 0.3, uv.y);
    col = mix(base, col, side * fade);

    gl_FragColor = vec4(col, 1.0);
  }`;

  function sh(type, src) { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); return s; }
  const prog = gl.createProgram();
  gl.attachShader(prog, sh(gl.VERTEX_SHADER, vs));
  gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, fs));
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
  gl.useProgram(prog);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(prog, 'p');
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

  const U = (n) => gl.getUniformLocation(prog, n);
  const u = { res: U('res'), t: U('t'), dark: U('dark'), mobile: U('mobile'), base: U('base'), mid: U('mid'), deep: U('deep'), glow: U('glow') };
  const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);

  const PALETAS = {
    dark:  { base: '#0A0A0A', mid: '#D5FF26', deep: '#2E3A04', glow: '#E8FF7A' },
    light: { base: '#FFFFFF', mid: '#D5FF26', deep: '#A8D000', glow: '#F6FFC8' },
  };
  const root = document.documentElement;
  function setTheme() {
    const d = root.dataset.theme !== 'light';
    const pal = PALETAS[d ? 'dark' : 'light'];
    gl.uniform1f(u.dark, d ? 1 : 0);
    gl.uniform3fv(u.base, hex(pal.base)); gl.uniform3fv(u.mid, hex(pal.mid));
    gl.uniform3fv(u.deep, hex(pal.deep)); gl.uniform3fv(u.glow, hex(pal.glow));
    draw(last);
  }

  // renderiza em meia resolução: a gosma é desfocada, não precisa de mais
  function fit() {
    const scale = 0.5;
    canvas.width = Math.max(1, Math.round(canvas.clientWidth * scale));
    canvas.height = Math.max(1, Math.round(canvas.clientHeight * scale));
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform2f(u.res, canvas.width, canvas.height);
    gl.uniform1f(u.mobile, innerWidth < 960 ? 1 : 0);
    draw(last);
  }

  let last = 8;
  function draw(sec) { gl.uniform1f(u.t, sec); gl.drawArrays(gl.TRIANGLES, 0, 3); }

  new ResizeObserver(fit).observe(canvas);
  new MutationObserver(setTheme).observe(root, { attributes: true, attributeFilter: ['data-theme'] });
  fit(); setTheme();
  root.classList.add('has-gosma');

  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  let onScreen = true;
  new IntersectionObserver(([e]) => { onScreen = e.isIntersecting; }).observe(canvas);
  const start = performance.now();
  let prev = 0;
  (function loop(now) {
    requestAnimationFrame(loop);
    if (document.hidden || !onScreen || now - prev < 33) return; // ~30 fps é suficiente
    prev = now;
    last = 8 + (now - start) / 1000;
    draw(last);
  })(start);
})();
