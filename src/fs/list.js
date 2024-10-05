import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const list = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const folderPath = path.resolve(__dirname, 'files');

  try {
    await fs.access(folderPath);
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw new Error('FS operation failed');
    } else {
      throw error;
    }
  }

  try {
    const files = await fs.readdir(folderPath);
    console.log(files);
  } catch (error) {
    console.error('Error while reading directory:', error.message);
  }
};

await list();