const { spawn } = require('child_process');
let fs = require("fs");

module.exports.compileCode = function(id) {

  return new Promise( (resolve, reject) => {
    const gPlus = spawn('g++', ['./codeFiles/' + id + '.cpp', '-o', './executables/' + id + '.exe']);
    console.log("G++ running...");

    let compileResult = {
      status: false,
      output: ""
    };

    gPlus.stderr.on('data', (data) => {
      compileResult.output += "" +  data;
      resolve(compileResult); 
      console.error(`stderr: ${data}`);
    });
    
    gPlus.on('close', (code) => {
      compileResult.status = !code;
      console.log(`Code Compiled with code ${code}`);
      fs.unlink('./codeFiles/' + id + '.cpp', (err) => {
        if (err) {
          console.error(err)
          return
        }
      });
      resolve(compileResult);
    });

    gPlus.stdout.on('data', (data) => {
      compileResult.Output += "" +  data; 
      console.log(`stdout: ${data}`);
    });
  });
  
}