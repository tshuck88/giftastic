var athleteList = ["Michael Jordan", "Tiger Woods", "Stephen Curry", "LeBron James", "James Harden", "Kevin Durant", "Peyton Manning", "Patrick Mahomes", "Aaron Rodgers", "Russell Wilson", "Odell Beckham Jr", "Tom Brady", "Julian Edelman", "Rob Gronkowksi", "Barry Sanders", "Todd Gurley", "Marshawn Lynch", "Mike Trout", "Aaron Judge", "Alex Rodriguez", "Barry Bonds"];

function displayButtons() {
     $("#buttons-container").empty();
    for (var i = 0; i < athleteList.length; i++) {
        var newButton = $('<button type="button" class="btn btn-primary athlete-button">');
        newButton.attr("data-name", athleteList[i]).attr("data-state", "still");
        newButton.text(athleteList[i]);
        $("#buttons-container").append(newButton);
    }
}

function displayGifs() {
    var athlete = $(this).attr("data-name");
    var apiKey = "ZN9GS40jADWRZaul3uTtgqve2lyPsjju";
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&q=" + athlete + "&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var athleteDiv = $("<div class='athlete'>");
        for (var j = 0; j < response.data.length; j++) {
            var athleteGif = $("<div class='athlete-gif'>")
            var rating = response.data[j].rating.toUpperCase();
            var ratingDisplay = $("<p>").text("Rating: " + rating);
            var gifURL = response.data[j].images.fixed_height_still.url;
            var gif = $("<img>").attr("src", gifURL);
            athleteGif.append(ratingDisplay);
            athleteGif.append(gif);
            athleteDiv.append(athleteGif)
        }
        $("#gifs-container").prepend(athleteDiv);
    });
}

$("#add-athlete").on("click", function(event) {
    event.preventDefualt();
    var userInput = $("#athlete-input").val().trim();
    console.log(userInput)
    athleteList.push(userInput);
    displayButtons();
});

$(document).on("click", ".athlete-button", displayGifs);

displayButtons();

