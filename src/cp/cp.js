import { spawn } from 'child_process';

const spawnChildProcess = (args) => {
    const child = spawn('node', ['src/cp/files/script.js', ...args]);

    process.stdin.pipe(child.stdin);

    child.stdout.on('data', (data) => {
        process.stdout.write(data);
    });

    child.stderr.on('data', (data) => {
        process.stderr.write(`Error from child process: ${data}`);
    });

    child.on('close', (code) => {
        console.log(`Child process exited with code ${code}`);
    });

    process.stdin.on('end', () => {
        child.stdin.end();
    });
};

spawnChildProcess(['arg1', 'arg2']);