// Símbolo do Zapvu em 3D (Three.js). Contorno traçado do PNG oficial (assets/brand/zapvu-simbolo.png, 313x440).
(() => {
let THREE;

const PTS = [[181.75,0.0],[181.0,0.0],[181.0,0.5],[34.0,143.75],[26.0,152.25],[20.25,159.5],[15.25,167.0],[11.0,174.5],[11.0,175.25],[8.0,181.25],[3.0,196.0],[1.0,205.75],[0.5,211.5],[0.0,211.75],[0.0,233.0],[0.5,233.25],[1.0,239.0],[3.0,248.75],[7.0,261.25],[10.0,268.25],[12.0,271.5],[12.0,272.25],[18.0,282.25],[25.25,291.75],[33.75,300.75],[40.25,306.5],[50.25,313.75],[58.75,318.75],[72.25,324.75],[84.5,328.5],[96.0,330.75],[107.5,331.75],[122.0,331.5],[130.5,330.5],[131.5,329.75],[131.5,255.0],[131.0,254.5],[44.5,254.5],[42.75,253.75],[41.0,251.75],[40.5,250.0],[40.75,248.25],[43.5,244.75],[180.25,111.25],[181.5,110.75],[182.0,111.5],[181.75,184.0],[182.25,184.5],[267.5,184.5],[269.75,185.25],[272.0,187.25],[273.0,189.5],[273.0,191.5],[271.75,194.0],[131.75,330.5],[131.75,438.75],[132.25,438.75],[277.5,296.75],[278.25,296.5],[285.25,289.0],[292.75,279.5],[296.5,273.75],[301.75,264.25],[307.75,248.75],[307.75,247.5],[309.75,241.0],[311.5,230.5],[312.0,224.0],[312.0,211.25],[311.5,205.0],[308.5,189.5],[304.75,178.25],[302.75,173.5],[298.75,166.25],[298.75,165.5],[293.75,157.5],[286.5,148.0],[278.0,139.0],[267.25,130.0],[258.25,124.0],[251.0,120.0],[242.0,116.0],[233.5,113.0],[221.5,110.0],[209.0,108.25],[192.0,108.0],[182.75,109.25],[181.75,108.5]];

const box = document.querySelector('.hero-visual');
const canvas = box && box.querySelector('.symbol-3d');
if (canvas) init().catch((e) => console.warn('3D do símbolo não carregou', e));

async function init() {
  THREE = await import('https://cdn.jsdelivr.net/npm/three@0.169.0/build/three.module.js');
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.NoToneMapping;
  renderer.toneMappingExposure = 1.0;
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const scene = new THREE.Scene();

  // Ambiente neutro (só branco e cinza) para não mudar a cor da marca: o lima fica lima
  const envScene = new THREE.Scene();
  envScene.background = new THREE.Color(0x0a0a0a);
  const panel = (intensity, pos, size) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(size[0], size[1]), new THREE.MeshBasicMaterial({ color: new THREE.Color(0xffffff).multiplyScalar(intensity), side: THREE.DoubleSide }));
    m.position.set(...pos); m.lookAt(0, 0, 0); envScene.add(m);
  };
  panel(2.2, [0, 6, 5], [10, 2]);     // faixa de luz em cima
  panel(1.4, [-7, 1, 3], [2, 9]);     // lateral esquerda
  panel(1.0, [7, -1, 3], [2, 9]);     // lateral direita
  panel(2.6, [2, 2, 9], [3, 1.2]);    // brilho de frente
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(envScene, 0.02).texture;
  scene.add(new THREE.AmbientLight(0xffffff, 0.25));
  const key = new THREE.DirectionalLight(0xffffff, 1.1); key.position.set(3, 5, 6); scene.add(key);

  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
  camera.position.set(0, 0, 17);

  // Forma: centraliza e inverte o Y (imagem cresce para baixo, 3D para cima)
  const s = 1 / 100;
  const shape = new THREE.Shape(PTS.map(([x, y]) => new THREE.Vector2((x - 156.5) * s, (220 - y) * s)));
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: 0.8, bevelEnabled: true, bevelThickness: 0.05, bevelSize: 0.025, bevelSegments: 4, curveSegments: 24,
  });
  geo.center();
  geo.computeVertexNormals();

  // Frente e verso no lima exato da marca (#D5FF26, sem luz mexendo na cor); laterais e chanfro em lima com brilho
  const brand = new THREE.Color('#D5FF26');
  const face = new THREE.MeshBasicMaterial({ color: brand });
  const side = new THREE.MeshPhysicalMaterial({
    color: brand, metalness: 0.0, roughness: 0.28, clearcoat: 1, clearcoatRoughness: 0.15,
  });
  const mat = [face, side];  const mesh = new THREE.Mesh(geo, mat);
  const group = new THREE.Group();
  group.add(mesh);
  scene.add(group);
  const root = document.documentElement;
  function fit() {
    const w = box.clientWidth, h = box.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h; camera.updateProjectionMatrix();
    group.scale.setScalar(1);
  }
  new ResizeObserver(fit).observe(box);
  new MutationObserver(fit).observe(root, { attributes: true, attributeFilter: ['data-theme'] });
  fit();

  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let mx = 0, my = 0, tx = 0, ty = 0;
  if (!reduce) addEventListener('pointermove', (e) => { tx = e.clientX / innerWidth - 0.5; ty = e.clientY / innerHeight - 0.5; }, { passive: true });

  let visible = true;
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; }).observe(box);

  const clock = new THREE.Clock();
  function frame() {
    requestAnimationFrame(frame);
    if (!visible || document.hidden) return;
    const t = clock.getElapsedTime();
    mx += (tx - mx) * 0.05; my += (ty - my) * 0.05;
    if (reduce) { group.rotation.set(-0.2, -0.55, 0.1); }
    else {
      // a cada 3,4 s dá uma volta inteira (alternando o eixo) e para de frente, mostrando o logo certo
      const step = 3.4, n = Math.floor(t / step), f = Math.min(1, (t % step) / 1.9);
      const e = f < 0.5 ? 4 * f * f * f : 1 - Math.pow(-2 * f + 2, 3) / 2;
      const ny = Math.ceil(n / 2), nx = Math.floor(n / 2);
      const turnY = (n % 2 === 0 ? e : 0), turnX = (n % 2 === 1 ? e : 0);
      group.rotation.y = 2 * Math.PI * (ny + turnY) - 0.35 + mx * 0.5;
      group.rotation.x = 2 * Math.PI * (nx + turnX) - 0.15 + my * 0.3;
      group.rotation.z = Math.sin(t * 0.6) * 0.08;
      group.position.y = Math.sin(t * 0.9) * 0.1;
    }
    renderer.render(scene, camera);
  }
  frame();
  box.classList.add('is-3d');
}
})();
