import fs from "fs";
import path from "path";
import sharp from "sharp";

const PUBLIC = path.resolve("public");
const MAX_TEXTURE_SIZE = 1024;
const JPEG_QUALITY = 80;

async function optimizeImage(filePath: string) {
  const ext = path.extname(filePath).toLowerCase();
  if (![".png", ".jpg", ".jpeg", ".webp"].includes(ext)) return;

  const stat = fs.statSync(filePath);
  if (stat.size < 50 * 1024) return; // skip files under 50KB

  const tmpPath = filePath + ".tmp";
  const pipeline = sharp(filePath).resize(MAX_TEXTURE_SIZE, MAX_TEXTURE_SIZE, {
    fit: "inside",
    withoutEnlargement: true,
  });

  if (ext === ".png") {
    await pipeline.png({ compressionLevel: 9, adaptiveFiltering: true }).toFile(tmpPath);
  } else {
    await pipeline.jpeg({ quality: JPEG_QUALITY, progressive: true }).toFile(tmpPath);
  }

  const newStat = fs.statSync(tmpPath);
  if (newStat.size < stat.size) {
    fs.renameSync(tmpPath, filePath);
    console.log(
      `Optimized ${path.relative(PUBLIC, filePath)}: ${(stat.size / 1024).toFixed(1)}KB -> ${(newStat.size / 1024).toFixed(1)}KB`,
    );
  } else {
    fs.unlinkSync(tmpPath);
    console.log(`Skipped ${path.relative(PUBLIC, filePath)}: no gain`);
  }
}

async function walk(dir: string) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(full);
    } else {
      await optimizeImage(full);
    }
  }
}

await walk(PUBLIC);
console.log("Asset optimization complete.");
