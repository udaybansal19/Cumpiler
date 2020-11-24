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

  this.timeout(12500);

  describe("Test for Hello World Code", function() {
    it("Default code", function (done) {

      apiRequest.body = JSON.stringify({"language":"c++","code":"#include<iostream> \n using namespace std; \n int main() { \n cout<<\"Hello World!!\"; \n}"})
      
      request(apiRequest, function (error, response) {
        if (error) throw new Error(error);
        var res = JSON.parse(response.body);
        if( res.should.have.property('output') ){
  
          expect(res.output).to.equal("Hello World!!");
          
          done();
        }
      });
    });

    it("Code returns 0", function (done) {

      apiRequest.body = JSON.stringify({"language":"c++","code":"#include<iostream> \n using namespace std; \n int main() { \n cout<<\"Hello World!!\";\n return 0; \n}"})
      
      request(apiRequest, function (error, response) {
        if (error) throw new Error(error);
        var res = JSON.parse(response.body);
        if( res.should.have.property('output') ){
  
          expect(res.output).to.equal("Hello World!!");
          
          done();
        }
      });
    });

    it("Code returns 1", function (done) {

      apiRequest.body = JSON.stringify({"language":"c++","code":"#include<iostream> \n using namespace std; \n int main() { \n cout<<\"Hello World!!\"; \n return 1; \n}"})
      
      request(apiRequest, function (error, response) {
        if (error) throw new Error(error);
        var res = JSON.parse(response.body);
        if( res.should.have.property('output') ){
  
          expect(res.output).to.equal("Hello World!!");
          
          done();
        }
      });
    });
  });

  describe('Compile error', function() {
    it("Test for compile error code", function (done) {

      apiRequest.body = JSON.stringify({"language":"c++","code":"#include<iostrem> \n using namespace std; \n int main() { \n cout<<\"Hello World!!\"; \n}"})
      
      request(apiRequest, function (error, response) {
        if (error) throw new Error(error);
        var res = JSON.parse(response.body);
        if( res.should.have.property('Code_Compiled') ){
  
          expect(res.Code_Compiled).to.be.false;
          res.should.have.property('error');
          
          done(); 
        }
      });
    });
  });

 describe('Runtime Error', function() {
  it("Test for code time out ", function (done) {

    apiRequest.body = JSON.stringify({"language":"c++","code":"#include<iostream> \n using namespace std; \n int main() { \n while(1); \n}"})
    
    request(apiRequest, function (error, response) {
      if (error) throw new Error(error);
      var res = JSON.parse(response.body);
      if( res.should.have.property('Code_Compiled') ){

        expect(res.Code_Compiled).to.be.true;

        if(res.should.have.property('codeStatus')){

          expect(res.codeStatus).to.be.false;

          if(res.should.have.property('message')){

            expect(res.message).to.equal("Code timed out");

            done();
          }
        } 
      }
    });
  });
 });

});
