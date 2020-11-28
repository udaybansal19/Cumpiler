const express = require('express');
const writeFile = require("./writeToFile.js");
const compileCode  = require("./compileC++.js");
const runCode = require("./runC++.js");
const routes = express.Router();

const getCompileOutput = require('./compileC++').getCompileOutput;
const getCodeOutput = require('./runC++').getCodeOutput;

global.postApiFunc;

routes.use(express.json());

routes.get('/', (req, res) => {
  return res.send('Received a GET HTTP method');
});
 
routes.post('/', postApiFuncUtil);
 
routes.put('/', (req, res) => {
  return res.send('Received a PUT HTTP method');
});
 
routes.delete('/', (req, res) => {
  return res.send('Received a DELETE HTTP method');
});

async function postApiFuncUtil (req, res) {
  console.log("starting...");

  console.log(1);
  await writeFile.writeCodeToFile(req.body.code, './codeFiles/test.cpp');
  console.log(3);
  var compileResult = await compileCode.compileCode('./codeFiles/test.cpp');
  console.log(5);

  console.log("Compile Result: " + compileResult.status);
  var reqOutput;

  if(compileResult.compileStatus){

    var codeOutput = await runCode.runCode(req.body.input);

    var codeOutput = getCodeOutput();

    if(codeOutput.codeStatus){
      reqOutput = {
        Code_Compiled: compileResult.compileStatus,
        codeStatus: codeOutput.codeStatus,
        output: `${codeOutput.codeOutput}`,
      }
    }else{
      reqOutput = {
        Code_Compiled: compileResult.compileStatus,
        codeStatus: codeOutput.codeStatus,
        message: "Code timed out",
      }
    }


  }else{
    reqOutput = {
      Code_Compiled: compileResult.compileStatus,
      error: compileResult.compileOutput,
    }
  }
  
  
  return res.send(reqOutput);
}

module.exports = routes;