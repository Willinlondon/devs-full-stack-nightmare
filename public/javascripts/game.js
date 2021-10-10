class Game {
	constructor(map = new Map(), player = new Character()) {
		this.gameMap = map;
		this.map = this.gameMap.createMap();
		this.player = player;

		this.state = "mapScreen";

		this.player.startLocation(
		this.gameMap.startingColumn,
		this.gameMap.startingRow
		);

		this.cells = this._generateCells();
	}

	playerAction(direction, amount) {
		let playerX = this.player.location[0];
		let playerY = this.player.location[1];
		let legalMove = true;

		switch (direction) {
			case "right":
				legalMove = !this._cellAt(playerX + amount, playerY).isWall();
				break;
			case "left":
				legalMove = !this._cellAt(playerX - amount, playerY).isWall();
				break;
			case "up":
				legalMove = !this._cellAt(playerX, playerY - amount).isWall();
				break;
			case "down":
				legalMove = !this._cellAt(playerX, playerY + amount).isWall();
				break;
		}

		if (legalMove) {
			this.player.move(direction, amount);

			this._setState(this._encounterRoll());


		}
	}

	showMap() {
		this.map.forEach((y, y_index) => {
			y.forEach((x, x_index) => {
				let currentCell = this._cellAt(
					x_index * Config.cellSize, y_index * Config.cellSize
					);

				if (currentCell.isWall()) {
					fill(Config.wallColour);
					rect(currentCell.x, currentCell.y, Config.cellSize);
				}
			});
		});
	}

	_cellAt(x, y) {
		return this.cells.find((cell) => cell.x == x && cell.y == y);
	}

	_generateCells() {
		let cellArray = [];

		this.map.forEach((y, y_index) => {
			y.forEach((x, x_index) => {
				let wall = x == 1 ? true : false;

				cellArray.push(new Cell(x_index * Config.cellSize, y_index * Config.cellSize, wall));
			});
		});

		return cellArray;
	}


	showBattle() {
    background(Config.battleBackground);
		fill(0);
		textSize(Config.battleFontSize);
		textAlign(CENTER, CENTER);
		text(this.battleInfo, 400, 200);
		text(`${this.battleWinner} wins!`,400, 400);
	}

	showGameOver() {
		background(0);
		fill(255);
		textSize(32);
		textAlign(CENTER, CENTER);
		text("GAME OVER", 400, 200);
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
		if (_encounterRoll > Config.encounterProbability) {
			this._doBattle();
			this.state = "battleScreen";
		}
		if (_encounterRoll <= Config.encounterProbability) {
			this.state = "mapScreen";
		}
	}

	_encounterRoll() {
		return Math.random();
	}
}
