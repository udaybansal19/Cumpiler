const { spawn } = require('child_process');

const gPlus = spawn('g++', ['/mnt/c/Users/dell/Downloads/cumpile/main.cpp']);

gPlus.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

gPlus.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});

gPlus.on('close', (code) => {
  console.log(`Code Compiled with code ${code}`);
});