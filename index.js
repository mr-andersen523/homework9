//npm packages

const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const convertFactory = require('electron-html-to');

// const generateHTML = require('./generateHTML.js')

var conversion = convertFactory({
    converterPath: convertFactory.converters.PDF
  });


let data = {};

let questions = [
    {
        message: 'What is your github username?',
        name: 'username',
    },
    {
        message: 'What is your favorite color',
        name: 'color',
        type: 'list',
        choices: ['Green', 'Blue', 'Pink', 'Red'],
    }
]


// function writeToFile(fileName, data) {
 
// } not necessary with electron-html-to

function init() {
    inquirer
    .prompt(questions)
    .then(function ({username, color}) {
        const queryUrl = `https://api.github.com/users/${username}`; 

        axios
            .get(queryUrl)
            .then((res) => {    
                // console.log(res.data)

                

                switch(color) {
                    case 'green':
                        data.color = 0;
                        break;
                    case 'blue':
                        data.color = 1;
                        break;  
                    case 'pink':
                        data.color = 2;
                        break;
                    case 'red':
                        data.color = 3;
                        break;
                }      
                // console.log(data.color)  

                data.username = username;
                data.repos = res.data.public_repos;
                data.name = res.data.name
                data.followers = res.data.followers;
                data.following = res.data.following;
                data.avatar = res.data.avatar_url;
                data.location = res.data.location;
                data.blog = res.data.blog; 
                data.company = res.data.company
                data.bio = res.data.bio

                axios // Requires a different axios call to get stars
                    .get(`https://api.github.com/users/${username}/repos?per_page=100`)
                    .then((res) => {
                        // console.log(res)
                        data.stars = 0;
                        for (let i = 0; i < res.data.length; i++) { // Loop through each repository and count the number of stars
                            data.stars += res.data[i].stargazers_count;
                        }
                        

                        // console.log(data.stars)

                        let resumeHTML = generateHTML(data);
                        // console.log(resumeHTML)

                        conversion({ html: resumeHTML }, function(err, result) {
                            if (err) {
                              return console.error(err);
                            }
                           
                            console.log(result.numberOfPages);
                            console.log(result.logs);
                            result.stream.pipe(fs.createWriteStream('./resume.pdf'));
                            conversion.kill(); // necessary if you use the electron-server strategy, see bellow for details
                          });
                    })

                


               

            })
    })
}

init();

