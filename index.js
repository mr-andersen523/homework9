//npm packages
const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const util = require("util");

//electron-html-to
var fs = require('fs'),
    convertFactory = require('electron-html-to');

var conversion = convertFactory({
  converterPath: convertFactory.converters.PDF
});

// async
const writeFileAsync = util.promisify(fs.writeFile);
const appendFileAsync = util.promisify(fs.appendFile);
const readFileAsync = util.promisify(fs.readFile);






















// function processFile (input) {
//     conversion ({html: input}, function(err, result) {

//     if (err) {
//         return console.error(err);
//       }

//       console.log(result.numberOfPages);
//       console.log(result.logs);
//       result.stream.pipe(fs.createWriteStream('profile.pdf'));
//       conversion.kill(); // necessary if you use the electron-server strategy, see bellow for details
//     });
// };
