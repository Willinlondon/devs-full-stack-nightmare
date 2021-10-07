class Game {
	constructor(map = new Map(), player = new Character()) {
		this.map = map.createMap();
		this.player = player;
		this.state = "inGame";
	}
	play() {
		// while state = in game
		while (this.state === "inGame") {
			// player.playerMove()
			// Have added a manual input before we incorporate Amelia's P5 movement stuff
			this.player.move('right');
			console.log(this.player.location);
			console.log('the player has moved');
			// roll dice to see if battle is commenced
			this._checkState(this._encounterRoll());
			console.log('the encounter roll has happened');
			console.log(this.state);
			// if battle commenced, run battle
			if (this.state === "battle") {
				console.log('BATTLE!');
				let battle = new Battle();
				console.log(battle)
				battle.winner(Math.random() * 20, Math.random() * 20);
				// if player loses, state = game over
				if ("Player2 Wins!") {
					this.state = "gameOver"
					return ;
				}
				// else go back to square one
				else {
					this.state = "inGame";
				}
			}
		}
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

	// -----------
	// mapPosition()
	// player.move('direction') - this will move the player
	// game.round(?)turn(?)othersynonym(?) - this will determine the state
	// game.enum - this will trigger a battle or no?

	// game.over - if the player loses their battle it's game over

	// This wants to have the following methods:

	// Every time the CHARACTER takes a step
	// A dice is rolled to see what STATE it is
	// And IF battle THEN move to BATTLE

	// So the methods here are:

	//
}
