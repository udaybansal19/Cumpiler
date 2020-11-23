const { spawn } = require('child_process');
const { resolve } = require('path');
const { stdout } = require('process');

var compileOutput = "hello";
var compileStatus;

module.exports.compileCode = function() {
  
  runGPlus();
  
}

 function runGPlus() {
  const gPlus = spawn('g++', ['./test.cpp']);
  var stdOut;
  console.log("G++ running...");

  gPlus.stderr.on('data', (data) => {
    stdOut = data;
    console.error(`stderr: ${data}`);
  });
  
  gPlus.on('close', (code) => {
    compileOutput = stdOut;
    console.log("Compile Result: " + stdout);
    compileStatus = !code;
    console.log(`Code Compiled with code ${code}`);
    postApiFunc.next();
  });

  gPlus.stdout.on('data', (data) => {
    stdOut = data;
    console.log(`stdout: ${data}`);
  });

}

module.exports.compileOutput = function() {
  return {
    compileStatus: compileStatus,
    compileOutput: compileOutput
  };
};