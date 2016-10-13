var fs = require('fs');
var request = require('request');
var Twitter = require('twitter');
var spotify = require('spotify');

var inputString = process.argv;


var operand = inputString[2];
var name = inputString[3];


switch(operand){
    case "my-tweets":
        twitter();
        break;
    case "spotify-this-song":
        spot();
        break;
    case "movie-this":
        movie();
        break;
    case "do-what-it-says":
        doit();
        break;
}

function twitter() {
var client = new Twitter({
  consumer_key: 'jHfeiGNdz0gl5EdVXhuqTfJc7',
  consumer_secret: '3vuyEgwcZ2jtUFXTOYOprCANXetSysEo5sJvA2EgFFV6c6WmwU',
  access_token_key: '784776497479421952-EDhtTsMTlzFDJPqFH9WEjghvJBxQP2F',
  access_token_secret: 'r89UudZqSJ4yb0w8RW6nwFp6WyvexGNFM0ESaflYYzSMm',
});  // the client information has to be inside here! otherwise, it will be out of scope

    var params = {SunShine32111: 'nodejs'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    for (var i = 0; i < 20; i++) {
        console.log(tweets[i].text);
    }
    console.log("------------------------------------------------");
  }
})
}

function spot() {
/*spotify.search({ type: 'track', query: 'dancing in the moonlight' }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }
 
    // Do something with 'data' 
});*/
    if (name !=null){
    spotify.search({ type: 'track', query: name }, function(err, data) {
      if ( err ) {
        console.log('Error occurred: ' + err);
        return;
      } else{
        /*console.log(data);*/  //was used to check the data
      }

      
      /*console.log("Artist Name: " + data.tracks.items[0].name);*/
        console.log("Artist Name: "+data.tracks.items[0].artists[0].name);
        console.log("Song Name: "+data.tracks.items[0].name);
        console.log("Preview: "+data.tracks.items[0].preview_url);
        console.log("Album Name: "+data.tracks.items[0].album.name);
      


      });
    } else {
        spotify.search({ type: 'track', query: 'the sign' }, function(err, data) {
      if ( err ) {
        console.log('Error occurred: ' + err);
        return;
      } else {
        /*console.log(data);*/  //was used to check the data
      }

      /*console.log("Artist Name: " + data.tracks.items[0].name);*/   
    console.log("Artist Name: "+data.tracks.items[6].artists[0].name);
    console.log("Song Name: "+data.tracks.items[6].name);
    console.log("Preview: "+data.tracks.items[6].preview_url);
    console.log("Album Name: "+data.tracks.items[6].album.name);  
    console.log("----------------------------------------");
      });
    }
} 


function movie() {
/*    var imdb = require('imdb');
 
imdb('tt3659388', function(err, data) {
  if(err)
    console.log(err.stack);
 
  if(data)
    console.log(data);
});
*/
/*    request('http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&r=json', function (error, response, body) {

    // If the request is successful (i.e. if the response status code is 200)
    if (!error && response.statusCode == 200) {

        // Parse the body of the site and recover just the imdbRating
        // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it). 
        console.log("The movie's ")
        console.log("The movie's rating is: " + JSON.parse(body)["imdbRating"])
    }
    }); */

        if (name !=null){
        var queryURL = "http://www.omdbapi.com/?t=" + name + "&y=&plot=short&tomatoes=true&r=json";

        request(queryURL, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log("Movie Title: " + JSON.parse(body)["Title"]);
                console.log("Year of Release: " + JSON.parse(body)["Year"]);
                console.log("IMDb Rating: " + JSON.parse(body)["imdbRating"]);
                console.log("Country: " + JSON.parse(body)["Country"]);
                console.log("Language: " + JSON.parse(body)["Language"]);
                console.log("Plot: " + JSON.parse(body)["Plot"]);
                console.log("Actors: " + JSON.parse(body)["Actors"]);
                console.log("Rotten Tomatoes Rating: " + JSON.parse(body)["tomatoRating"]);
                console.log("Rotten Tomatoes URL: " + JSON.parse(body)["tomatoURL"]);
                console.log("------------------------------------------------");
            }
        });
      } else{
        var queryURL = "http://www.omdbapi.com/?t=Mr+Nobody&y=&plot=short&tomatoes=true&r=json";

        request(queryURL, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log("Movie Title: " + JSON.parse(body)["Title"]);
                console.log("Year of Release: " + JSON.parse(body)["Year"]);
                console.log("IMDb Rating: " + JSON.parse(body)["imdbRating"]);
                console.log("Country: " + JSON.parse(body)["Country"]);
                console.log("Language: " + JSON.parse(body)["Language"]);
                console.log("Plot: " + JSON.parse(body)["Plot"]);
                console.log("Actors: " + JSON.parse(body)["Actors"]);
                console.log("Rotten Tomatoes Rating: " + JSON.parse(body)["tomatoRating"]);
                console.log("Rotten Tomatoes URL: " + JSON.parse(body)["tomatoURL"]);
                console.log("If You haven't watch this movie, you should! ... (Idk why I should put this here, lol)")
                console.log("------------------------------------------------");
            }
          });
    }
}

function doit() {
          fs.readFile("random.txt", "utf8", function(error, data) {

            var dataArr = data.split(',');

/*            if ( err ) {
            console.log('getRandom error: ' + err);
            return;
        } else*/
        console.log("---------------------------------------------------------------------------");
        console.log(data);
    
    
        
        spot(dataArr[1]);
    });
};


/*no energy for the log.txt... but it literally should be easy, something like "fs.writeFile" 
or "fs.appendFile" in order to keep what it had and keep writing.*/