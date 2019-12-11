const fs = require('fs');
const util = require('util');
const axios = require('axios');
const inquirer = require('inquirer');
const convertFactory = require('electron-html-to');

const getUserInfo = util.promisify(function(UserUrl) {
    axios   
        .get(UserUrl)
        .then(info => {
            let name = arr[0].data.name;
            let avatar = arr[0].data.avatar_url;
            let blog = arr[0].data.blog;
            let location = arr[0].data.location;
            let bio = arr[0].data.bio;
            let repos = arr[0].data.public_repos;
            let followers = arr[0].data.followers;
            let following = arr[0].data.following;
            return Promise
        })
})

const getGitStars = util.promisify(function(UserRepos) {
    axios   
        .get(UserRepos)
        .then(Repos => {
            let stargazers = 0;
            Repos.data.forEach(y => stargazers += y.stargazers_count); 
            console.log(stargazers)
            return Promise
        })
})

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
    .then(data => {
        //has name, location, bio, avatar url, url, followers, following, repos, blog, username
        const queryUrlUser = `https://api.github.com/users/${data.Username}`;
        //stargazers added up over each repo ? ask about github stars
        const queryUrlRepos = `https://api.github.com/users/${data.Username}/repos?per_page=100`;

        Promise.all(([axios.get(queryUrlUser), axios.get(queryUrlRepos)]))
            .then(function(arr){
            const returns = {
            'name':arr[0].data.name,
            'avatar' : arr[0].data.avatar_url,
            'blog' : arr[0].data.blog,
            'location' : arr[0].data.location,
            'bio' : arr[0].data.bio,
            'repos' : arr[0].data.public_repos,
            'followers' : arr[0].data.followers,
            'following' : arr[0].data.following,
            }
            let stargazers = 0;
            arr[1].data.forEach(y => stargazers += y.stargazers_count); 

            console.log(returns)


            
        })
        
     
            
        
    })