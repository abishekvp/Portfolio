<template>
  <div class="background-3d-wrapper" aria-hidden="true">
    <canvas ref="canvasRef" class="velvet-constellation-canvas"></canvas>
    <div class="ambient-glow-layer"></div>
  </div>
</template>

<script>
const COUNT = 140;

const BYTE_TOKENS = [
  '01', '10', '00', '11', '0xAF', '0x42', '0xFF', '0x7E', '0x13',
  '{ }', '</>', '1010', '0101', 'byte', 'bit', '0x00', 'λ'
];

const THEME_PALETTES = {
  ocean: ['#0ea5e9', '#38bdf8', '#818cf8', '#0284c7', '#67e8f9', '#a5f3fc'],
  velvet: ['#a855f7', '#ec4899', '#c084fc', '#f472b6', '#8b5cf6', '#e879f9'],
  terminal: ['#10b981', '#34d399', '#059669', '#6ee7b7', '#a7f3d0', '#047857'],
  emerald: ['#10b981', '#059669', '#34d399', '#14b8a6', '#6ee7b7', '#065f46'],
  neored: ['#ef4444', '#dc2626', '#f87171', '#b91c1c', '#fca5a5', '#991b1b'],
  amethyst: ['#8b5cf6', '#a855f7', '#7c3aed', '#c084fc', '#6d28d9', '#ddd6fe'],
  sunset: ['#f97316', '#fb923c', '#f59e0b', '#ea580c', '#fcd34d', '#fed7aa'],
  snow: ['#f8fafc', '#e2e8f0', '#cbd5e1', '#94a3b8', '#ffffff', '#64748b'],
  silver: ['#94a3b8', '#cbd5e1', '#64748b', '#e2e8f0', '#475569', '#cbd5e1']
};

const SECTION_CONFIG = {
  'home': { shape: 'diamond', centerX: 0.65 },
  'terminal-section': { shape: 'matrix_cube', centerX: 0.50 },
  'about': { shape: 'scatter', centerX: 0.35 },
  'achievements': { shape: 'star', centerX: 0.65 },
  'skills': { shape: 'network', centerX: 0.35 },
  'projects': { shape: 'bulb', centerX: 0.65 },
  'experience': { shape: 'globe', centerX: 0.35 },
  'testimonials': { shape: 'heart', centerX: 0.65 },
  'contact': { shape: 'envelope', centerX: 0.50 }
};

