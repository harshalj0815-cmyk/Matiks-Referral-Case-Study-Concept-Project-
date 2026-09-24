import fs from "fs";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const PNG = require("C:/Users/Harshal/AppData/Local/Temp/cursor/png-tools/node_modules/pngjs").PNG;

for (const name of ["b2", "b3", "b4", "b5"]) {
  const png = PNG.sync.read(
    fs.readFileSync(
      `C:/Users/Harshal/AppData/Local/Temp/cursor/screenshots/paper-btn-${name}.png`,
    ),
  );
  const { width: w, height: h, data } = png;
  const mid = Math.floor(h / 2);
  const row = [];
  for (let x = 0; x < w; x++) {
    const i = (mid * w + x) * 4;
    row.push([x, data[i], data[i + 1], data[i + 2], data[i] + data[i + 1] + data[i + 2]]);
  }
  const max = Math.max(...row.map((r) => r[4]));
  const min = Math.min(...row.map((r) => r[4]));
  console.log("\n", name, w, h, "lum min/max", min, max);
  // print every 8th or where delta from min > 20
  const interesting = row.filter((r) => r[4] > min + 15);
  console.log(
    "interesting",
    interesting
      .map((r) => `${r[0]}:${r[4]}(${r[1]},${r[2]},${r[3]})`)
      .join(" "),
  );
}
