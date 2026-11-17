// Símbolo do Zapvu em 3D (Three.js).
// A forma é desenhada com retas e arcos de verdade (não traçada do PNG), em duas metades
// iguais giradas 180°. Medidas tiradas de assets/brand/zapvu-simbolo.svg (313 × 440),
// centro do símbolo na origem, 1 unidade = 100 px.
(() => {
let THREE;

const box = document.querySelector('.hero-visual');
const canvas = box && box.querySelector('.symbol-3d');
if (canvas) init().catch((e) => console.warn('3D do símbolo não carregou', e));

// Metade esquerda: ponta de cima, diagonal tangente ao arco, arco por fora até embaixo,
// sobe, entra para a esquerda e volta na diagonal até a haste.
function half(sign) {
  const S = new THREE.Shape();
  const p = (x, y) => [x * sign, y * sign];
  const R = 1.1, cx = -0.4675, cy = -0.021;
  const a0 = (134.3 * Math.PI) / 180;            // onde a diagonal encosta no arco
  const a1 = (-78.73 * Math.PI) / 180 + Math.PI * 2; // embaixo, na haste
  const rc = 0.07;                                // canto de dentro arredondado

  S.moveTo(...p(0.25, 2.194));                                     // ponta de cima
  S.lineTo(...p(cx + R * Math.cos(a0), cy + R * Math.sin(a0)));
  // o arco gira 180° junto com a metade
  S.absarc(cx * sign, cy * sign, R, a0 + (sign < 0 ? Math.PI : 0), a1 + (sign < 0 ? Math.PI : 0), false);
  S.lineTo(...p(-0.2525, -0.351));
  S.lineTo(...p(-1.1225 + rc * 1.6, -0.351));
  S.quadraticCurveTo(...p(-1.1225, -0.351), ...p(-1.1225 + rc * 0.75, -0.351 + rc * 0.75));
  S.lineTo(...p(0.25, 1.084));
  S.closePath();
  return S;
}

async function init() {
  THREE = await import('https://cdn.jsdelivr.net/npm/three@0.169.0/build/three.module.js');
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.NoToneMapping;
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const scene = new THREE.Scene();

  // Estúdio neutro (só branco e cinza) para a luz não mudar a cor da marca
  const env = new THREE.Scene();
  env.background = new THREE.Color(0x111111);
  const softbox = (k, pos, size) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(...size), new THREE.MeshBasicMaterial({ color: new THREE.Color(0xffffff).multiplyScalar(k), side: THREE.DoubleSide }));
    m.position.set(...pos); m.lookAt(0, 0, 0); env.add(m);
  };
  softbox(1.6, [0, 7, 4], [12, 2.5]);   // faixa de cima: risca de luz no chanfro
  softbox(0.9, [-8, 0, 4], [2, 10]);    // recorte da esquerda
  softbox(0.5, [8, -2, 3], [2, 10]);    // preenchimento da direita
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(env, 0.03).texture;

  scene.add(new THREE.HemisphereLight(0xffffff, 0x202020, 0.6));
  const key = new THREE.DirectionalLight(0xffffff, 1.4); key.position.set(-3, 4, 7); scene.add(key);

  // lente longa e câmera longe: quase sem distorção de perspectiva
  const camera = new THREE.PerspectiveCamera(20, 1, 0.1, 100);
  camera.position.set(0, 0, 27);

  const geo = new THREE.ExtrudeGeometry([half(1), half(-1)], {
    depth: 0.42, bevelEnabled: true, bevelThickness: 0.07, bevelSize: 0.045, bevelSegments: 8, curveSegments: 72,
  });
  geo.center();
  geo.computeVertexNormals();

  const brand = new THREE.Color('#D5FF26');
  // frente: lima da marca com luz suave por cima (emissivo segura a cor)
  const face = new THREE.MeshStandardMaterial({
    color: brand, emissive: brand, emissiveIntensity: 0.55, roughness: 0.55, metalness: 0, envMapIntensity: 0.35,
  });
  // laterais: um tom abaixo, com verniz, para a espessura ler como volume
  const side = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#A9CC10'), emissive: new THREE.Color('#5E7400'), emissiveIntensity: 0.35,
    roughness: 0.3, metalness: 0, clearcoat: 1, clearcoatRoughness: 0.12, envMapIntensity: 1,
  });
  const mesh = new THREE.Mesh(geo, [face, side]);
  const group = new THREE.Group();
  group.add(mesh);
  scene.add(group);

  function fit() {
    const w = box.clientWidth, h = box.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h; camera.updateProjectionMatrix();
  }
  new ResizeObserver(fit).observe(box);
  fit();

  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let mx = 0, my = 0, tx = 0, ty = 0;
  if (!reduce) {
    addEventListener('pointermove', (e) => {
      const b = box.getBoundingClientRect();
      // posição relativa ao símbolo, limitada para não virar demais
      tx = Math.max(-1, Math.min(1, (e.clientX - (b.left + b.width / 2)) / (b.width * 0.9)));
      ty = Math.max(-1, Math.min(1, (e.clientY - (b.top + b.height / 2)) / (b.height * 0.9)));
    }, { passive: true });
  }

  // quando um pulso chega ao símbolo (conexoes.js), ele dá um pequeno tranco
  let kick = 0;
  box.addEventListener('zapvu:hit', () => { kick = 1; });

  let visible = true;
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; }).observe(box);

  const clock = new THREE.Clock();
  let last = 0;
  function frame() {
    requestAnimationFrame(frame);
    if (!visible || document.hidden) return;
    const t = clock.getElapsedTime();
    const dt = Math.min(t - last, 0.05); last = t;
    mx += (tx - mx) * 0.06; my += (ty - my) * 0.06;
    kick = Math.max(0, kick - dt * 2.4);
    const k = Math.sin(kick * Math.PI) * kick; // sobe e volta, sem quicar

    if (reduce) {
      group.rotation.set(-0.06, -0.32, 0);
    } else {
      // balança de lado (nunca mostra as costas) e segue o mouse
      group.rotation.y = Math.sin(t * 0.45) * 0.42 + mx * 0.35;
      group.rotation.x = -0.05 + my * 0.22 + Math.sin(t * 0.6) * 0.03;
      group.position.y = Math.sin(t * 0.9) * 0.08;
      group.scale.setScalar(1 + k * 0.05);
      face.emissiveIntensity = 0.55 + k * 0.25;
    }
    renderer.render(scene, camera);
  }
  frame();
  box.classList.add('is-3d');
}
})();
