const { spawn } = require('child_process');

module.exports.compileCode = function() {

  const gPlus = spawn('g++', ['./test.cpp']);

  gPlus.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  gPlus.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  gPlus.on('close', (code) => {
    returnCode = code;
    console.log(`Code Compiled with code ${code}`);
  });
}