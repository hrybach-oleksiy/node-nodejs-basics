import { createReadStream, createWriteStream } from 'fs';
import { createGunzip } from 'zlib';
import path from 'path';
import { fileURLToPath } from 'url';

const decompress = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const archivePath = path.resolve(__dirname, 'files', 'archive.gz');
  const outputPath = path.resolve(__dirname, 'files', 'fileToCompress.txt');

  const readStream = createReadStream(archivePath);
  const writeStream = createWriteStream(outputPath);
  const gunzipStream = createGunzip();

  readStream.pipe(gunzipStream).pipe(writeStream);

  writeStream.on('finish', () => {
    console.log('File has been decompressed.');
  });

  readStream.on('error', (err) => {
    console.error('FS operation failed:', err.message);
  });

  writeStream.on('error', (err) => {
    console.error('FS operation failed:', err.message);
  });
};

await decompress();