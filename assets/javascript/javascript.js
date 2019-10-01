var athleteList = ["Michael Jordan", "Tiger Woods", "Stephen Curry", "LeBron James", "James Harden", "Kevin Durant", "Peyton Manning", "Patrick Mahomes", "Aaron Rodgers", "Russell Wilson", "Odell Beckham Jr", "Tom Brady", "Julian Edelman", "Rob Gronkowksi", "Barry Sanders", "Todd Gurley", "Marshawn Lynch", "Mike Trout", "Aaron Judge", "Alex Rodriguez", "Barry Bonds"];

function displayButtons(){
    $("#buttons-container").empty();
    for (var i = 0; i < athleteList.length; i++){
        var newButton = $('<button type="button" class="btn btn-primary">');
        newButton.attr("data-name", athleteList[i]);
        newButton.text(athleteList[i]);
        $("#buttons-container").append(newButton);
    }
}

function displayGifs(){
    var athlete = $(this).attr("data-name");
    var apiKey = "ZN9GS40jADWRZaul3uTtgqve2lyPsjju";
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&q=" + athlete + "&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        var athleteDiv = $("<div class='athlete'>");
        var rating = response.rating;
        var ratingDisplay= $("<p>").text("Rating: " + rating);
        athleteDiv.append(ratingDisplay);
        var gifURL = response.fixed_height_still.url;
        var gif = $("<img>").attr("src", gifURL);
        athleteDiv.append(gif);
        $("#buttons-container").prepend(athleteDiv);
    });
}

