const { spawn } = require('child_process');

var codeOutput;
module.exports.runCode = function() {

  const run = spawn('a.exe');

  run.stdout.on('data', (data) => {
    codeOutput = data;
    console.log(`stdout: ${data}`);
  });

  run.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  run.on('close', (code) => {
    console.log(`Code Compiled with code ${code}`);
    postApiFunc.next();
  });

}

module.exports.codeOutput = function() {
  return codeOutput;
};