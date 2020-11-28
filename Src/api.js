const express = require('express');
const writeFile = require("./writeToFile.js");
const compileCode  = require("./compileC++.js");
const runCode = require("./runC++.js");
const routes = express.Router();

let count = 0;

routes.use(express.json());
 
routes.post('/', postApiFuncUtil);

async function postApiFuncUtil (req, res) {
  console.log("starting...");
  
  let id = ++count;

  await writeFile.writeCodeToFile(req.body.code, id);
  
  let compileResult = await compileCode.compileCode(id);
  

  console.log("Compile Result: " + compileResult.status);
  let reqOutput;

  if(compileResult.status){

    let codeOutput = await runCode.runCode(req.body.input, id);

    if(codeOutput.status){
      reqOutput = {
        Code_Compiled: compileResult.status,
        codeStatus: codeOutput.status,
        output: `${codeOutput.output}`,
      }
    }else{
      reqOutput = {
        Code_Compiled: compileResult.status,
        codeStatus: codeOutput.status,
        message: "Code timed out",
      }
    }


  }else{
    reqOutput = {
      Code_Compiled: compileResult.status,
      error: compileResult.output,
    }
  }
  
  return res.send(reqOutput);
}

module.exports = routes;