var fs = require("fs");

module.exports.writeCodeToFile = function(code){
   fs.writeFile('test.cpp', code , function(err) {
      if (err) {
         return console.error(err);
      }
      console.log("Data written successfully!");
      postApiFunc.next();
      // console.log("Let's read newly written data");
      // // Read the newly written file and print all of its content on the console
      // fs.readFile('test.cpp', function (err, data) {
      //    if (err) {
      //       return console.error(err);
      //    }
      //    console.log("Asynchronous read: " + data.toString());
      // });
   });
}

//module.exports = writeCodeToFile;