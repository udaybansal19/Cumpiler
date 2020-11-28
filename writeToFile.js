var fs = require("fs");

module.exports.writeCodeToFile = function (data, filename){
   return new Promise( (resolve, reject) => {
      fs.writeFile(filename, data , function(err) {
         if (err) {
            console.error(err);
            reject();
         }
         console.log("Data written successfully!");
         console.log(2);
         resolve();
      });
   });
}