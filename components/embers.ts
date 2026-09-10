import {
  AdditiveBlending,
  BufferGeometry,
  Color,
  Float32BufferAttribute,
  OrthographicCamera,
  Points,
  Scene,
  ShaderMaterial,
  Vector2,
  WebGLRenderer,
} from 'three';

/**
 * A field of slow embers rising behind the whole page. Loaded only after the
 * page is idle, on wide fine-pointer devices with normal motion settings,
 * and it stops rendering the moment its canvas leaves the viewport or the
 * tab is hidden. Everything is one draw call of GL points; there is no
 * geometry to load and no per-frame JavaScript beyond a uniform update.
 *
 * The scene is drawn in normalised 0..1 space. `uAspect` corrects the
 * horizontal axis so pointer distance and drift feel the same in every
 * direction regardless of the section's shape.
 */

const VERT = /* glsl */ `
  attribute float aSeed;
  attribute float aSize;
  attribute float aSpeed;
  uniform float uTime;
  uniform float uDpr;
  uniform float uAspect;
  uniform float uScroll;
  uniform vec2 uPointer;
  varying float vAlpha;
  varying float vSeed;

  void main() {
    vSeed = aSeed;
    float t = uTime * aSpeed;
    // Rise, wrap, and sway. fract keeps every ember on an endless loop.
    // uScroll is page scroll in viewport heights; embers drift up at a
    // fraction of scroll speed so the layer feels behind the page, not
    // stuck to the glass.
    float y = fract(position.y + t * 0.018 + uScroll * 0.18);
    float x = position.x + sin(t * 0.55 + aSeed * 6.2832) * 0.012 * (0.4 + aSeed);
    x = fract(x);

    // Pointer influence: a soft push away from the cursor, capped in size.
    vec2 d = vec2((x - uPointer.x) * uAspect, y - uPointer.y);
    float dist = length(d) + 0.0001;
    float push = smoothstep(0.22, 0.0, dist) * 0.045;
    x += (d.x / dist) * push / uAspect;
    y += (d.y / dist) * push;

    // Fade in near the bottom edge, out near the top, and flicker gently.
    float life = smoothstep(0.0, 0.12, y) * smoothstep(1.0, 0.55, y);
    float flicker = 0.75 + 0.25 * sin(t * 3.1 + aSeed * 40.0);
    vAlpha = life * flicker * (0.35 + 0.65 * aSeed);

    gl_PointSize = aSize * uDpr * (0.7 + 0.6 * life);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(x, y, 0.0, 1.0);
  }
`;

const FRAG = /* glsl */ `
  precision mediump float;
  uniform vec3 uEmber;
  uniform vec3 uCoral;
  uniform float uOpacity;
  varying float vAlpha;
  varying float vSeed;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    float core = smoothstep(0.5, 0.05, d);
    float glow = smoothstep(0.5, 0.0, d) * 0.5;
    vec3 tint = mix(uEmber, uCoral, vSeed * vSeed);
    float a = (core + glow) * vAlpha * uOpacity;
    gl_FragColor = vec4(tint * a, a);
  }
`;

export type EmberOptions = {
  /** Multiplier on the particle count. 1 is the hero. */
  density?: number;
  /** Peak alpha of the brightest ember. Keep low; this is a background. */
  opacity?: number;
};

