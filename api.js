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

  await writeFile.writeCodeToFile(req.body.code, './codeFiles/test.cpp');
  
  var compileResult = await compileCode.compileCode('./codeFiles/test.cpp');
  

  console.log("Compile Result: " + compileResult.status);
  var reqOutput;

  if(compileResult.status){

    var codeOutput = await runCode.runCode(req.body.input);

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