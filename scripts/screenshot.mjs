// Tira os prints da landing page com Playwright e confere console e rolagem lateral.
// Uso: npm run shots   (saída em .shots/)
import { chromium } from 'playwright';
import { mkdirSync, existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { homedir } from 'node:os';
import { startServer } from './serve.mjs';

const out = new URL('../.shots/', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
mkdirSync(out, { recursive: true });

function findChrome() {
  const base = join(process.env.LOCALAPPDATA || join(homedir(), 'AppData', 'Local'), 'ms-playwright');
  if (!existsSync(base)) return undefined;
  const dir = readdirSync(base).filter((d) => d.startsWith('chromium-')).sort().pop();
  const exe = dir && join(base, dir, 'chrome-win64', 'chrome.exe');
  return exe && existsSync(exe) ? exe : undefined;
}

const { server, port } = await startServer(0);
const url = `http://127.0.0.1:${port}/index.html`;
let browser;
try {
  browser = await chromium.launch();
} catch {
  browser = await chromium.launch({ executablePath: findChrome() });
}

async function scrollThrough(page) {
  const h = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < h; y += 500) { await page.evaluate((v) => scrollTo(0, v), y); await page.waitForTimeout(60); }
  await page.evaluate(() => scrollTo(0, 0));
  await page.waitForTimeout(500);
}

async function run(name, { width, height, full, reduced = false, extra, sections = false }) {
  const ctx = await browser.newContext({ viewport: { width, height }, reducedMotion: reduced ? 'reduce' : 'no-preference', deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  const logs = [];
  page.on('console', (m) => { if (['error', 'warning'].includes(m.type())) logs.push(`${m.type()}: ${m.text()}`); });
  page.on('pageerror', (e) => logs.push(`pageerror: ${e.message}`));
  page.on('requestfailed', (r) => { if (!/fonts\.g/.test(r.url())) logs.push(`requestfailed: ${r.url()}`); });
  await page.goto(url, { waitUntil: 'networkidle' }).catch(() => page.goto(url));
  await page.evaluate(() => document.fonts && document.fonts.ready);
  if (full) await scrollThrough(page);
  if (extra) await extra(page);
  if (sections) {
    const ids = await page.$$eval('main > section[id], footer', (els) => els.map((e) => e.id || e.tagName.toLowerCase()));
    for (const id of ids) {
      const el = await page.$(id === 'footer' ? 'footer' : '#' + id);
      if (id === 'hero') continue;
      await el.screenshot({ path: join(out, name + '-' + id + '.png') });
    }
  }
  const overflow = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth }));
  await page.screenshot({ path: join(out, `${name}.png`), fullPage: !!full });
  console.log(`${name}: ${width}px, rolagem horizontal: ${overflow.sw > overflow.cw ? `SIM (${overflow.sw} > ${overflow.cw})` : 'não'}, console: ${logs.length ? '\n  ' + logs.join('\n  ') : 'limpo'}`);
  await ctx.close();
}

try {
  const sec = process.argv.includes('--sections');
  await run('desktop', { width: 1440, height: 900, full: true, sections: sec });
  await run('mobile', { width: 390, height: 844, full: true, sections: sec });
  await run('hero-desktop', { width: 1440, height: 900 });
  if (process.argv.includes('--extra')) {
    await run('tablet', { width: 768, height: 1024, full: true });
    await run('wide', { width: 1920, height: 1080, full: true });
    await run('small', { width: 360, height: 740, full: true });
    await run('mobile-hero', { width: 390, height: 844 });
    await run('reduced-desktop', { width: 1440, height: 900, full: true, reduced: true });
  }
} finally {
  await browser.close();
  server.close();
}
