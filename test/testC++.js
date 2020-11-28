let request = require("request");
let chai = require("chai");
let expect = chai.expect;
let should = chai.should();

let apiRequest = {
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
        let res = JSON.parse(response.body);
        if( res.should.have.property('output') ){
  
          expect(res.output).to.equal("Hello World!!");
          
          done();
        }
      });
    });

    it("Check for <bits/stdc++.h>", function (done) {

      apiRequest.body = JSON.stringify({"language":"c++","code":"#include<bits/stdc++.h> \n using namespace std; \n int main() { \n cout<<\"Hello World!!\"; \n}"})
      
      request(apiRequest, function (error, response) {
        if (error) throw new Error(error);
        let res = JSON.parse(response.body);
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
        let res = JSON.parse(response.body);
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
        let res = JSON.parse(response.body);
        if( res.should.have.property('output') ){
  
          expect(res.output).to.equal("Hello World!!");
          
          done();
        }
      });
    });
  });

  describe('Test for Inputs', function() {

    it('Single Line Integer Input', function(done) {
      apiRequest.body = JSON.stringify({"language":"c++","input":"11\n","code":"#include<iostream> \n using namespace std; \n int main() { \n int n; \n cin>>n; \n cout<<n; \n}"})
      
      request(apiRequest, function (error, response) {
        if (error) throw new Error(error);
        let res = JSON.parse(response.body);
        if( res.should.have.property('output') ){
  
          expect(res.output).to.equal("11");
          
          done();
        }
      });
    });

    it('Single Line String Input without space', function(done) {
      apiRequest.body = JSON.stringify({"language":"c++","input":"Hello\n","code":"#include<iostream> \n using namespace std; \n int main() { \n string n; \n cin>>n; \n cout<<n; \n}"})
      
      request(apiRequest, function (error, response) {
        if (error) throw new Error(error);
        let res = JSON.parse(response.body);
        if( res.should.have.property('output') ){
  
          expect(res.output).to.equal("Hello");
          
          done();
        }
      });
    });

  });

  describe('Compile error', function() {
    it("Test for compile time error", function (done) {

      apiRequest.body = JSON.stringify({"language":"c++","code":"#include<iostrem> \n using namespace std; \n int main() { \n cout<<\"Hello World!!\"; \n}"})
      
      request(apiRequest, function (error, response) {
        if (error) throw new Error(error);
        let res = JSON.parse(response.body);
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
      let res = JSON.parse(response.body);
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

 describe('Handling simultaneous requests', function() {
	 
	 it('10 Simultaneous Requests', function(done) {
		for(let i=1;i<10;i++){
			let temp = i;
			request(newCode(temp), function (error, response) {
				if (error) throw new Error(error);
				let res = JSON.parse(response.body);
				if( res.should.have.property('output') ){

				expect(res.output).to.equal('' + temp);
	
				}
			});
		}
		request(newCode(0), function (error, response) {
			if (error) throw new Error(error);
			let res = JSON.parse(response.body);
			if( res.should.have.property('output') ){

			expect(res.output).to.equal('' + 0);
			done();

			}
		});
	});
 });

});

function newCode(seed){
	let apiRequest = {
		'method': 'POST',
		'url': 'http://localhost:3000/runCode',
		'headers': {
		  'Content-Type': 'application/json'
		}
	  };
	apiRequest.body = JSON.stringify({"language":"c++","code":"#include<iostream> \n using namespace std; \n int main() { \n cout<<" + seed + "; \n}"});
	return apiRequest;  
}
