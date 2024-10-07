import { createReadStream, createWriteStream } from 'fs';
import { createGzip } from 'zlib';
import path from 'path';
import { fileURLToPath } from 'url';

const compress = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const filePath = path.resolve(__dirname, 'files', 'fileToCompress.txt');
  const archivePath = path.resolve(__dirname, 'files', 'archive.gz');

  const readStream = createReadStream(filePath);
  const writeStream = createWriteStream(archivePath);
  const gzipStream = createGzip();

  readStream.pipe(gzipStream).pipe(writeStream);

  writeStream.on('finish', () => {
    console.log('File has been compressed.');
  });

  readStream.on('error', (err) => {
    console.error('FS operation failed:', err.message);
  });

  writeStream.on('error', (err) => {
    console.error('FS operation failed:', err.message);
  });
};

await compress();