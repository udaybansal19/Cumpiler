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

describe("Test for Python Code", function() {

  this.timeout(12500);

  describe("Test for Hello World Code", function() {
    it("Default code", function (done) {

      apiRequest.body = JSON.stringify({"language":"python","code":"print(\"Hello World!!\")"})
      
      request(apiRequest, function (error, response) {
        if (error) throw new Error(error);
        let res = JSON.parse(response.body);
        if( res.should.have.property('output') ){
  
          expect(res.output).to.equal("Hello World!!\r\n");
          
          done();
        }
      });
    });
		
  });

  describe('Test for Inputs', function() {

    it('String Input', function(done) {
      apiRequest.body = JSON.stringify({"language":"python","input":"Hello\n","code":"str = input()\nprint(str)"})
      
      request(apiRequest, function (error, response) {
        if (error) throw new Error(error);
        let res = JSON.parse(response.body);
        if( res.should.have.property('output') ){
  
          expect(res.output).to.equal("Hello\r\n");
          
          done();
        }
      });
    });

  });

 describe('Runtime Error', function() {

  it("Test for code time out ", function (done) {

    apiRequest.body = JSON.stringify({"language":"python","code":"while 1:\n	continue"})
    
    request(apiRequest, function (error, response) {
      if (error) throw new Error(error);
      let res = JSON.parse(response.body);
      
			if(res.should.have.property('codeStatus')){

				expect(res.codeStatus).to.be.false;

				if(res.should.have.property('error')){

					expect(res.error).to.equal("Code timed out");

					done();
				}
			} 
      
    });
  });

  it("Test for Syntax error", function (done) {

    apiRequest.body = JSON.stringify({"language":"python","code":"prit(\"Hello World\")"})
    
    request(apiRequest, function (error, response) {
      if (error) throw new Error(error);
      let res = JSON.parse(response.body);

        if(res.should.have.property('codeStatus')){

          expect(res.codeStatus).to.be.false;

          if(res.should.have.property('error')){
						
            done();
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

				expect(res.output).to.equal(temp + '\r\n');
	
				}
			});
		}
		request(newCode(0), function (error, response) {
			if (error) throw new Error(error);
			let res = JSON.parse(response.body);
			if( res.should.have.property('output') ){

			expect(res.output).to.equal(0 + '\r\n');
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
	apiRequest.body = JSON.stringify({"language":"python","code":"print(" + seed + ")" })
	return apiRequest;  
}
