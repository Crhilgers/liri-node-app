require("dotenv").config();

var spotify = require('node-spotify-api');
var request = require('request');
let figlet = require('figlet');
var bandsintown = require('bandsintown');

var keys = require("./keys.js");
console.log(keys);

var spotify = new spotify(keys.spotify);
var action = process.argv[2];
var userPick = process.argv[3];

console.log(userPick);

run();

function run() {
    switch (action) {

        case "spotify-this-song":
            spotifySong();
            break;

        case "movie-this":
        movieThis();
        break;

        case "concert-this":
        concertThis();
        break;
    };
    console.log(action);
};

function spotifySong() {
    if (!userPick) {
        userPick = "the sign by ace of base"
    };
    // console.log(userPick);

    spotify.search({
        type: 'track',
        query: userPick
    }, function (err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        };
        console.log(userPick);
        var data = data.tracks.items

        console.log("========================")
        console.log("The Artist is: " + data[0].artists[0].name);
        console.log("The song title is: " + data[0].name);
        console.log("Preview Link: " + data[0].preview_url);
        console.log("The album title is: " + data[0].album.name);
    });
};

function movieThis() {
    // console.log(userPick);
    if( !userPick ){
        userPick = "Mr. Nobody."
   };
//    console.log(userPick);

    var queryUrl = "http://www.omdbapi.com/?t=" + userPick + "&y=&plot=short&apikey=dbac5fb1";

    request(queryUrl, function (error, response, body) {

        if (!error && response.statusCode === 200) {

            console.log("Title of the movie: " + JSON.parse(body).Title);
            console.log("Year the movie came out: " + JSON.parse(body).Year);
            console.log("IMDB Rating of the movie: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes Rating of the movie: " + JSON.parse(body).Ratings[2].Value);
            console.log("Country where the movie was produced: " + JSON.parse(body).Country);
            console.log("Language of the movie: " + JSON.parse(body).Language);
            console.log("Plot of the movie: " + JSON.parse(body).Plot);
            console.log("Actors in the movie: " + JSON.parse(body).Actors);
        };  
    });
};
function concertThis(parameter){

    if ('concert-this')
    {
        var artist="";
        for (var i = 3; i < process.argv.length; i++)
        {
            artist+=process.argv[i];
        }
    let bandsFig = "Bandsintown"
        figlet(bandsFig, function(err, data) {
            if (err) {
                console.log('Something went wrong...');
                console.dir(err);
                return;
            }
            console.log(data);
        });
        // console.log(artist);
    }
    else
    {
        artist = parameter;
    }
    
    
    
    var queryUrl = "https://rest.bandsintown.com/artists/"+ artist +"/events?app_id=codingbootcamp";
    
    
    request(queryUrl, function(error, response, body) {
    
      if (!error && response.statusCode === 200) {
    
        var JS = JSON.parse(body);
        for (i = 0; i < JS.length; i++)
        {
          var dateTime = JS[i].datetime;
            var month = dateTime.substring(5,7);
            var year = dateTime.substring(0,4);
            var day = dateTime.substring(8,10);
            var dateForm = month + "/" + day + "/" + year
      
          console.log("\n---------------------------------------------------\n");
          console.log("Name: " + JS[i].venue.name);
          console.log("City: " + JS[i].venue.city);
          if (JS[i].venue.region !== "")
          {
            console.log("Country: " + JS[i].venue.region);
          }
          console.log("Country: " + JS[i].venue.country);
          console.log("Date: " + dateForm);
          console.log("\n---------------------------------------------------\n");
    
        }
      }
    });
    }
    