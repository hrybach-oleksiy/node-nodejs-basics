import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const rename = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const oldFilePath = path.resolve(__dirname, 'files', 'wrongFilename.txt');
  const newFilePath = path.resolve(__dirname, 'files', 'properFilename.md');

  try {
    await fs.access(oldFilePath);
  } catch (error) {
    // if (error.code === 'ENOENT') {
    //   throw new Error('FS operation failed');
    // } else {
    //   // throw error;
    //   console.log('error here')
    // }
    throw new Error('FS operation failed');
    console.log(error)
  }

  // try {
  //   await fs.access(newFilePath);
  //   console.log('error in there')
  //   throw new Error('FS operation failed');
  // } catch (error) {

  //   if (error.code !== 'ENOENT') {
  //     throw error;
  //   }
  // }

  try {
    await fs.rename(oldFilePath, newFilePath);
    console.log('File renamed successfully');
  } catch (error) {
    console.error('Error while renaming:', error.message);
  }
};

await rename();