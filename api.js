 
const routes = require('express').Router();
 
routes.get('/', (req, res) => {
  return res.send('Received a GET HTTP method');
});
 
routes.post('/', (req, res) => {
  return res.send('Received a POST HTTP method');
});
 
routes.put('/', (req, res) => {
  return res.send('Received a PUT HTTP method');
});
 
routes.delete('/', (req, res) => {
  return res.send('Received a DELETE HTTP method');
});

module.exports = routes;