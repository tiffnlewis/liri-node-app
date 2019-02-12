# LIRI Node App
This application is a language interpretation and recognition interface (LIRI). LIRI is a command line node.js app that takes in parameters and gives you back data.

## What Information You Can Get
There are a few things you can do with this application. You can:
1. Search for a song and receive the following information:
    * Artist
    * Album
    * Link to Spotify
2. Search for a concert and receive the following information:
    * Venue
    * Location
    * Date
3. Search for a movie and receive the following information:
    * Release Year
    * IMDB Rating
    * Rotten Tomatoes Rating
    * Country of Production
    * Language
    * Plot
    * Actors
4. Just let the application do it's thing and be surprised!

## How To Use The App
In your command line, you will enter the following paramaters to receive the different information listed above:

Search Query | Parameter Syntax
------------ | ---------------
Song Search | node liri.js spotify-this
Concert Search | node liri.js concert-this
Movie Search | node liri.js movie-this
Surprise Search |  node liri.js do-what-it-says

## Examples Of App In Action
### Song Search
![Song Search](/spotify-this.png)


### Concert Search
![Concert Search](/concert-this.png)


### Movie Search
![Movie Search](/movie-this.png)


### Surprise Search
![Surprise Search](/do-what-it-says.png)
