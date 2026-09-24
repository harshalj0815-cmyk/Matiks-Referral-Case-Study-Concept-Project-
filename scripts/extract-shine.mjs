import fs from "fs";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const PNG = require("C:/Users/Harshal/AppData/Local/Temp/cursor/png-tools/node_modules/pngjs").PNG;

const png = PNG.sync.read(
  fs.readFileSync(
    "C:/Users/Harshal/AppData/Local/Temp/cursor/screenshots/paper-btn-b2.png",
  ),
);
const { width: w, height: h, data } = png;

function get(x, y) {
  const i = (y * w + x) * 4;
  return [data[i], data[i + 1], data[i + 2], data[i] + data[i + 1] + data[i + 2]];
}

const base = 176 + 248 + 98;
for (const y of [2, 5, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 47]) {
  const hits = [];
  for (let x = 0; x < w; x++) {
    const [r, g, b, lum] = get(x, y);
    // shine: brighter than base lime, not black text
    if (lum > base + 30 && r > 190) hits.push([x, lum, r, g, b]);
  }
  // cluster
  const groups = [];
  if (hits.length) {
    let s = hits[0][0];
    let prev = hits[0][0];
    let maxL = hits[0][1];
    for (const h of hits.slice(1)) {
      if (h[0] > prev + 3) {
        groups.push({ s, e: prev, w: prev - s + 1, maxL });
        s = h[0];
        maxL = h[1];
      }
      prev = h[0];
      maxL = Math.max(maxL, h[1]);
    }
    groups.push({ s, e: prev, w: prev - s + 1, maxL });
  }
  console.log(
    "y",
    y,
    groups.map((g) => `${g.s}-${g.e}(${g.w})@${g.maxL}`).join(" | ") || "none",
  );
}

// Also rebuild shine sprite from b5 (clearer left-edge shine)
const b5 = PNG.sync.read(
  fs.readFileSync(
    "C:/Users/Harshal/AppData/Local/Temp/cursor/screenshots/paper-btn-b5.png",
  ),
);
const bw = b5.width;
const bh = b5.height;
const bd = b5.data;
function get5(x, y) {
  const i = (y * bw + x) * 4;
  return [bd[i], bd[i + 1], bd[i + 2]];
}

// Analyze full column max delta for b5
console.log("\nb5 per-row shine:");
for (const y of [2, 8, 16, 24, 32, 40, 46]) {
  const hits = [];
  for (let x = 0; x < Math.floor(bw * 0.4); x++) {
    const [r, g, b] = get5(x, y);
    const lum = r + g + b;
    if (lum > base + 40 && r > 190) hits.push(x);
  }
  if (!hits.length) {
    console.log("y", y, "none");
    continue;
  }
  const groups = [];
  let s = hits[0];
  let prev = hits[0];
  for (const x of hits.slice(1)) {
    if (x > prev + 2) {
      groups.push([s, prev, prev - s + 1]);
      s = x;
    }
    prev = x;
  }
  groups.push([s, prev, prev - s + 1]);
  console.log("y", y, JSON.stringify(groups));
}

// Extract shine region from b5: columns 0-40, full height, make white alpha
const x0 = 0;
const x1 = 40;
const outW = x1 - x0 + 1;
const out = new PNG({ width: outW, height: bh });
for (let y = 0; y < bh; y++) {
  for (let x = 0; x < outW; x++) {
    const [r, g, b] = get5(x0 + x, y);
    const lum = r + g + b;
    const delta = Math.max(0, lum - base);
    // Only keep brightened green (shine), not darker text
    let a = 0;
    if (r >= 190 && delta > 20) {
      a = Math.min(255, Math.round(((delta - 20) / 100) * 255));
    }
    const i = (y * outW + x) * 4;
    out.data[i] = 255;
    out.data[i + 1] = 255;
    out.data[i + 2] = 255;
    out.data[i + 3] = a;
  }
}
const outPath =
  "C:/Users/Harshal/Desktop/Case Study/public/prototype/matiks/elements/btn-shine.png";
fs.writeFileSync(outPath, PNG.sync.write(out));
console.log("wrote shine asset", outW, bh);

const preview = new PNG({ width: outW + 20, height: bh });
for (let y = 0; y < bh; y++) {
  for (let x = 0; x < outW + 20; x++) {
    const i = (y * (outW + 20) + x) * 4;
    if (x < outW) {
      const a = out.data[(y * outW + x) * 4 + 3] / 255;
      preview.data[i] = Math.round(176 * (1 - a) + 255 * a);
      preview.data[i + 1] = Math.round(248 * (1 - a) + 255 * a);
      preview.data[i + 2] = Math.round(98 * (1 - a) + 255 * a);
    } else {
      preview.data[i] = 176;
      preview.data[i + 1] = 248;
      preview.data[i + 2] = 98;
    }
    preview.data[i + 3] = 255;
  }
}
fs.writeFileSync(
  "C:/Users/Harshal/AppData/Local/Temp/cursor/screenshots/shine-extract-preview.png",
  PNG.sync.write(preview),
);
