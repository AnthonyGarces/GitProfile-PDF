const fs = require('fs');
const util = require('fs');
const axios = require('axios');
const inquirer = require('inquirer');
const convertFactory = require('electron-html-to');

const questions = [
    {
        message: "What's your Github username?",
        name: "Username",
    }, 
    {
        message: "What's your favorite color??",
        name: "Color",
    },
    
]

inquirer
    .prompt(questions)
    .then(function(data) {
        console.log(data.Username + '\n' + data.Color)
    })