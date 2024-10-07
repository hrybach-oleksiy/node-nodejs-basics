import { createWriteStream } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const write = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const filePath = path.resolve(__dirname, 'files', 'fileToWrite.txt');

  const writeStream = createWriteStream(filePath);

  process.stdin.pipe(writeStream);

  writeStream.on('finish', () => {
    console.log('Data has been written to file.');
  });

  writeStream.on('error', (err) => {
    console.error('FS operation failed', err);
  });
};

await write();