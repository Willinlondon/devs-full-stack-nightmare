class Game {
	constructor(map = new Map(), player = new Character()) {
		this.map = map.createMap();
		this.player = player;
		this.state = "inGame";
		this.cells = this._generateCells();
	}
	
	//player takes a move
	playerAction(direction, amount) {
		if() {
			this.player.move(direction, amount);
			this._checkState(this._encounterRoll());
			if (this.state === "battle") {
				this._playerFight()
			}
		}

	}

	showMap() {
		this.map.forEach((y, y_index) => {
			y.forEach((x, x_index) => {
				if(this._cellAt(x_index, y_index).isWall()) {
					fill(150, 50, 150);
					rect(x_index * 75, y_index * 75, 75);
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

				cellArray.push(new Cell(x_index, y_index, wall));
			});
		});

		return cellArray;
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
