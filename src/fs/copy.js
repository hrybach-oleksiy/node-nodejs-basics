import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const copy = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const srcFolder = path.resolve(__dirname, 'files');
  const destFolder = path.resolve(__dirname, 'files_copy');

  try {
    await fs.access(srcFolder);
    
    try {
      await fs.access(destFolder);
      throw new Error('FS operation failed'); 
    } catch (error) {
      if (error.code !== 'ENOENT') throw error; 
    }

    await fs.mkdir(destFolder);

    const items = await fs.readdir(srcFolder, { withFileTypes: true });

    for (const item of items) {
      const srcPath = path.resolve(srcFolder, item.name);
      const destPath = path.resolve(destFolder, item.name);

      if (item.isDirectory()) {
        await copyFolder(srcPath, destPath);
      } else {
        await fs.copyFile(srcPath, destPath);
      }
    }

    console.log('Folder copied successfully');
  } catch (error) {
    console.error(error.message);
  }
};

const copyFolder = async (src, dest) => {
  await fs.mkdir(dest);
  const items = await fs.readdir(src, { withFileTypes: true });
  
  for (const item of items) {
    const srcPath = path.resolve(src, item.name);
    const destPath = path.resolve(dest, item.name);

    if (item.isDirectory()) {
      await copyFolder(srcPath, destPath);
    } else {
      await fs.copyFile(srcPath, destPath);
    }
  }
};

await copy();
