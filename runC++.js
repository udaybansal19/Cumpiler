const { spawn } = require('child_process');

var codeOutput;
var codeStatus = false;
module.exports.runCode = function(input) {

  const run = spawn('a.exe');
  console.log("Code starting to run...");

  setTimeout( () => {
    if(codeStatus == false){
      console.log("Code taking too long to execute");
      console.log("killing code");
      
      run.kill('SIGINT');
    }
  },10000);

  run.stdout.on('data', (data) => {
    codeOutput = data;
    console.log(`stdout: ${data}`);
  });

  run.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  run.on('close', (code) => {
    console.log(`Code ran with code ${code}`);
    if(code == null)
      codeStatus = false;
    else
      codeStatus = !code;
    postApiFunc.next();
  });

}

module.exports.getCodeOutput = function() {
  return {
    codeStatus: codeStatus,
    codeOutput: codeOutput
  }
};