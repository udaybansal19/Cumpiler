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
 
routes.post('/', postApi);
 
routes.put('/', (req, res) => {
  return res.send('Received a PUT HTTP method');
});
 
routes.delete('/', (req, res) => {
  return res.send('Received a DELETE HTTP method');
});

function postApi(req,res) {
  postApiFunc = postApiFuncUtil(req,res);
  postApiFunc.next();
}

function* postApiFuncUtil (req, res) {
  console.log("starting...");

  writeFile.writeCodeToFile(req.body.code, 'test.cpp');
  yield;

  compileCode.compileCode();

  yield;

  var compileResult = getCompileOutput();
  console.log("Compile Result: " + compileResult.compileStatus);
   var reqOutput;

  if(compileResult.compileStatus){

    runCode.runCode(req.body.input);
    yield;

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