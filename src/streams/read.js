import { createReadStream } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const read = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const filePath = path.resolve(__dirname, 'files', 'fileToRead.txt');

  const fileStream = createReadStream(filePath);

  fileStream.pipe(process.stdout);

  fileStream.on('error', (err) => {
    console.error('FS operation failed', err);
  });
};

await read();