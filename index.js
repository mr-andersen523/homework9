//npm packages
const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");

const convertFactory = require('electron-html-to');

var conversion = convertFactory({
    converterPath: convertFactory.converters.PDF
  });

  let data = {};



//Questions for prompt

const questions = [
    {
        type: "input",
        message: "What is your GitHub username?",
        name: "username"
    },
    {
        type: "list",
        name: "colors",
        message:"What is your favorite color?",
        choices: ["Green", "Blue", "Pink", "Red"]
    }
];


function init() {
    inquirer
    .prompt(questions)
    .then(function ({username, color}) {
        const queryUrl = `https://api.github.com/users/${username}`; 










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









function writeToFile(fileName, data) {
 
}

function init() {

init();
