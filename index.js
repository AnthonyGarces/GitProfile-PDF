const fs = require('fs');
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
    .then(data => {
        //has name, location, bio, avatar url, url, followers, following, repos, blog, username
        const queryUrlUser = `https://api.github.com/users/${data.Username}`;
        //stargazers added up over repos
        const queryUrlRepos = `https://api.github.com/users/${data.Username}/repos?per_page=100`;

        Promise.all(([axios.get(queryUrlUser), axios.get(queryUrlRepos)]))
            .then(function(arr){
            const returns = {
            'name' : arr[0].data.name,
            'avatar' : arr[0].data.avatar_url,
            'company' : arr[0].data.company,
            'blog' : arr[0].data.blog,
            'github' : arr[0].data.html_url,
            'location' : arr[0].data.location,
            'bio' : arr[0].data.bio,
            'repos' : arr[0].data.public_repos,
            'followers' : arr[0].data.followers,
            'following' : arr[0].data.following,
            }
            let stargazers = 0;
            arr[1].data.forEach(y => stargazers += y.stargazers_count); 

            
            var conversion = convertFactory({
                converterPath: convertFactory.converters.PDF
            });

            console.log(data.Color)

            conversion({ html: `<!DOCTYPE html>
            <html lang="en">
            ​
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta http-equiv="X-UA-Compatible" content="ie=edge">
                <title>Github Profile PDF Mock-up</title>
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
            </head>
            ​
            <body style = "text-align: center;
  background-color:#E9E9E9;">

  ​   <div style = "background-color:#99AAFF;
      margin-top: -25px;
      height: 450px;
      ">
      <img
      src="${returns.avatar}"
      alt="Git Photo"
      style = "border-radius: 50%;
        height : 200px; 
        width : 200px;
        border: 8px solid yellow;
        box-shadow: 10px 5px 5px black;
        margin: 30px;
      "
      >
        <div style = "background-color: ${data.Color};
          width: 90%;
          margin-left: 5%;
          height: 350px;
          margin-bottom: -5%;
          margin-top: -5%;
          padding-top: 65px;
          border-radius: 25px"
          >
          
          <!--  class = 'border border-dark mt-1' -->
          <div>
            <h1>Hi!</h1>
            <h1>My name is ${returns.name}!</h1>
            <h3>Currently @ ${returns.company}</h3>
            <!--  class = 'row' -->
            <div style = 'display: inline-block'>
              <!--  class = col -->
              <div>
                <a class= ""
                  href = "google.com/maps/places/${returns.location}"
                  style = ''
                >
                Location
                </a>
              </div>
              <!--  class = col -->
              <div>
                <a class= ""
                  href = "${returns.github}"
                  style = ''
                >
                Github
                </a>
              </div>
              <!-- class = col -->
              <div>
                <a class= ""
                  href = "${returns.blog}"
                  
                >
                Blog
                </a>
              </div>
            </div>

          </div>
        
        </div>
    </div>

            
                <div>
                    <h1>I build things and I teach people how to code.</h1>
                    <br>
                    <div>
                    <div>
                        <h2>Public Repositories:</h2>
                        <h2>${returns.repos}</h2>
                    </div>
                    <div>
                        <h2>Followers:</h2>
                        <h2>${returns.followers}</h2>
                    </div>
                    </div>
                    <div>
                    <div>
                        <h2>Github Stars:</h2>
                        <h2>${stargazers}</h2>
                    </div>
                    <div>
                        <h2>Following:</h2>
                        <h2>${returns.following}</h2>
                    </div>
                    </div> 
                </div>
            
                <div id="FooterDiv">
            
            </body>
            ​
            </html>`}, function(err, PDF) {
                if (err) {
                    return console.log(err);
                }

                console.log(PDF.numberOfPages);
                console.log(PDF.logs);
                console.log('PDF has been made!')
                PDF.stream.pipe(fs.createWriteStream('Profile.pdf'))
            })
        })

    .catch(function(err) {
        console.log(err)
    })
        
     
            
        
})