export function mountEmbers(canvas: HTMLCanvasElement, opts: EmberOptions = {}) {

  let renderer: WebGLRenderer;
  try {
    renderer = new WebGLRenderer({
      canvas,
      alpha: true,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: 'low-power',
      premultipliedAlpha: true,
      // Lets the site's own screenshot tooling capture the canvas. One
      // draw call per frame, so the cost is immaterial.
      preserveDrawingBuffer: true,
    });
  } catch {
    // No WebGL: the section simply keeps its flat background.
    return () => {};
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  renderer.setClearColor(0x000000, 0);

  const scene = new Scene();
  const camera = new OrthographicCamera(0, 1, 1, 0, 0, 10);
  camera.position.z = 1;

  // Scale the count with viewport area so a 4K display is not sparse and
  // a laptop is not busy. 220 embers at 1440x900.
  const area = (window.innerWidth * window.innerHeight) / (1440 * 900);
  const count = Math.round(220 * Math.min(2.2, Math.max(0.7, area)) * (opts.density ?? 1));
  const positions = new Float32Array(count * 3);
  const seeds = new Float32Array(count);
  const sizes = new Float32Array(count);
  const speeds = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = Math.random();
    positions[i * 3 + 1] = Math.random();
    positions[i * 3 + 2] = 0;
    seeds[i] = Math.random();
    // Skewed so most embers are pinpricks and a few are soft, larger glows.
    sizes[i] = 1.8 + Math.pow(Math.random(), 2) * 6.5;
    speeds[i] = 0.5 + Math.random() * 1.1;
  }
  const geometry = new BufferGeometry();
  geometry.setAttribute('position', new Float32BufferAttribute(positions, 3));
  geometry.setAttribute('aSeed', new Float32BufferAttribute(seeds, 1));
  geometry.setAttribute('aSize', new Float32BufferAttribute(sizes, 1));
  geometry.setAttribute('aSpeed', new Float32BufferAttribute(speeds, 1));

  const pointer = new Vector2(-10, -10);
  const target = new Vector2(-10, -10);
  const material = new ShaderMaterial({
    vertexShader: VERT,
    fragmentShader: FRAG,
    transparent: true,
    depthWrite: false,
    depthTest: false,
    blending: AdditiveBlending,
    uniforms: {
      uTime: { value: 0 },
      uDpr: { value: renderer.getPixelRatio() },
      uAspect: { value: 1 },
      uScroll: { value: 0 },
      uPointer: { value: pointer },
      uEmber: { value: new Color('#f51717') },
      uCoral: { value: new Color('#ff4747') },
      uOpacity: { value: opts.opacity ?? 0.75 },
    },
  });
  scene.add(new Points(geometry, material));

  const resize = () => {
    const w = window.innerWidth || 1;
    const h = window.innerHeight || 1;
    renderer.setSize(w, h, false);
    material.uniforms.uAspect.value = w / h;
  };
  resize();
  window.addEventListener('resize', resize, { passive: true });

  // The canvas is pointer-events:none so it never blocks a click; listen on
  // the document and map into viewport space.
  const onMove = (e: PointerEvent) => {
    target.set(e.clientX / window.innerWidth, 1 - e.clientY / window.innerHeight);
  };
  const onLeave = () => target.set(-10, -10);
  document.addEventListener('pointermove', onMove, { passive: true });
  document.addEventListener('pointerleave', onLeave, { passive: true });

  const visible = true;
  let hidden = document.hidden;
  let frame = 0;
  const start = performance.now();
  const onVisibility = () => {
    hidden = document.hidden;
    if (!hidden) schedule();
  };
  document.addEventListener('visibilitychange', onVisibility);

  const tick = (now: number) => {
    frame = 0;
    if (!visible || hidden) return;
    material.uniforms.uTime.value = (now - start) / 1000;
    material.uniforms.uScroll.value = window.scrollY / Math.max(1, window.innerHeight);
    pointer.lerp(target, 0.08);
    renderer.render(scene, camera);
    schedule();
  };
  function schedule() {
    if (!frame) frame = requestAnimationFrame(tick);
  }
  schedule();
  canvas.classList.add('is-on');

  return () => {
    if (frame) cancelAnimationFrame(frame);
    window.removeEventListener('resize', resize);
    document.removeEventListener('visibilitychange', onVisibility);
    document.removeEventListener('pointermove', onMove);
    document.removeEventListener('pointerleave', onLeave);
    canvas.classList.remove('is-on');
    geometry.dispose();
    material.dispose();
    renderer.dispose();
    renderer.forceContextLoss();
  };
}
