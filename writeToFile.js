var fs = require("fs");

module.exports.writeCodeToFile = function(data, filename){
   fs.writeFile(filename, data , function(err) {
      if (err) {
         return console.error(err);
      }
      console.log("Data written successfully!");
      postApiFunc.next();
   });
}
