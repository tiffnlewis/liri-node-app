require('dotenv').config();

var Spotify = require('node-spotify-api');

var axios = require('axios');

var moment = require('moment');

moment().format();

var fs = require('fs');

var userRequest = process.argv[2];

var userSearchItem = process.argv.slice(3);

var userSearch = userSearchItem.join('+');

var bitURL = 'https://rest.bandsintown.com/artists/' + userSearch + '/events?app_id=codingbootcamp';

var omdbUrl = 'http://www.omdbapi.com/?t=' + userSearch + '&y=&plot=short&apikey=trilogy';

//spotify

function searchSpotify() {

    var keys = require('./keys.js');

    var spotify = new Spotify(keys.spotify);

    var songQuery = userSearchItem;

    if (userSearchItem.length < 1) {

        songQuery = 'The Sign Ace of Base';
    }

    spotify.search({ type: 'track', query: songQuery }, function (err, data) {
        if (err) {
            return console.log('Error Occurred: ' + err);
        }
        console.log('\n' + data.tracks.items[0].artists[0].name + ' - < ' + data.tracks.items[0].name + ' >');
        console.log('\n------------------Song Info--------------------------------')
        console.log('Artist: ' + data.tracks.items[0].artists[0].name);
        console.log('Album Name: ' + data.tracks.items[0].album.name);
        console.log('Listen Here: ' + data.tracks.items[0].album.external_urls.spotify);
        console.log('-----------------------------------------------------------');
    });
}

//Bands in Town

function bitSearch() {
    axios.get(bitURL).then(
        function (response) {
            console.log('\n' + response.data[0].lineup);
            console.log('\n----------------Show Info---------------------------------');
            console.log('Venue: ' + response.data[0].venue.name);
            console.log('Location: ' + response.data[0].venue.city + ', ' + response.data[0].venue.region + ', ' + response.data[0].venue.country);
            console.log('Date: ' + moment(response.data[0].datetime).format('L'));
            console.log('------------------------------------------------------------')
        }
    );
}

//OMDB

function omdbSearch (){
    axios.get(omdbUrl).then(
        function (response) {
            console.log('\n' + response.data.Title + '  (' + response.data.Year + ')');
            console.log('\n---------------------Movie Info-----------------------------');
            console.log('IMDB Rating: ' + response.data.imdbRating);
            console.log('Rotten Tomatoes Rating: ' + response.data.Ratings[1].Value);
            console.log('Country: ' + response.data.Country);
            console.log('Language: ' + response.data.Language);
            console.log('Actors: ' + response.data.Actors);
            console.log('Plot: ' + response.data.Plot);
            console.log('------------------------------------------------------------');
        }
    );
}

//user calls

if (userRequest === "spotify-this") {
    searchSpotify();
}
else if (userRequest === "concert-this") {
    bitSearch();
}
else if (userRequest === "movie-this" && userSearchItem.length > 0) {
    omdbSearch();
}
else if (userRequest === "movie-this" && !userSearchItem.length > 0) {
    omdbUrl = "http://www.omdbapi.com/?t=Mr+Nobody&y=&plot=short&apikey=trilogy"
    omdbSearch();
}
else if (userRequest === "do-what-it-says") {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) { return console.log(error); }
        console.log(data);
        var dataArr = data.split('"');
        userRequest = dataArr[0];
        userSearchItem = dataArr[1];
        searchSpotify();
    });
}

//bonus

var searchTxt = userSearchItem;
if (userSearchItem.length < 1) {
    searchTxt = "None"
}
var addText = 'Command: ' + userRequest + 'Search: ' + searchTxt + '(' + moment().format('lll') + ')' + '\r\n';
fs.appendFile("log.txt", addText, function (err) {
    if (err) {
        console.log(err);
    }
    else {
        console.log('log has updated!');
    }
});

    
