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

function getStars(y) {
    let stargazers = 0;
    profile.data.forEach(y => stargazers += y.stargazers_count); 
    console.log(stargazers)
}

inquirer
    .prompt(questions)
    .then(data => {
        //has name, location, bio, avatar url, url, followers, following, repos, blog, username
        const queryUrlUser = `https://api.github.com/users/${data.Username}`;
        //stargazers added up over each repo ? ask about github stars
        const queryUrlRepos = `https://api.github.com/users/${data.Username}/repos?per_page=100`;
        const queryUrlFollowers = `https://api.github.com/users/${data.Username}/followers?per_page=100`;

        axios
            .get(queryUrlUser)
            .then(profile => {
                
          
            })
    })