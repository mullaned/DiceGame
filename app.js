/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


let scores, roundScore, activePlayer, dice;

reset();

//Roll Button Events
document.querySelector('.btn-roll').addEventListener('click', function(){
    //Create Random Number
    dice = Math.floor(Math.random()*6)+1;
    
    //Display the dice
    let diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src="dice-"+dice+".png";
    
    
    if(dice !== 1){
        roundScore += dice;
        document.getElementById('current-'+ activePlayer).textContent = roundScore;
    }else{
        nextPlayer();
        
    }
    
    
});

//Hold Button Events
document.querySelector('.btn-hold').addEventListener('click', function() {
    scores[activePlayer] += roundScore;
    document.getElementById('score-'+activePlayer).textContent = scores[activePlayer];
    if(scores[activePlayer]>=100){
        document.querySelector('#name-'+activePlayer).textContent = 'Winner!';
        document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
        document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.btn-roll').style.display = 'none';
        document.querySelector('.btn-hold').style.display = 'none';
    }else{
        nextPlayer();
    }
    
});

//next player function
function nextPlayer() {
    
    switch(activePlayer){
            case 0:
                roundScore = 0;
                document.getElementById('current-'+ activePlayer).textContent = roundScore;
                document.querySelector('.player-0-panel').classList.toggle('active');
                document.querySelector('.player-1-panel').classList.toggle('active');
                document.querySelector('.dice').style.display = 'none';
                activePlayer++;
                break;
            case  1:
                roundScore = 0;
                document.getElementById('current-'+ activePlayer).textContent = roundScore;
                document.querySelector('.player-1-panel').classList.toggle('active');
                document.querySelector('.player-0-panel').classList.toggle('active');
                document.querySelector('.dice').style.display = 'none';
                activePlayer--;
                break;
        }

}

//Reset the Game
function reset(){
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    
    document.querySelector('.dice').style.display = 'none';
    
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    
    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';
    
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    
    document.querySelector('.btn-roll').style.display = 'block';
    document.querySelector('.btn-hold').style.display = 'block';
    
};

//New Game Event:
document.querySelector('.btn-new').addEventListener('click',reset); 

