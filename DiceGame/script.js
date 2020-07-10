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

gamePlaying = true; //This is a state variable that tells us the game is still active

//Function Call
initializeGame(); //To initialize the game


//Function Declarations
function hideDice() {
    document.querySelector('.dice').style.display = "none";
    //Setting the display property of the dice to none so anytime the page is opened we have to click a button to roll the dice
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

    //When you reset the game, all the scores are going to return to 0 so we can create a game initialization function which we can call
    //at the beginning of the game and when the new game button is clicked


    document.getElementById('name-0').textContent = "Player 1";
    document.getElementById('name-1').textContent = "Player 2";

    //The winner class is removed from both panels
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');

    //The active class is removed from both panels
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    //The active player is set to 1
    document.querySelector('.player-0-panel').classList.add('active');

    gamePlaying = true;
};

function nextPlayer() {
    //Change the active player 
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

    //Start the active player's roundscore from 0
    roundScore = 0;
    document.getElementById("current-0").textContent = '0';
    document.getElementById("current-1").textContent = '0';

    //Toggle class for the active HTML class
    //Toggle adds the class if is not there and removes it if it is there
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    //After the toggle class, the dice display should be set to none for the new player to start his own roll
    hideDice();

    //Next Player function
    //This function resets the current score of both players, toggle the active class and set the display property of the dice to none
};



//Button roll Event Listener
document.querySelector('.btn-roll').addEventListener("click", function () {

    if (gamePlaying === true) {
        //1. Random Number (1 - 6)
        var dice = Math.floor(Math.random() * 6) + 1;

        //2. Display the result
        var diceDom = document.getElementById("dice-1");
        diceDom.style.display = "block";
        diceDom.src = "dice-" + dice + ".png";

        //3. Update the round score if the rolled number was not a one AND if it is a one, next player;
        if (dice !== 1) {
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
    }


});


//Button Hold Event Listener
//The hold button allows the active player to save his score and pass his turn to the next player
document.querySelector('.btn-hold').addEventListener("click", function () {

    if (gamePlaying === true) {
        //Add the round score to the global score
        scores[activePlayer] += roundScore;

        //Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        //Check if the current player won the game
        if (scores[activePlayer] >= 20) {
            document.querySelector('#name-' + activePlayer).textContent = "Winner!";
            hideDice();
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

            gamePlaying = false; //Setting the game playing variable to false to deactivate the game
        }

        else {
            //Next Player
            nextPlayer();
        }
    }


});


//New game Event Listener
document.querySelector('.btn-new').addEventListener("click", initializeGame);