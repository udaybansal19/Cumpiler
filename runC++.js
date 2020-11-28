const { spawn } = require('child_process');

module.exports.runCode = function(input) {

  return new Promise( (resolve, reject) => {
    var run = spawn('a.exe');
    console.log("Code starting to run...");

    var codeResult = {
      output: "",
      status: false
    };

    if(input !== undefined)
      run.stdin.write(input);

    run.stdout.once('data', (data) => {
      codeResult.output += "" + data;
      console.log(`stdout: ${data}`);
    });

    run.stderr.on('data', (data) => {
      codeResult.output += "" + data;
      console.error(`stderr: ${data}`);
      resolve(codeResult);
    });

    run.on('close', (code) => {
      console.log(`Code ran with code ${code}`);
      if(code == null)
        codeResult.status = false;
      else
        codeResult.status = true;
      resolve(codeResult);
    });

    setTimeout( () => {
      if(codeResult.status == false){
        console.log("Code taking too long to execute");
        console.log("killing code");
        
        run.kill('SIGINT');
      }
    },10000);
  });

}

module.exports.getCodeOutput = function() {
  return {
    codeStatus: codeStatus,
    codeOutput: codeOutput
  }
};