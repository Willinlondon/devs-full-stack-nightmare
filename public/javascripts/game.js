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

	showMap() {
		this.map.forEach((y, y_index) => {
			y.forEach((x, x_index) => {
				if(x == 1) {
					fill(150, 50, 150);
					rect(x_index * 75, y_index * 75, 75);
				}
			});
		});
	}

	_playerFight(){
		let battle = new Battle();
		battle.winner(Math.random() * 20, Math.random() * 20);
		this.state = "inGame";
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
