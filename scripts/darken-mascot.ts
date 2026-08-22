import sharp from "sharp";
import path from "path";

const src = path.resolve("public/3D/mascot.png");
const tmp = path.resolve("public/3D/mascot.tmp.png");

await sharp(src).modulate({ brightness: 0.85 }).toFile(tmp);

import { renameSync } from "fs";
renameSync(tmp, src);

console.log("mascot.png brightness reduced.");
