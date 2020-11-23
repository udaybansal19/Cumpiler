const { spawn } = require('child_process');

var compileOutput;
var compileStatus;

module.exports.compileCode = function() {
  
  const gPlus = spawn('g++', ['./test.cpp']);
  console.log("G++ running...");

  gPlus.stderr.on('data', (data) => {
    compileOutput = "" +  data; 
    console.error(`stderr: ${data}`);
  });
  
  gPlus.on('close', (code) => {
    compileStatus = !code;
    console.log(`Code Compiled with code ${code}`);
    postApiFunc.next();
  });

  gPlus.stdout.on('data', (data) => {
    compileOutput = data;
    console.log(`stdout: ${data}`);
  });
  
}

module.exports.getCompileOutput = function() {
  return {
    compileStatus: compileStatus,
    compileOutput: compileOutput
  };
};