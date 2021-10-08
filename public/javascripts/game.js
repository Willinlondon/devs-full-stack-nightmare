class Game {
	constructor(map = new Map(), player = new Character()) {
		this.map = map.createMap();
		this.player = player;
		this.state = "inGame";
	}
	
	//player takes a move
	playerAction(direction = _playerInput(), amount){
		this.player.move(direction, amount);
		this._checkState(this._encounterRoll());
		if (this.state === "battle") {
			this._playerFight()
		}
	}

	_playerFight(){
		let battle = new Battle();
		battle.winner(Math.random() * 20, Math.random() * 20);
		if ('Player 2 Wins!') {
			console.log('PLAYER 2 WON BB')
			this.state = "gameOver"
			{ return } ;
		}
		else {this.state = "inGame"};
	}

	_checkState(_encounterRoll) {
		if (_encounterRoll > 80) {
			this.state = "battle";
		}
		if (_encounterRoll <= 80) {
			this.state = "inGame";
		}
	}

	_encounterRoll() {
		return Math.random() * 100;
	}

}
