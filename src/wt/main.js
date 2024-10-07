import { cpus } from 'os';
import { Worker } from 'worker_threads';
import path from 'path';

const performCalculations = async () => {
  const cpuCount = cpus().length; 
  const workers = [];
  const results = [];

  for (let i = 0; i < cpuCount; i++) {
      const worker = new Worker(path.resolve('src/wt/worker.js'), {
          workerData: 10 + i, 
      });

      workers.push(new Promise((resolve, reject) => {
          worker.on('message', (result) => {
              resolve({ status: 'resolved', data: result });
          });

          worker.on('error', () => {
              resolve({ status: 'error', data: null });
          });

          worker.on('exit', (code) => {
              if (code !== 0) {
                  resolve({ status: 'error', data: null });
              }
          });
      }));
  }

  results.push(...(await Promise.all(workers)));

  console.log(results); 
};

await performCalculations();