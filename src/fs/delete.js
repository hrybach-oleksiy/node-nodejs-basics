import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const remove = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const filePath = path.resolve(__dirname, 'files', 'fileToRemove.txt');

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
    await fs.unlink(filePath);
    console.log('File removed successfully');
  } catch (error) {
    console.error('Error while removing file:', error.message);
  }
};

await remove();