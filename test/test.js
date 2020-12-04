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

describe("Wrong api calls tests", function() {

  describe("Unsupported language", function() {
		it("Unsupported language", function (done) {

			apiRequest.body = JSON.stringify({"language":"c+" ,"code":"#include<stdio.h> \n int main() { \n printf(\"Hello World!!\"); \n}"})
			
			request(apiRequest, function (error, response) {
				if (error) throw new Error(error);
				let res = JSON.parse(response.body);
				if( res.should.have.property('error') ){
			
					expect(res.error).to.equal('c+ is not supported');
					
					done();
				}
			});
		});
	});

  describe("Wrong request syntax", function() {

	it("Request should contain language attribute", function (done) {

	  apiRequest.body = JSON.stringify({"lang":"c","code":"#include<stdio.h> \n int main() { \n printf(\"Hello World!!\"); \n}"})
	  
	  request(apiRequest, function (error, response) {
			if (error) throw new Error(error);
			let res = JSON.parse(response.body);
			if( res.should.have.property('error') ){
		
				expect(res.error).to.equal("Wrong Api call");
				
				done();
			}
	  });
	});

	it("Request should contain code attribute", function (done) {

		apiRequest.body = JSON.stringify({"language":"c","coe":"#include<stdio.h> \n int main() { \n printf(\"Hello World!!\"); \n}"})
		
		request(apiRequest, function (error, response) {
		  if (error) throw new Error(error);
		  let res = JSON.parse(response.body);
		  if( res.should.have.property('error') ){
	
			expect(res.error).to.equal("Wrong Api call");
			
			done();
		  }
		});
	});

  });

});
