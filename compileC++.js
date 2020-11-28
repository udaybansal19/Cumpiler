const { spawn } = require('child_process');

module.exports.compileCode = function(filename) {

  return new Promise( (resolve, reject) => {
    const gPlus = spawn('g++', [filename]);
    console.log("G++ running...");

    var compileResult = {
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
      resolve(compileResult);
    });

    gPlus.stdout.on('data', (data) => {
      compileResult.Output += "" +  data; 
      console.log(`stdout: ${data}`);
    });
  });
  
}