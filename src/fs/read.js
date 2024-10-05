import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const read = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const filePath = path.resolve(__dirname, 'files', 'fileToRead.txt');

  try {
    await fs.access(filePath);
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw new Error('FS operation failed');
    } else {
      throw error;
    }
  }

  try {
    const content = await fs.readFile(filePath, 'utf-8');
    console.log(content);
  } catch (error) {
    console.error('Error while reading file:', error.message);
  }
};

await read();