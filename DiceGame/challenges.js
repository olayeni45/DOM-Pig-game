/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

NOTE:
1.Anything you do in the JavaScript section, you have to update your UI
2. While using document.querySelector, do not forget to add # for ID's and . for Classes
*/




//Defining Variables
var scores, roundScore, activePlayer, gamePlaying;

gamePlaying = true;

var lastDice, newScore, winningValue;

initializeGame();


//Function Declarations
function hideDice() {
    document.getElementById('dice-1').style.display = "none";
    document.getElementById('dice-2').style.display = "none";

};

function initializeGame() {
    //Assigning Variables
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;

    //Setting the global score and the current score to 0
    document.getElementById('score-0').textContent = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('current-1').textContent = 0;

    hideDice(); //To hide the dice before the first player rolls


    document.getElementById('name-0').textContent = "Player 1";
    document.getElementById('name-1').textContent = "Player 2";

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');

    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    document.querySelector('.player-0-panel').classList.add('active');

    gamePlaying = true;
};

function nextPlayer() {
    //Change the active player 
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

    roundScore = 0;
    document.getElementById("current-0").textContent = '0';
    document.getElementById("current-1").textContent = '0';


    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');


    hideDice();


};



//Button roll Event Listener
document.querySelector('.btn-roll').addEventListener("click", function () {

    if (gamePlaying === true) {
        //1. Random Number (1 - 6)
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;


        //2. Display the result
        var diceOne = document.getElementById("dice-1");
        diceOne.style.display = "block";
        diceOne.src = "dice-" + dice1 + ".png";

        var diceTwo = document.getElementById("dice-2");
        diceTwo.style.display = "block";
        diceTwo.src = "dice-" + dice2 + ".png";



        if (dice1 !== 1 && dice2 !== 1) {
            //Add the score to the round value
            roundScore += dice1 + dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        }


        else {
            //Assign the round score  of the active player to 0
            document.querySelector('#current-' + activePlayer).textContent = 0;

            //Next player function
            nextPlayer();
        }

        /*3. Update the round score if the rolled number was not a one AND if it is a one, next player;A player loses his roundscore if
       //he rolls two six in a row
    
       if (dice === 6 && lastDice === 6) {
           //Player looses  global score and current score
           scores[activePlayer] = 0;
           document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
           nextPlayer();
       }
    
       else if (dice !== 1) {
           //Add the score to the round value
           roundScore += dice
           document.querySelector('#current-' + activePlayer).textContent = roundScore;
       }
    
    
       else {
           //Assign the round score  of the active player to 0
           document.querySelector('#current-' + activePlayer).textContent = 0;
    
           //Next player function
           nextPlayer();
       }
    
        lastDice = dice;
       //The first roll of the dice is stored in the dice variable, then the value is further stored in the lastDice variable.
    
       */



    }


});


//Button Hold Event Listener

document.querySelector('.btn-hold').addEventListener("click", function () {

    if (gamePlaying === true) {
        //Add the round score to the global score
        scores[activePlayer] += roundScore;

        //Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        //Input field winning score
        newScore = document.querySelector(".winningScore").value;

        //If statement to check if the input is empty
        if (newScore) {
            winningValue = newScore;
        }
        else {
            winningValue = 100;
        }

        //Check if the current player won the game
        if (scores[activePlayer] >= winningValue) {
            document.querySelector('#name-' + activePlayer).textContent = "Winner!";
            hideDice();
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

            gamePlaying = false;
        }

        else {
            //Next Player
            nextPlayer();
        }
    }


});


//New game Event Listener
document.querySelector('.btn-new').addEventListener("click", initializeGame);