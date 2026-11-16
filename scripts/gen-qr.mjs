// Gera assets/img/qr.svg (QR de verdade, apontando para a página de cadastro).
// Uso: npm run qr
import qrcode from 'qrcode-generator';
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const url = process.argv[2] || 'https://app.zapvu.com.br/cadastro?via=qr-demo';
const qr = qrcode(0, 'M');
qr.addData(url);
qr.make();
const n = qr.getModuleCount();
const quiet = 2;
let d = '';
for (let y = 0; y < n; y++) {
  for (let x = 0; x < n; x++) {
    if (qr.isDark(y, x)) d += `M${x + quiet} ${y + quiet}h1v1h-1z`;
  }
}
const size = n + quiet * 2;
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" shape-rendering="crispEdges"><rect width="${size}" height="${size}" fill="#FFFFFF"/><path d="${d}" fill="#1E2104"/></svg>\n`;
const out = fileURLToPath(new URL('../assets/img/qr.svg', import.meta.url));
writeFileSync(out, svg);
console.log('QR gerado:', out, `(${n}x${n} módulos)`);
