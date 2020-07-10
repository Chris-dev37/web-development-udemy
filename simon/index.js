
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPatten = [];

var level = 0;

$(document).keypress(function (e) {

    if (gamePattern === undefined || gamePattern == 0 && e.key === "a") {
        nextSequence();
    }
})

function nextSequence() {

    userClickedPatten = [];

    level++;
    $("#level-title").text("level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

}

$(".btn").click(function () {

    userClickedPatten.push(this.id);

    playSound(this.id);

    animatePress(this.id);

    compareArrays(userClickedPatten.length - 1);

})

function compareArrays(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPatten[currentLevel]) {

        console.log("match");

        if (userClickedPatten.length === gamePattern.length) {

            setTimeout(function () {
                nextSequence();
            }, 1000);
        }

    } else {
        console.log("Wrong");

        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any A To Restart");

        startOver();

        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200)
    }


}

function startOver() {

    level = 0;

    gamePattern = [];


}

function playSound(name) {

    var sound = new Audio("sounds/" + name + ".mp3");
    sound.play();
}

function animatePress(currentColor) {

    $("#" + currentColor).addClass("pressed");

    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);

}

