import { copyFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const source = path.join(root, 'public', '_headers');
const targetDir = path.join(root, 'out');
const target = path.join(targetDir, '_headers');

async function main() {
  if (!existsSync(source)) return;
  await mkdir(targetDir, { recursive: true });
  await copyFile(source, target);
  console.log('Copied public/_headers to out/_headers');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
