var athleteList = ["Michael Jordan", "Tiger Woods", "Stephen Curry", "LeBron James", "James Harden", "Kevin Durant", "Peyton Manning", "Patrick Mahomes", "Aaron Rodgers", "Russell Wilson", "Odell Beckham Jr", "Tom Brady", "Julian Edelman", "Rob Gronkowksi", "Barry Sanders", "Todd Gurley", "Marshawn Lynch", "Mike Trout", "Aaron Judge", "Alex Rodriguez", "Barry Bonds"];
var athlete;
var apiKey = "ZN9GS40jADWRZaul3uTtgqve2lyPsjju";
var next10 = 11;

function displayButtons() {
    $("#buttons-container").empty();
    for (var i = 0; i < athleteList.length; i++) {
        var newButton = $('<button type="button" class="btn btn-primary athlete-button">');
        newButton.attr("data-name", athleteList[i]);
        newButton.text(athleteList[i]);
        $("#buttons-container").append(newButton);
    }
}

function displayGifs() {
    athlete = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&q=" + athlete + "&limit=10";
    next10 = 11;
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
            var dataStill = response.data[j].images.fixed_height_still.url;
            var dataAnimate = response.data[j].images.fixed_height.url;
            var gif = $("<img class='gif'>").attr({ "src": gifURL, "data-still": dataStill, "data-animate": dataAnimate, "data-state": "still" });
            athleteGif.append(ratingDisplay);
            athleteGif.append(gif);
            athleteDiv.append(athleteGif);
        }
        $("#gifs-container").prepend(athleteDiv);
        if ($("#next-10").length == 0) {
            $("#add-button-container").append('<button type="button" class="btn btn-primary" id="next-10">Next 10 Gifs</button>');
        }
    });
}

$("#add-athlete").on("click", function (event) {
    event.preventDefault();
    var athleteInput = $("#athlete-input");
    var userInput = athleteInput.val().trim().toLowerCase();
    userInput = userInput.split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
    if (userInput !== "" && !athleteList.includes(userInput)) {
        athleteList.push(userInput);
        displayButtons();
        athleteInput.val("");
    } else if (userInput === "") {
        alert("Please enter the name of an athlete.");
        athleteInput.val("");
    } else {
        for (var k = 0; k < athleteList.length; k++) {
            if (userInput === athleteList[k]) {
                alert("That name has already been added. Please enter another name.");
                athleteInput.val("");
            }
        }
    }
});

$(document).on("click", ".athlete-button", displayGifs);

$(document).on("click", "#next-10", function () {
    var queryNext10 = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&q=" + athlete + "&limit=10&offset=" + next10;
    $.ajax({
        url: queryNext10,
        method: "GET"
    }).then(function (response) {
        var athleteDiv = $("<div class='athlete'>");
        for (var j = 0; j < response.data.length; j++) {
            var athleteGif = $("<div class='athlete-gif'>")
            var rating = response.data[j].rating.toUpperCase();
            var ratingDisplay = $("<p>").text("Rating: " + rating);
            var gifURL = response.data[j].images.fixed_height_still.url;
            var dataStill = response.data[j].images.fixed_height_still.url;
            var dataAnimate = response.data[j].images.fixed_height.url;
            var gif = $("<img class='gif'>").attr({ "src": gifURL, "data-still": dataStill, "data-animate": dataAnimate, "data-state": "still" });
            athleteGif.append(ratingDisplay);
            athleteGif.append(gif);
            athleteDiv.append(athleteGif);
        }
        $("#gifs-container").prepend(athleteDiv);
    });
    next10 += 10;
});

$(document).on("click", ".gif", function () {
    var state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr({ "src": $(this).attr("data-animate"), "data-state": "animate" });
    } else {
        $(this).attr({ "src": $(this).attr("data-still"), "data-state": "still" });
    }
});

displayButtons();

