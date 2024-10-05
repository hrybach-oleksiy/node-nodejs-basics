import path from 'path';
import fs from 'fs/promises'
import { fileURLToPath } from 'url';

const create = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const filePath = path.resolve(__dirname, 'files', 'fresh.txt');
  const content = 'I am fresh and young';

  try {
    await fs.access(filePath);
    throw new Error('FS operation failed');
  } catch (error) {
    if (error.code === 'ENOENT') {
      await fs.writeFile(filePath, content);
      console.log('File created');
    } else {
      console.error(error.message);
    }
  }
};

await create();