class Game {
	constructor(map = new Map(), player = new Character()) {
		this.map = map.createMap();
		this.player = player;
		this.state = "mapScreen";
		this.cells = this._generateCells();
	}
	
	//player takes a move
	playerAction(direction, amount) {
		let playerX = this.player.location[0];
		let playerY = this.player.location[1];
		let legalMove = true;

		switch (direction) {
		  case 'right':
		  	legalMove = !this._cellAt(playerX + amount, playerY).isWall();
		    break;
		  case 'left':
		  	legalMove = !this._cellAt(playerX - amount, playerY).isWall();
		  	break;
		  case 'up':
		  	legalMove = !this._cellAt(playerX, playerY - amount).isWall();
		    break;
		  case 'down':
		  	legalMove = !this._cellAt(playerX, playerY + amount).isWall();
		    break;
		}
		
		if(legalMove) {
			this.player.move(direction, amount);
			this._setState(this._encounterRoll());
		}
	}

	showMap() {
		this.map.forEach((y, y_index) => {
			y.forEach((x, x_index) => {
				let currentCell = this._cellAt(x_index * 75, y_index * 75);

				if(currentCell.isWall()) {
					fill(150, 50, 150);
					rect(currentCell.x, currentCell.y, 75);
				}
			});
		});
	}

	_cellAt(x, y) {
		return this.cells.find(cell => (cell.x == x && cell.y == y));
	}

	_generateCells() {
		let cellArray = [];

		this.map.forEach((y, y_index) => {
			y.forEach((x, x_index) => {
				let wall = (x == 1) ? true : false

				cellArray.push(new Cell(x_index * 75, y_index * 75, wall));
			});
		});

		return cellArray;
	}

	showBattle() {
    background(0, 255, 0);
		fill(0);
		textSize(32);
		textAlign(CENTER, CENTER);
		text(this.battleInfo, 400, 200);
		text(`${this.battleWinner} wins!`,400, 400);
	}

	_doBattle() {
		let battle = new Battle();
		let playerRoll = Math.floor(Math.random() * 20);
		let enemyRoll = Math.floor(Math.random() * 20);
		let winner = battle.winner(playerRoll, enemyRoll);
		let battleText = `
		You encountered an angry troll called Jasmine.
		\nYou attacked with ${playerRoll}!
		\nThey attacked with ${enemyRoll}`

		this.battleWinner = winner;
		this.battleInfo = battleText;
	}

	_setState(_encounterRoll) {
		if (_encounterRoll > 80) {
			this._doBattle();
			this.state = "battleScreen";
		}
		if (_encounterRoll <= 80) {
			this.state = "mapScreen";
		}
	}

	_encounterRoll() {
		return Math.random() * 100;
	}
}
