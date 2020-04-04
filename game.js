// array of the colors available
var buttonColors = ["red", "blue", "green", "yellow"];

// empty array to store the pattern of the game
var gamePattern = [];

// empty array to store the pattern of the user clicks
var userClickedPattern = [];

// variable to keep track of whether the game has started
var started = false;

// variable to keep track of level of the game
var level = 0;

/* 
Computer is looking for any keypress. 
When key is pressed, if started is false then :
1. we change the header text
2. start the nextSequence
3. set started to true
*/
$(document).keypress(function() {
    if(!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

/* 
If one of the squares is pressed, we grab the id (color) and
push it to the userClickedPattern array. 
Then we call three functions
1. playSound() - to have the game play a sound when a square is pressed
2. animatePress() - to have the button do some animation to reflect it being pressed
3. checkAnswer() - check answer by passing in the latest color the user has chosen
*/
$(".btn").click( function() {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});


/* 
Function to check the userClicked square and the gameChosen square
if the arrays at the curentLevel are equal, we check to see if the positions are
the same - if so, we generate the nextSequence after 1000 ms. 

if the arrays at the currentLevel are not equal, it's game over:
we play the gameover sound
we add a CSS class and then remove it
we update the h1
we call funciton startOver()
*/
function checkAnswer(currentLevel) {
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if(userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 500);
            }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("h1").text("GAME OVER, Press Any Key to Restart");

        setTimeout(function() {
            $("body").removeClass("game-over")
        }, 200);
        startOver();
    }
}

/* 
Function to set the next sequence of colors chosen
color is chosen randomly 
*/
function nextSequence() {

    // Once this function is triggered, we rest the userClickedPattern array
    userClickedPattern= [];

    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    // console.log(userClickedPattern);
    playSound(randomChosenColor);
}


/* 
Function to play the audio file of the color
*/
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}


/*
Function to have the button have animation of pressing
*/
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}


/* 
Function to start the game over by resetting all variables
*/
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}