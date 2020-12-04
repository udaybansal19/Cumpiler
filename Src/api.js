const express = require('express');

const codeController = require('./codeController');
const routes = express.Router();

routes.use(express.json());
 
routes.post('/', postApiFuncUtil);

function postApiFuncUtil (req, res) {

  if(!(req.body.hasOwnProperty('language') && req.body.hasOwnProperty('code'))){
    let errorMsg = { error: 'Wrong Api call'};
    res.send(errorMsg);
    return;
  }
  switch(req.body.language){
    case 'c++':
      codeController.handleCPlusPlus(req, res);
      break;
    
    case 'c':
      codeController.handleC(req, res);
      break;

    case 'python':
      codeController.handlePython(req, res);
      break;

    default:
      let errorMsg = { error: req.body.language + ' is not supported'};
      res.send(errorMsg);
      break;

  }

  return;
}

module.exports = routes;