export default {
  name: 'Background3D',
  data() {
    return {
      activeSection: 'home',
      currentShape: 'diamond',
      particles: [],
      canvas: null,
      ctx: null,
      animationFrameId: null,
      isPaused: false,
      lastTime: 0,
      elapsedTime: 0,
      rotX: 0,
      rotY: 0,
      mouseX: 0,
      mouseY: 0,
      targetMouseX: 0,
      targetMouseY: 0,
      lastScrollY: 0,
      scrollVelocity: 0,
      currentCenterX: 0.65,
      targetCenterX: 0.65,
      themePalette: THEME_PALETTES.ocean,
      sectionObserver: null,
      themeObserver: null
    };
  },
  mounted() {
    this.initCanvas();
    this.initParticles();
    this.updateThemeColors();
    this.setTargetShape('diamond', 0.65);

    window.addEventListener('resize', this.onResize);
    window.addEventListener('scroll', this.onScroll, { passive: true });
    window.addEventListener('mousemove', this.onMouseMove, { passive: true });
    document.addEventListener('visibilitychange', this.onVisibilityChange);

    this.initSectionObserver();
    this.initThemeObserver();

    this.lastTime = performance.now();
    this.animate(this.lastTime);
  },
  beforeUnmount() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('scroll', this.onScroll);
    window.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('visibilitychange', this.onVisibilityChange);

    if (this.sectionObserver) this.sectionObserver.disconnect();
    if (this.themeObserver) this.themeObserver.disconnect();
  },
  methods: {
    initCanvas() {
      this.canvas = this.$refs.canvasRef;
      if (!this.canvas) return;
      this.ctx = this.canvas.getContext('2d');
      this.onResize();
    },

    onResize() {
      if (!this.canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;

      this.canvas.width = width * dpr;
      this.canvas.height = height * dpr;
      this.canvas.style.width = `${width}px`;
      this.canvas.style.height = `${height}px`;

      if (this.ctx) {
        this.ctx.scale(dpr, dpr);
      }
    },

    initParticles() {
      const types = ['triangle', 'triangle', 'diamond', 'ring', 'node', 'byte', 'byte', 'byte'];
      this.particles = [];

      for (let i = 0; i < COUNT; i++) {
        const type = types[i % types.length];
        const isByte = type === 'byte';
        const token = BYTE_TOKENS[i % BYTE_TOKENS.length];

        this.particles.push({
          x: (Math.random() - 0.5) * 3,
          y: (Math.random() - 0.5) * 3,
          z: (Math.random() - 0.5) * 3,
          tx: 0,
          ty: 0,
          tz: 0,
          type,
          text: token,
          size: isByte ? 11 : 4 + (i % 4) * 1.5,
          fontSize: 10 + (i % 3) * 1.5,
          baseRot: (i * 47) % 360,
          rotSpeed: ((i % 5) - 2) * 0.015,
          color: '#0ea5e9'
        });
      }
    },

    updateThemeColors() {
      const theme = document.documentElement.getAttribute('data-theme') || 'ocean';
      this.themePalette = THEME_PALETTES[theme] || THEME_PALETTES.ocean;

      this.particles.forEach((p, idx) => {
        p.color = this.themePalette[idx % this.themePalette.length];
      });
    },

    initThemeObserver() {
      this.themeObserver = new MutationObserver(() => {
        this.updateThemeColors();
      });
      this.themeObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-theme']
      });
    },

    initSectionObserver() {
      const sectionIds = Object.keys(SECTION_CONFIG);
      this.sectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const id = entry.target.id;
              if (SECTION_CONFIG[id]) {
                const config = SECTION_CONFIG[id];
                this.activeSection = id;
                this.setTargetShape(config.shape, config.centerX);
              }
            }
          });
        },
        {
          rootMargin: '-35% 0px -45% 0px',
          threshold: 0
        }
      );

      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el) this.sectionObserver.observe(el);
      });
    },

    setTargetShape(shapeName, targetCenterX) {
      this.currentShape = shapeName;
      this.targetCenterX = targetCenterX !== undefined ? targetCenterX : 0.5;

      const points = this.generateShapePoints(shapeName, COUNT);
      for (let i = 0; i < COUNT; i++) {
        const pt = points[i] || { x: 0, y: 0, z: 0 };
        this.particles[i].tx = pt.x;
        this.particles[i].ty = pt.y;
        this.particles[i].tz = pt.z;
      }
    },

    generateShapePoints(shapeName, count) {
      const pts = [];

      switch (shapeName) {
        case 'diamond': {
          // Faceted 3D Diamond / Polyhedron (like Velvet hero)
          const tblY = -0.75;
          const tblR = 0.44;
          const grdY = -0.15;
          const grdR = 1.05;
          const culY = 1.15;

          for (let i = 0; i < count; i++) {
            const ratio = i / count;
            const angle = ratio * Math.PI * 2;
            const band = i % 4;

            if (band === 0) {
              pts.push({
                x: Math.cos(angle) * tblR,
                y: tblY + (Math.sin(angle * 4) * 0.04),
                z: Math.sin(angle) * tblR
              });
            } else if (band === 1) {
              pts.push({
                x: Math.cos(angle) * grdR,
                y: grdY + (Math.cos(angle * 6) * 0.05),
                z: Math.sin(angle) * grdR
              });
            } else if (band === 2) {
              const t = (i % 7) / 7;
              const r = tblR + (grdR - tblR) * t;
              const y = tblY + (grdY - tblY) * t;
              pts.push({
                x: Math.cos(angle) * r,
                y: y,
                z: Math.sin(angle) * r
              });
            } else {
              const t = (i % 9) / 9;
              const r = grdR * (1 - t * 0.9);
              const y = grdY + (culY - grdY) * t;
              pts.push({
                x: Math.cos(angle) * r,
                y: y,
                z: Math.sin(angle) * r
              });
            }
          }
          break;
        }

        case 'matrix_cube': {
          // 3D Digital Matrix Byte Cube (for terminal section)
          const size = 1.0;
          for (let i = 0; i < count; i++) {
            const face = i % 6;
            const u = ((i * 17) % 100) / 50 - 1;
            const v = ((i * 31) % 100) / 50 - 1;
            const jitter = ((i * 13) % 20 - 10) * 0.01;

            if (face === 0) pts.push({ x: size, y: u * size, z: v * size });
            else if (face === 1) pts.push({ x: -size, y: u * size, z: v * size });
            else if (face === 2) pts.push({ x: u * size, y: size, z: v * size });
            else if (face === 3) pts.push({ x: u * size, y: -size, z: v * size });
            else if (face === 4) pts.push({ x: u * size, y: v * size, z: size });
            else pts.push({ x: u * size, y: v * size, z: -size });

            pts[pts.length - 1].x += jitter;
            pts[pts.length - 1].y += jitter;
            pts[pts.length - 1].z += jitter;
          }
          break;
        }

        case 'scatter': {
          // Volumetric cosmic data cloud
          for (let i = 0; i < count; i++) {
            const rx = (Math.sin(i * 12.9898) * 43758.5453 % 1) - 0.5;
            const ry = (Math.sin(i * 78.233) * 43758.5453 % 1) - 0.5;
            const rz = (Math.sin(i * 37.719) * 43758.5453 % 1) - 0.5;
            pts.push({
              x: rx * 3.2,
              y: ry * 2.3,
              z: rz * 2.3
            });
          }
          break;
        }

        case 'star': {
          // Radiant 5-Pointed Star (for achievements)
          const outerR = 1.15;
          const innerR = 0.46;
          const starPoints = [];

          for (let k = 0; k < 5; k++) {
            const outAngle = -Math.PI / 2 + (k * 2 * Math.PI) / 5;
            const inAngle = outAngle + Math.PI / 5;
            starPoints.push({ x: Math.cos(outAngle) * outerR, y: Math.sin(outAngle) * outerR });
            starPoints.push({ x: Math.cos(inAngle) * innerR, y: Math.sin(inAngle) * innerR });
          }

          for (let i = 0; i < count; i++) {
            const seg = i % 10;
            const nextSeg = (seg + 1) % 10;
            const t = ((i * 7) % 23) / 23;
            const p1 = starPoints[seg];
            const p2 = starPoints[nextSeg];

            const x = p1.x + (p2.x - p1.x) * t;
            const y = p1.y + (p2.y - p1.y) * t;
            const z = (Math.sin(i * 0.8) * 0.25) * (1 - Math.hypot(x, y) / outerR);

            pts.push({ x, y, z });
          }
          break;
        }

        case 'network': {
          // Geodesic Fibonacci sphere for skills network
          const phiGolden = Math.PI * (1 + Math.sqrt(5));
          for (let i = 0; i < count; i++) {
            const y = 1 - (i / (count - 1)) * 2;
            const radiusAtY = Math.sqrt(1 - y * y);
            const theta = phiGolden * i;
            const r = 1.12;

            pts.push({
              x: Math.cos(theta) * radiusAtY * r,
              y: y * r,
              z: Math.sin(theta) * radiusAtY * r
            });
          }
          break;
        }

        case 'bulb': {
          // 3D Prism / Ideation Lightbulb (for projects)
          for (let i = 0; i < count; i++) {
            const ratio = i / count;
            const angle = (i * 13.5) % (Math.PI * 2);

            if (ratio < 0.65) {
              const phi = (ratio / 0.65) * Math.PI * 0.75;
              const r = 0.82;
              pts.push({
                x: Math.sin(phi) * Math.cos(angle) * r,
                y: -0.85 + (1 - Math.cos(phi)) * 0.9,
                z: Math.sin(phi) * Math.sin(angle) * r
              });
            } else if (ratio < 0.85) {
              const t = (ratio - 0.65) / 0.2;
              const r = 0.5 - t * 0.22;
              const y = 0.35 + t * 0.35;
              pts.push({
                x: Math.cos(angle) * r,
                y,
                z: Math.sin(angle) * r
              });
            } else {
              const t = (ratio - 0.85) / 0.15;
              const r = 0.26;
              const y = 0.72 + t * 0.3;
              pts.push({
                x: Math.cos(angle) * r,
                y,
                z: Math.sin(angle) * r
              });
            }
          }
          break;
        }

        case 'globe': {
          // 3D Globe with latitude & longitude rings (for experience)
          for (let i = 0; i < count; i++) {
            const ring = i % 5;
            const angle = (i / count) * Math.PI * 10;
            const R = 1.12;

            if (ring === 0) {
              pts.push({ x: Math.cos(angle) * R, y: 0, z: Math.sin(angle) * R });
            } else if (ring === 1) {
              const r = R * 0.86;
              pts.push({ x: Math.cos(angle) * r, y: -0.5, z: Math.sin(angle) * r });
            } else if (ring === 2) {
              const r = R * 0.86;
              pts.push({ x: Math.cos(angle) * r, y: 0.5, z: Math.sin(angle) * r });
            } else if (ring === 3) {
              pts.push({ x: Math.cos(angle) * R, y: Math.sin(angle) * R, z: 0 });
            } else {
              const cx = Math.cos(angle) * R;
              const cy = Math.sin(angle) * R;
              pts.push({
                x: cx * 0.5,
                y: cy,
                z: cx * 0.866
              });
            }
          }
          break;
        }

        case 'heart': {
          // 3D Parametric Cardioid Heart (for testimonials)
          for (let i = 0; i < count; i++) {
            const t = (i / count) * Math.PI * 2;
            const sinT = Math.sin(t);
            const x = (16 * Math.pow(sinT, 3)) / 16 * 1.1;
            const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) / 16 * 1.1;
            const z = Math.sin(t * 3) * 0.28;

            pts.push({ x, y: y + 0.1, z });
          }
          break;
        }

        case 'envelope': {
          // 3D Geometric Envelope / Radar Beacon (for contact)
          const w = 1.1;
          const h = 0.7;
          for (let i = 0; i < count; i++) {
            const part = i % 6;
            const t = ((i * 11) % 50) / 50;

            if (part === 0) {
              pts.push({ x: -w + t * (2 * w), y: -h, z: 0 });
            } else if (part === 1) {
              pts.push({ x: -w + t * (2 * w), y: h, z: 0 });
            } else if (part === 2) {
              const side = i % 2 === 0 ? -w : w;
              pts.push({ x: side, y: -h + t * (2 * h), z: 0 });
            } else if (part === 3) {
              pts.push({ x: -w + t * w, y: -h + t * (h + 0.15), z: t * 0.15 });
            } else if (part === 4) {
              pts.push({ x: w - t * w, y: -h + t * (h + 0.15), z: t * 0.15 });
            } else {
              const pulseR = 0.3 + t * 0.5;
              const pAngle = t * Math.PI * 4;
              pts.push({
                x: Math.cos(pAngle) * pulseR,
                y: 0.15 + Math.sin(pAngle) * (pulseR * 0.6),
                z: Math.sin(pAngle * 2) * 0.2
              });
            }
          }
          break;
        }

        default:
          for (let i = 0; i < count; i++) {
            pts.push({ x: 0, y: 0, z: 0 });
          }
      }

      return pts;
    },

    onScroll() {
      const currentScrollY = window.scrollY || window.pageYOffset || 0;
      const delta = currentScrollY - this.lastScrollY;
      this.lastScrollY = currentScrollY;
      this.scrollVelocity = delta;
    },

    onMouseMove(e) {
      this.targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      this.targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    },

    onVisibilityChange() {
      this.isPaused = document.hidden;
      if (!this.isPaused) {
        this.lastTime = performance.now();
      }
    },

    animate(now) {
      this.animationFrameId = requestAnimationFrame(this.animate);
      if (this.isPaused || !this.ctx || !this.canvas) return;

      const delta = Math.min((now - this.lastTime) / 1000, 0.1);
      this.lastTime = now;
      this.elapsedTime += delta;

      this.mouseX += (this.targetMouseX - this.mouseX) * 0.05;
      this.mouseY += (this.targetMouseY - this.mouseY) * 0.05;

      this.scrollVelocity *= 0.92;
      const velocitySpin = Math.min(Math.abs(this.scrollVelocity) * 0.0004, 0.04);

      this.rotY += 0.004 + velocitySpin;
      this.rotX = Math.sin(this.elapsedTime * 0.32) * 0.16 + (this.mouseY * 0.12) - (this.scrollVelocity * 0.0002);

      const isMobile = window.innerWidth < 960;
      const destCX = isMobile ? 0.5 : this.targetCenterX;
      this.currentCenterX += (destCX - this.currentCenterX) * 0.055;

      const width = window.innerWidth;
      const height = window.innerHeight;
      this.ctx.clearRect(0, 0, width, height);

      const projected = [];
      const spread = Math.min(width, height) * 0.44;
      const cosY = Math.cos(this.rotY);
      const sinY = Math.sin(this.rotY);
      const cosX = Math.cos(this.rotX);
      const sinX = Math.sin(this.rotX);
      const fov = 3.3;

      for (let i = 0; i < COUNT; i++) {
        const p = this.particles[i];

        p.x += (p.tx - p.x) * 0.058;
        p.y += (p.ty - p.y) * 0.058;
        p.z += (p.tz - p.z) * 0.058;

        const x1 = p.x * cosY + p.z * sinY;
        const z1 = -p.x * sinY + p.z * cosY;

        const y1 = p.y * cosX - z1 * sinX;
        const z2 = p.y * sinX + z1 * cosX;

        const scale = fov / (fov - z2);
        const sx = width * this.currentCenterX + (x1 * spread * scale) + (this.mouseX * 25);
        const sy = height * 0.5 + (y1 * spread * scale) + (this.mouseY * 20);
        const alpha = Math.max(0.12, Math.min(0.92, 0.28 + (scale - 0.75) * 0.85));

        projected.push({
          p,
          sx,
          sy,
          z: z2,
          scale,
          alpha
        });
      }

      if (this.currentShape === 'network') {
        this.ctx.lineWidth = 0.8;
        for (let i = 0; i < COUNT; i++) {
          for (let j = i + 1; j < COUNT; j++) {
            const dx = this.particles[i].x - this.particles[j].x;
            const dy = this.particles[i].y - this.particles[j].y;
            const dz = this.particles[i].z - this.particles[j].z;
            const distSq = dx * dx + dy * dy + dz * dz;

            if (distSq < 0.24) {
              const lineAlpha = (1 - distSq / 0.24) * 0.26 * ((projected[i].alpha + projected[j].alpha) / 2);
              this.ctx.strokeStyle = this.particles[i].color;
              this.ctx.globalAlpha = lineAlpha;
              this.ctx.beginPath();
              this.ctx.moveTo(projected[i].sx, projected[i].sy);
              this.ctx.lineTo(projected[j].sx, projected[j].sy);
              this.ctx.stroke();
            }
          }
        }
      }

      for (let i = 0; i < COUNT; i++) {
        const item = projected[i];
        const { p, sx, sy, scale, alpha } = item;

        if (p.type === 'triangle') {
          this.ctx.save();
          this.ctx.translate(sx, sy);
          this.ctx.rotate(((p.baseRot + this.rotY * 40) * Math.PI) / 180);
          const size = Math.max(2.5, p.size * scale);

          this.ctx.beginPath();
          this.ctx.moveTo(0, -size * 1.2);
          this.ctx.lineTo(size * 0.86, size * 0.8);
          this.ctx.lineTo(-size * 0.86, size * 0.8);
          this.ctx.closePath();

          this.ctx.fillStyle = p.color;
          this.ctx.globalAlpha = alpha * 0.88;
          this.ctx.fill();
          this.ctx.restore();
        } else if (p.type === 'diamond') {
          this.ctx.save();
          this.ctx.translate(sx, sy);
          this.ctx.rotate(((p.baseRot + this.rotY * 25) * Math.PI) / 180);
          const dSize = Math.max(3, p.size * scale);

          this.ctx.beginPath();
          this.ctx.moveTo(0, -dSize * 1.15);
          this.ctx.lineTo(dSize * 0.8, 0);
          this.ctx.lineTo(0, dSize * 1.15);
          this.ctx.lineTo(-dSize * 0.8, 0);
          this.ctx.closePath();

          this.ctx.strokeStyle = p.color;
          this.ctx.lineWidth = Math.max(1, 1.2 * scale);
          this.ctx.globalAlpha = alpha * 0.85;
          this.ctx.stroke();

          this.ctx.fillStyle = p.color;
          this.ctx.globalAlpha = alpha * 0.22;
          this.ctx.fill();
          this.ctx.restore();
        } else if (p.type === 'ring') {
          this.ctx.save();
          this.ctx.beginPath();
          const rSize = Math.max(2.5, p.size * 0.85 * scale);
          this.ctx.arc(sx, sy, rSize, 0, Math.PI * 2);
          this.ctx.strokeStyle = p.color;
          this.ctx.lineWidth = Math.max(0.9, 1.1 * scale);
          this.ctx.globalAlpha = alpha * 0.85;
          this.ctx.stroke();
          this.ctx.restore();
        } else if (p.type === 'node') {
          this.ctx.save();
          this.ctx.beginPath();
          this.ctx.arc(sx, sy, Math.max(1.8, 2.4 * scale), 0, Math.PI * 2);
          this.ctx.fillStyle = p.color;
          this.ctx.globalAlpha = alpha * 0.9;
          this.ctx.fill();
          this.ctx.restore();
        } else if (p.type === 'byte') {
          this.ctx.save();
          const fontSize = Math.max(8, Math.round(p.fontSize * scale));
          this.ctx.font = `600 ${fontSize}px "JetBrains Mono", Menlo, Consolas, monospace`;
          this.ctx.fillStyle = p.color;
          this.ctx.globalAlpha = alpha * 0.88;
          this.ctx.textAlign = 'center';
          this.ctx.textBaseline = 'middle';
          this.ctx.fillText(p.text, sx, sy);
          this.ctx.restore();
        }
      }
    }
  }
};
</script>

<style scoped>
.background-3d-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}

.velvet-constellation-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: block;
}

.ambient-glow-layer {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at 50% 40%,
    var(--color-glow-1) 0%,
    transparent 70%
  );
  pointer-events: none;
  opacity: 0.7;
}
</style>
