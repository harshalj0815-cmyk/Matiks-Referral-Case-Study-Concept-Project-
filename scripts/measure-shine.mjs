import fs from "fs";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const PNG = require("C:/Users/Harshal/AppData/Local/Temp/cursor/png-tools/node_modules/pngjs").PNG;

const png = PNG.sync.read(
  fs.readFileSync(
    "C:/Users/Harshal/AppData/Local/Temp/cursor/screenshots/paper-shine-1xz0.png",
  ),
);
const { width: w, height: h, data } = png;
console.log("full", w, h);

function get(x, y) {
  const i = (y * w + x) * 4;
  return [data[i], data[i + 1], data[i + 2]];
}

function isLime(r, g, b) {
  return g > 190 && r > 130 && b < 140 && g - b > 70;
}

// Find all lime buttons as bounding boxes
const visited = new Uint8Array(w * h);
const buttons = [];

function flood(sx, sy) {
  const stack = [[sx, sy]];
  let x0 = sx,
    x1 = sx,
    y0 = sy,
    y1 = sy,
    n = 0;
  visited[sy * w + sx] = 1;
  while (stack.length) {
    const [x, y] = stack.pop();
    n++;
    x0 = Math.min(x0, x);
    x1 = Math.max(x1, x);
    y0 = Math.min(y0, y);
    y1 = Math.max(y1, y);
    for (const [nx, ny] of [
      [x + 1, y],
      [x - 1, y],
      [x, y + 1],
      [x, y - 1],
    ]) {
      if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue;
      const idx = ny * w + nx;
      if (visited[idx]) continue;
      const [r, g, b] = get(nx, ny);
      if (!isLime(r, g, b)) continue;
      visited[idx] = 1;
      stack.push([nx, ny]);
    }
  }
  return { x0, x1, y0, y1, n };
}

for (let y = 0; y < h; y += 2) {
  for (let x = 0; x < w; x += 2) {
    if (visited[y * w + x]) continue;
    const [r, g, b] = get(x, y);
    if (!isLime(r, g, b)) continue;
    const box = flood(x, y);
    if (box.n > 2000 && box.x1 - box.x0 > 150 && box.y1 - box.y0 > 30) {
      buttons.push(box);
    }
  }
}

buttons.sort((a, b) => a.y0 - b.y0 || a.x0 - b.x0);
console.log(
  "buttons",
  buttons.map((b) => ({
    ...b,
    w: b.x1 - b.x0 + 1,
    h: b.y1 - b.y0 + 1,
  })),
);

const base = 176 + 248 + 98;
for (let bi = 0; bi < buttons.length; bi++) {
  const b = buttons[bi];
  const bw = b.x1 - b.x0 + 1;
  const bh = b.y1 - b.y0 + 1;
  console.log(`\n=== btn${bi} ${bw}x${bh} at ${b.x0},${b.y0}`);
  for (const yRel of [0.15, 0.3, 0.5, 0.7, 0.85]) {
    const y = b.y0 + Math.floor(bh * yRel);
    const hits = [];
    for (let x = b.x0; x <= b.x1; x++) {
      const [r, g, bb] = get(x, y);
      const lum = r + g + bb;
      if (lum > base + 35 && r > 190) hits.push(x - b.x0);
    }
    const groups = [];
    if (hits.length) {
      let s = hits[0],
        prev = hits[0];
      for (const x of hits.slice(1)) {
        if (x > prev + 2) {
          groups.push([s, prev, prev - s + 1]);
          s = x;
        }
        prev = x;
      }
      groups.push([s, prev, prev - s + 1]);
    }
    console.log(" yRel", yRel, JSON.stringify(groups));
  }
}
