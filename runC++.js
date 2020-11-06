const { spawn } = require('child_process');

module.exports.runCode = function() {

  const run = spawn('a.exe');

  run.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  run.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  run.on('close', (code) => {
    console.log(`Code Compiled with code ${code}`);
  });


}