# giftastic

## Introduction
This project is a simple and responsive website built with Bootstrap, JavaScript, and jQuery that allows the user to search for and display gifs of their favorite athletes.

## How It Works
Users can click on one of the preselected buttons or use the search bar to add a button of their favorite athlete. When the user clicks on on a button, an ajax call is made to the Giphy API to display 10 gifs of the corresponding athlete. Gifs are initially displayed in a still state and the user can click on each gif to start/stop the animation. Users can display more gifs by clicking the "Next 10 Gifs" button which will display after an athlete button is clicked and will continue to show the next 10 gifs of the most recent athlete. Users can click the "Add to Favorites" button to add their favorite gifs to the favorites section which is stored in local storage and will persist through a page refresh. 

When a user attempts to add a name to the buttons list, each word of their input is automatically capitalized and a check is performed to see if that name has already been added. If so, the user will be alerted that they should choose another name. If the user attempts to enter a blank name, they will be alerted to enter the name of an athlete. 

## Deployed Site
Here is a link to the deployed website on Github pages so you can see it in action: https://tshuck88.github.io/giftastic/
