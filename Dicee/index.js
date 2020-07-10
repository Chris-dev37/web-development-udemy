
var randomNumber1 = Math.ceil(Math.random() * 6);
var randomNumber2 = Math.ceil(Math.random() * 6);

document.getElementById("dice1").setAttribute("src", "images/dice" + randomNumber1 + ".png");
document.getElementById("dice2").setAttribute("src", "images/dice" + randomNumber2 + ".png");

if (randomNumber1 > randomNumber2) {
    document.querySelector("h1").textContent = "Player 1 Wins";
}
else if (randomNumber1 < randomNumber2) {
    document.querySelector("h1").textContent = "Player 2 Wins";
}
else{
    document.querySelector("h1").textContent = "Draw";
}

