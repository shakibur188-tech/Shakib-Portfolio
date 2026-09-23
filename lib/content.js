import fs from 'fs';
import path from 'path';

export function getSiteContent() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'content.json');
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, 'utf8').replace(/^\uFEFF/, '');
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Error reading data/content.json:', e);
  }
  return null;
}
