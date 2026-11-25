// Röktest för Upstream: kör spelet utan webbläsare och kontrollerar sidan.
// Körs i GitHub Actions före varje publicering. Inga beroenden utöver Node.
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', 'site');
let failed = 0;
const fail = (m) => { console.error('FEL: ' + m); failed++; };

// 1. Sidan laddar bara filer från den egna domänen och alla filer finns.
const html = readFileSync(join(root, 'index.html'), 'utf8');
const css = readFileSync(join(root, 'css/site.css'), 'utf8');
// Externa länkar (<a href>) är tillåtna; allt som laddas (src, poster, <link>, url()) ska ligga lokalt.
if (/\s(src|poster)\s*=\s*["']?(https?:)?\/\//i.test(html) || /<link[^>]+href\s*=\s*["']?(https?:)?\/\//i.test(html)) fail('index.html laddar något från en extern adress');
if (/url\(\s*["']?(https?:)?\/\//i.test(css)) fail('site.css laddar något från en extern adress');
for (const m of html.matchAll(/(?:src|href|poster)="([^"#]+)"/g)) { if (/^https?:/.test(m[1])) continue; if (!existsSync(join(root, m[1]))) fail('saknad fil: ' + m[1]); }
for (const m of css.matchAll(/url\(([^)]+)\)/g)) if (!existsSync(join(root, 'css', m[1].replace(/["']/g, '')))) fail('saknad fil i css: ' + m[1]);
const code = readFileSync(join(root, 'js/game.js'), 'utf8');
if (/https?:\/\//.test(code)) fail('game.js innehåller en extern adress');
if (/localStorage|sessionStorage|fetch\(|XMLHttpRequest|sendBeacon|WebSocket/.test(code)) fail('game.js sparar eller skickar data');

// 2. Spelet går att köra i flera minuter i båda lägena utan fel.
const ctx = new Proxy({}, { get: (t, p) => p in t ? t[p] : p === 'measureText' ? () => ({ width: 50 }) : p === 'createLinearGradient' ? () => ({ addColorStop() {} }) : p === 'roundRect' ? undefined : () => {}, set: (t, p, v) => { t[p] = v; return true; } });
const handlers = {}, els = {};
const canvas = { clientWidth: 600, style: {}, getContext: () => ctx, addEventListener: (e, f) => { handlers[e] = f; }, getBoundingClientRect: () => ({ left: 0, top: 0 }), focus() {}, setPointerCapture() {} };
globalThis.document = { getElementById: (id) => id === 'c' ? canvas : (els[id] ||= { textContent: '' }), createElement: () => ({ getContext: () => ctx }), fonts: { load() {} } };
globalThis.window = { devicePixelRatio: 2, addEventListener() {} };
let cb; globalThis.requestAnimationFrame = (f) => { cb = f; }; globalThis.performance = { now: () => 0 };
try {
  new Function(code.replace('requestAnimationFrame(loop);\n})();','requestAnimationFrame(loop);globalThis.__lake=()=>{f.y=L-21;f.x=cx(L);camY=f.y-BACK};\n})();'))();
  let t = 0; const step = (n) => { for (let i = 0; i < n; i++) { t += 16; cb(t); } };
  step(5);
  handlers.pointerdown({ pointerId: 1, clientX: 300, clientY: 300 }); step(3);
  handlers.pointerdown({ pointerId: 2, clientX: 320, clientY: 180 }); step(1500);
  handlers.pointerdown({ pointerId: 3, clientX: 550, clientY: 520 }); step(200);
  for (const id of ['bSpecs', 'bBim', 'bGhost', 'bSound']) { if (typeof els[id].onclick !== 'function') fail('knappen ' + id + ' saknar funktion'); else els[id].onclick(); }
  step(1500);
  canvas.clientWidth = 360; step(600);
  els.bRestart.onclick(); step(600);
  els.bRestart.onclick(); step(10); globalThis.__lake(); step(5); handlers.pointerdown({ pointerId: 5, clientX: 360, clientY: 200 }); step(900); handlers.pointerdown({ pointerId: 6, clientX: 548, clientY: 418 }); step(300);
  if (typeof els.pwForm.onsubmit !== 'function') fail('lösenordsformuläret saknar funktion');
  else {
    els.pwIn.value = 'fel'; els.pwForm.onsubmit({ preventDefault() {} }); if (!els.pwErr.textContent) fail('fel lösenord gav inget felmeddelande');
    els.pwIn.value = ' PlanB4ever '; els.pwForm.onsubmit({ preventDefault() {} }); if (els.pwErr.textContent) fail('rätt lösenord gav felmeddelande'); step(300);
    if (els.bLake.hidden !== false) fail('knappen Till Källsjön visas inte efter besöket');
    els.bLake.onclick(); step(300);
  }
  if (typeof els.bHome.onclick !== 'function') fail('knappen bHome saknar funktion'); else { els.bHome.onclick(); step(60); handlers.pointerdown({ pointerId: 4, clientX: 300, clientY: 300 }); step(300); }
} catch (e) { fail('spelet kraschade: ' + (e && e.stack || e)); }

if (failed) { console.error(failed + ' fel'); process.exit(1); }
console.log('Alla kontroller gick igenom.');
