//npm packages
const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");





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
        choices: ["green", "blue", "pink", "red"]
    }
];

function writeToFile(fileName, data) {
 
}

function init() {

init();
