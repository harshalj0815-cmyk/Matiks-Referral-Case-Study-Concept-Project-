import fs from "fs";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const PNG = require("C:/Users/Harshal/AppData/Local/Temp/cursor/png-tools/node_modules/pngjs").PNG;

for (const file of [
  "paper-shine-1xz0.png",
  "paper-shine-close.png",
]) {
  const png = PNG.sync.read(
    fs.readFileSync(`C:/Users/Harshal/AppData/Local/Temp/cursor/screenshots/${file}`),
  );
  const { width: w, height: h, data } = png;
  console.log("\n====", file, w, h);

  function get(x, y) {
    const i = (y * w + x) * 4;
    return [data[i], data[i + 1], data[i + 2]];
  }

  // Find max R channel among lime-ish pixels - shine increases R more than G
  let maxR = 0;
  let maxAt = null;
  const candidates = [];
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const [r, g, b] = get(x, y);
      if (g > 200 && r > 170 && b < 200 && g > r - 20) {
        if (r > maxR) {
          maxR = r;
          maxAt = [x, y, r, g, b];
        }
        if (r >= 200 && b >= 140) candidates.push([x, y, r, g, b]);
      }
    }
  }
  console.log("maxR among lime", maxR, maxAt);
  console.log("whitened count (r>=200,b>=140)", candidates.length);
  if (candidates.length) {
    const xs = candidates.map((c) => c[0]);
    const ys = candidates.map((c) => c[1]);
    console.log("whitened bbox", Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys));
    // sample unique-ish
    console.log("samples", candidates.filter((_, i) => i % Math.ceil(candidates.length / 8) === 0));
  }
}
