var fs = require("fs");

module.exports.writeCodeToFile = function (data, id){
   return new Promise( (resolve, reject) => {
      fs.writeFile('./codeFiles/' + id + '.cpp', data , function(err) {
         if (err) {
            console.error(err);
            reject();
         }
         console.log("Data written successfully");
         resolve();
      });
   });
}