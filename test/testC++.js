var request = require("request");
var chai = require("chai");
var expect = chai.expect;
var should = chai.should();

var apiRequest = {
  'method': 'POST',
  'url': 'http://localhost:3000/runCode',
  'headers': {
    'Content-Type': 'application/json'
  }
};

describe("POST Api /runCode", function() {

  it("Test for Hello World code", function () {

    apiRequest.body = JSON.stringify({"language":"c++","code":"#include<iostream> \n using namespace std; \n int main() { \n cout<<\"Hello World!!\"; \n}"})
    
    request(apiRequest, function (error, response) {
      if (error) throw new Error(error);
      var res = JSON.parse(response.body);
      if( res.should.have.property('output') ){
        expect(res.output).to.equal("Hello World!!"); 
      }
    });
  });

});