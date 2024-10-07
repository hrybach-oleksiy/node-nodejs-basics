import { createReadStream } from 'fs';
import { createHash } from 'crypto';
import path from 'path';
import { fileURLToPath } from 'url';

const calculateHash = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const filePath = path.resolve(__dirname, 'files', 'fileToCalculateHashFor.txt');

  const hash = createHash('sha256');
  const fileStream = createReadStream(filePath);

  fileStream.on('data', (chunk) => {
    hash.update(chunk); 
  });

  fileStream.on('end', () => {
    const result = hash.digest('hex'); 
    console.log(result); 
  });

  fileStream.on('error', (err) => {
    console.error('FS operation failed', err);
  });
};

await calculateHash();