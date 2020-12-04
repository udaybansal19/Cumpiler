const { spawn } = require('child_process');
let fs = require("fs");

module.exports.runExe = function(input, id) {

  return new Promise( (resolve, reject) => {
    let run = spawn('./executables/' + id + '.exe');
    console.log("Code starting to run...");

    let codeResult = {
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
      fs.unlink('./executables/' + id + '.exe', (err) => {
        if (err) {
          console.error(err)
          return
        }
      });
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

module.exports.runPythonScript = function(input, filename) {

  return new Promise( (resolve, reject) => {
    let run = spawn('python', [filename]);
    console.log("Code starting to run...");

    let codeResult = {
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
      fs.unlink(filename, (err) => {
        if (err) {
          console.error(err)
          return
        }
      });
      resolve(codeResult);
    });

    setTimeout( () => {
      if(codeResult.status == false){
        codeResult.output += "Code timed out";
        console.log("Code taking too long to execute");
        console.log("killing code");
        
        run.kill('SIGINT');
      }
    },10000);
  });

}
