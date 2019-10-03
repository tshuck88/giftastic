// Global variables
var athleteList = ["Michael Jordan", "Tiger Woods", "Stephen Curry", "LeBron James", "James Harden", "Kevin Durant", "Peyton Manning", "Patrick Mahomes", "Aaron Rodgers", "Russell Wilson", "Odell Beckham Jr", "Tom Brady", "Julian Edelman", "Rob Gronkowksi", "Barry Sanders", "Todd Gurley", "Marshawn Lynch", "Mike Trout", "Aaron Judge", "Alex Rodriguez", "Barry Bonds"];
var athlete;
var apiKey = "ZN9GS40jADWRZaul3uTtgqve2lyPsjju";
var next10;

// function that loops through the athelete list array and displays it as buttons
function displayButtons() {
    $("#buttons-container").empty();
    for (var i = 0; i < athleteList.length; i++) {
        var newButton = $('<button type="button" class="btn btn-primary athlete-button">');
        newButton.attr("data-name", athleteList[i]);
        newButton.text(athleteList[i]);
        $("#buttons-container").append(newButton);
    }
}

// function to make the ajax call and display the gifs
function displayGifs() {
    athlete = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&q=" + athlete + "&limit=10";
    next10 = 11; // sets next 10 back to default of 11 whenever a new athlete button is clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var athleteDiv = $("<div class='athlete'>");
        for (var j = 0; j < response.data.length; j++) { // loops the gifs that were returned
            var athleteGif = $("<div class='athlete-gif'>") // creates a new div for each gif
            var rating = response.data[j].rating.toUpperCase();
            var ratingDisplay = $("<p>").text("Rating: " + rating);
            var gifURL = response.data[j].images.fixed_height_still.url;
            var dataStill = response.data[j].images.fixed_height_still.url;
            var dataAnimate = response.data[j].images.fixed_height.url;
            var gif = $("<img class='gif'>").attr({ "src": gifURL, "data-still": dataStill, "data-animate": dataAnimate, "data-state": "still" });
            athleteGif.append(ratingDisplay); 
            athleteGif.append(gif);
            athleteDiv.append(athleteGif); // appends each athlete gif to its own div
        }
        $("#gifs-container").prepend(athleteDiv);
        if ($("#next-10").length == 0) { // adds a next 10 gifs button if one isn't already present
            $("#add-button-container").append('<button type="button" class="btn btn-primary" id="next-10">Next 10 Gifs</button>');
        }
    });
}

// function to tale user input and add it to the athlete list array and display it as a button
$("#add-athlete").on("click", function (event) {
    event.preventDefault();
    var athleteInput = $("#athlete-input");
    var userInput = athleteInput.val().trim().toLowerCase();
    userInput = userInput.split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' '); // capitalizes the beginning letter of each word
    if (userInput !== "" && !athleteList.includes(userInput)) { // only takes the user input if it's not already included in the array
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

// on click function to display gifs when user clicks on the corresponding athlete button
$(document).on("click", ".athlete-button", displayGifs);

// on click function to display the next 10 gifs of the most recent athlete selected
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
    next10 += 10; // increases next 10 counter by 10 to continue showing the next 10 gifs
});

// function to start and stop a gif when it is clicked
$(document).on("click", ".gif", function () {
    var state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr({ "src": $(this).attr("data-animate"), "data-state": "animate" });
    } else {
        $(this).attr({ "src": $(this).attr("data-still"), "data-state": "still" });
    }
});

// calls the display buttons function to display the athlete list as buttons on page load
displayButtons();

