losingTheGame = function (game) {

    game = new Game

    game.state = "inGame"
    game.player.move('left')
    game._setState(85);
    let battle = new Battle();
    battle.winner(2, 5);
    	if ("Player 2 Wins!") {
            console.log('Player2 is winning damnit');
            console.log(game.state);
    		game.state = "gameOver"
            console.log('Player2 has won damnit');
            console.log(game.state);
            return "gameOver"
    		//return ;
    	}
    	else {
    		game.state = "mapScreen";
    	}
        console.log(game.state);
    };
