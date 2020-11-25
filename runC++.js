const { spawn } = require('child_process');

var codeOutput;
var codeStatus;

module.exports.runCode = function(input) {

  var run = spawn('a.exe');
  console.log("Code starting to run...");

  codeOutput = "";
  codeStatus = false;

  if(input !== undefined)
    run.stdin.write(input);

  run.stdout.once('data', (data) => {
    codeOutput += "" + data;
    console.log(`stdout: ${data}`);
  });

  run.stderr.on('data', (data) => {
    codeOutput += "" + data;
    console.error(`stderr: ${data}`);
  });

  run.on('close', (code) => {
    console.log(`Code ran with code ${code}`);
    if(code == null)
      codeStatus = false;
    else
      codeStatus = true;
    postApiFunc.next();
  });

  setTimeout( () => {
    if(codeStatus == false){
      console.log("Code taking too long to execute");
      console.log("killing code");
      
      run.kill('SIGINT');
    }
  },10000);

}

module.exports.getCodeOutput = function() {
  return {
    codeStatus: codeStatus,
    codeOutput: codeOutput
  }
};