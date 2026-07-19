import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.join(__dirname, '..');
const photosSrc = path.join(rootDir, 'photos');
const photosDest = path.join(rootDir, 'public', 'photos');

if (fs.existsSync(photosSrc)) {
  if (!fs.existsSync(photosDest)) {
    fs.mkdirSync(photosDest, { recursive: true });
  }

  const files = fs.readdirSync(photosSrc);
  files.forEach(file => {
    const srcFile = path.join(photosSrc, file);
    const destFile = path.join(photosDest, file);
    if (fs.statSync(srcFile).isFile()) {
      fs.copyFileSync(srcFile, destFile);
      console.log(`[sync-photos] Copied ${file} to public/photos/`);
    }
  });
} else {
  console.log('[sync-photos] Root photos directory does not exist yet.');
}