const colors = [ // Array to be referenced for generate HTML; Uses prompt for color through inquirer above
   { // Green
      wrapperBackground: "#ACCC98",
      headerBackground: "#48A01D",
      headerColor: "black",
      photoBorderColor: "#41493B"
    },
    { // Blue
      wrapperBackground: "#5E9FE0",
      headerBackground: "#156CA8", 
      headerColor: "white",
      photoBorderColor: "#00B2A0"
    },
    {
     // Pink
      wrapperBackground: "#FFE6FF",
      headerBackground: "#EA7CDD",
      headerColor: "white",
      photoBorderColor: "#827FAF"
    },
    { // Red
    wrapperBackground: "#F3E5E5",
    headerBackground: "#DE3131",
      headerColor: "white",
      photoBorderColor: "white"
    }
];
  
  function generateHTML(data) { // Generates HTML based on data given to create a PDF resume
    return `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"/>
        <link href="https://fonts.googleapis.com/css?family=Press+Start+2P&display=swap" rel="stylesheet">
        <title>Github Profile</title>
        <style>  @page {
                margin: 0;
              }
             *,
             *::after,
             *::before {
             box-sizing: border-box;
             }
             html, body {
             padding: 0;
             margin: 0;
             }
             html, body, .wrapper { 
            font-family: 'Press Start 2P', cursive;
             height: 100%;
             }
             .wrapper {
             background-color: ${colors[data.color].wrapperBackground};
             padding-top: 100px;
             }
             body {
             background-color: white;
             -webkit-print-color-adjust: exact !important;
             font-family: 'Press Start 2P', cursive;
             }
             main {
             background-color: #E9EDEE;
             height: auto;
             padding-top: 30px;
             }
             h1, h2, h3, h4, h5, h6 {
            font-family: 'Press Start 2P', cursive;
             margin: 0;
             }
             h1 {
             font-size: 26px;
             }
             h2 {
             font-size: 18px;
             }
             h3 {
             font-size: 16px;
             }
             h4 {
             font-size: 14px;
             }
             h5 {
             font-size: 14px;
             }
             h6 {
             font-size: 14px;
             }
             .photo-header {
             position: relative;
             margin: 0 auto;
             margin-bottom: -50px;
             display: flex;
             justify-content: center;
             flex-wrap: wrap;
             background-color: ${colors[data.color].headerBackground};
             color: ${colors[data.color].headerColor};
             padding: 10px;
             width: 95%;
             border-radius: 6px;
             }
             .photo-header img {
             width: 250px;
             height: 250px;
             border-radius: 50%;
             object-fit: cover;
             margin-top: -75px;
             border: 6px solid ${colors[data.color].photoBorderColor};
             box-shadow: rgba(0, 0, 0, 0.3) 4px 1px 20px 4px;
             }
             .photo-header h1, .photo-header h2 {
             width: 100%;
             text-align: center;
             }
             .photo-header h1 {
             margin-top: 10px;
             }
             .links-nav {
             width: 100%;
             text-align: center;
             padding: 20px 0;
             font-size: 1.1em;
             font-family: 'Press Start 2P', cursive;
             }
             .nav-link {
             display: inline-block;
             margin: 5px 10px;
             font-family: 'Press Start 2P', cursive;
             }
             .workExp-date {
            font-family: 'Press Start 2P', cursive;
             font-size: .7em;
             text-align: right;
             margin-top: 10px;
             }
             .container {
             padding: 50px;
             padding-left: 100px;
             padding-right: 100px;
             }
             .row {
               display: flex;
               flex-wrap: wrap;
               justify-content: space-between;
               margin-top: 20px;
               margin-bottom: 20px;
             }
             .card {
               padding: 20px;
               border-radius: 6px;
               background-color: ${colors[data.color].headerBackground};
               color: ${colors[data.color].headerColor};
               margin: 20px;
             }
             
             .col {
             flex: 1;
             text-align: center;
             }
             a, a:hover {
             text-decoration: none;
             color: inherit;
             font-weight: bold;
             }
             @media print { 
              body { 
                zoom: .75; 
              } 
             }
          </style>
          <body>
           <div class="wrapper">
          <div class="photo-header">
            <img class="" src="${data.avatar}" />
            <h1>Hi!</h1>
            <h1>My name is ${data.name}</h1>
            <div class="links-nav">
              <a
                class="nav-link" style="font-family: 'Press Start 2P', cursive
                href="https://www.google.com/maps/place/${data.location}"
                ><i class="fas fa-map-marker-alt">${data.location} </i>
              </a>
              <a class="nav-link" href="https://www.github.com/${data.username}"
                ><i class="fab fa-github"></i> GitHub</a
              >
              <a class="nav-link" href="${data.blog}"
                ><i class="fas fa-rss"></i> Blog</a
              >
            </div>
          </div>
          <main>
            <div class="container">
              <h1 class="col">${data.bio}</h1>
              <div class="card-deck">
                <div class="card col col-sm-6">
                  <h2>Followers</h2>
                  <h3>${data.followers}</h3>
                </div>
                <div class="card col col-sm-6">
                  <h2>Following</h2>
                  <h3>${data.following}</h3>
                </div>
              </div>
              <br />
              <div class="card-deck">
                <div class="card col col-sm-6">
                  <h2>GitHub stars</h2>
                  <h3>${data.stars}</h3>
                </div>
                <div class="card col col-sm-6">
                  <h2>Public Repos</h2>
                  <h3>${data.repos}</h3>
                </div>
              </div>
              <br />
            </div>
          </main>
        </div>
           </body>
          </html>`
          };