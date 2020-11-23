const express = require('express');
const writeFile = require("./writeToFile.js");
const compileCode  = require("./compileC++.js");
const runCode = require("./runC++.js");
const routes = express.Router();

const compileOutput = require('./compileC++').compileOutput;
const codeOutput = require('./runC++').codeOutput;

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
  writeFile.writeCodeToFile(req.body.code);
  yield;
  compileCode.compileCode();
  yield;
  var compileResult = compileOutput();
    console.log("Compile Result: " + compileResult);
    runCode.runCode();
    var reqOutput;
  if(compileResult.compileStatus){
    yield;
    var codeStdOutput = codeOutput();
    console.log("Code Std output: " + codeStdOutput);
    reqOutput = {
      codeCompiledCode: compileResult.compileStatus,
      output: `${codeStdOutput}`,
    }
  }else{
    reqOutput = {
      codeCompiledCode: compileResult.compileStatus,
      error: compileResult.compileOutput,
    }
  }
  
  
  return res.send(reqOutput);
}

module.exports = routes;