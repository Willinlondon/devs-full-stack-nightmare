class Game {
	constructor(map = new Map(), player = new Character()) {
		this.gameMap = map;
		this.map = this.gameMap.createMap();
		this.player = player;
		this.player.startLocation(
			this.gameMap.startingColumn,
			this.gameMap.startingRow
		);
		this.state = "inGame";
		this.cells = this._generateCells();
	}

	//player takes a move

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
			this._checkState(this._encounterRoll());
			if (this.state === "battle") {
				this._playerFight();
			}
		}
	}

	showMap() {
		this.map.forEach((y, y_index) => {
			y.forEach((x, x_index) => {
				let currentCell = this._cellAt(x_index * 75, y_index * 75);

				if (currentCell.isWall()) {
					fill(150, 50, 150);
					rect(currentCell.x, currentCell.y, 75);
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

				cellArray.push(new Cell(x_index * 75, y_index * 75, wall));
			});
		});

		return cellArray;
	}

	_playerFight() {
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
