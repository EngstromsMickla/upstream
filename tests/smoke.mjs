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
for (const [name, text] of [['index.html', html], ['site.css', css]]) {
  if (/(src|href)\s*=\s*["']?(https?:)?\/\//i.test(text) || /url\(\s*["']?(https?:)?\/\//i.test(text)) fail(name + ' hänvisar till en extern adress');
}
for (const m of html.matchAll(/(?:src|href)="([^"#]+)"/g)) if (!existsSync(join(root, m[1]))) fail('saknad fil: ' + m[1]);
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
  new Function(code)();
  let t = 0; const step = (n) => { for (let i = 0; i < n; i++) { t += 16; cb(t); } };
  step(5);
  handlers.pointerdown({ pointerId: 1, clientX: 300, clientY: 300 }); step(3);
  handlers.pointerdown({ pointerId: 2, clientX: 320, clientY: 180 }); step(1500);
  handlers.pointerdown({ pointerId: 3, clientX: 550, clientY: 520 }); step(200);
  for (const id of ['bSpecs', 'bBim', 'bGhost', 'bSound']) { if (typeof els[id].onclick !== 'function') fail('knappen ' + id + ' saknar funktion'); else els[id].onclick(); }
  step(1500);
  canvas.clientWidth = 360; step(600);
  els.bRestart.onclick(); step(600);
} catch (e) { fail('spelet kraschade: ' + (e && e.stack || e)); }

if (failed) { console.error(failed + ' fel'); process.exit(1); }
console.log('Alla kontroller gick igenom.');
