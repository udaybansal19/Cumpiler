var request = require("request");
var chai = require("chai");
var expect = chai.expect;

describe("POST Api /runCode", function() {

  it("Test for Hello World code", function () {
    var options = {
      'method': 'POST',
      'url': 'http://localhost:3000/runCode',
      'headers': {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"language":"c++","code":"#include<iostream> \n using namespace std; \n int main() { \n cout<<\"Hello World!!\"; \n}"})
    
    };
    request(options, function (error, response) {
      if (error) throw new Error(error);
      var res = JSON.parse(response.body);
      expect(res.output).to.equal("Hello World!!");
    });
  });

});