const express = require('express');
const writeFile = require("./writeToFile.js");
const compileCode = require("./compileC++.js");
const runCode = require("./runC++.js");
const routes = express.Router();

routes.use(express.json());

routes.get('/', (req, res) => {
  return res.send('Received a GET HTTP method');
});
 
routes.post('/', (req, res) => {
  writeFile.writeCodeToFile(req.body.code);
  compileCode.compileCode();
  //runCode.runCode();
  return res.send(runCode.runCode());
});
 
routes.put('/', (req, res) => {
  return res.send('Received a PUT HTTP method');
});
 
routes.delete('/', (req, res) => {
  return res.send('Received a DELETE HTTP method');
});

module.exports = routes;