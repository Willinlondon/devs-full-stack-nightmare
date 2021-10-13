class Cell {
	constructor(x, y, wall) {
		this.x = x;
		this.y = y;
		this.wall = wall;
		this.exits = new Object();
		this.constructor.all.push(this);
		this.region;
	}

	static all = [];

	static filterByRegion(region) {
		return Cell.all.filter((cell) => cell.region === region);
	}

	static find(x, y) {
		return Cell.all.find((cell) => cell.x === x && cell.y === y);
	}

	static all = [];

	isWall() {
		return this.wall;
	}

	calculateExits() {
		this.exits.west = this._freeCell([this.x - Config.cellSize, this.y]);
		this.exits.east = this._freeCell([this.x + Config.cellSize, this.y]);
		this.exits.north = this._freeCell([this.x, this.y - Config.cellSize]);
		this.exits.south = this._freeCell([this.x, this.y + Config.cellSize]);

		// ANYONE introducing these vars, feel free, but TRIPLE CHECK THE MATHS!!!!!
		// this.exits.northwest = this._freeCell([this.x - Config.cellSize, this.y - Config.cellSize]);
		// this.exits.southwest = this._freeCell([this.x - Config.cellSize, this.y + Config.cellSize]);
		// this.exits.northeast = this._freeCell([this.x + Config.cellSize, this.y - Config.cellSize]);
		// this.exits.southeast = this._freeCell([this.x + Config.cellSize, this.y + Config.cellSize]);
	}

	calculateTile() {
		this.tileType = 0;
		this.tileType = this.exits.north ? this.tileType + 1 : this.tileType;
		this.tileType = this.exits.east ? this.tileType + 2 : this.tileType;
		this.tileType = this.exits.south ? this.tileType + 4 : this.tileType;
		this.tileType = this.exits.west ? this.tileType + 8 : this.tileType;
	}

	show() {
		if (this.isWall()) {
			image(wallImg, this.regionX, this.regionY);
		} else {
			image(tileArray[this.tileType - 1], this.regionX, this.regionY);
			if (this.localDifficulty > Config.bossSpawnThreshold) {
				fill(255, 0, 0)
				rectMode(CENTER)
				rect(this.regionX + Config.cellSize / 2, this.regionY + Config.cellSize / 2, 40);
			}
		}
	}

	_freeCell(position) {
		let x = position[0];
		let y = position[1];
		let cell = this._cellAt(position);

		if (cell != undefined) {
			return !cell.wall;
		} else {
			return false;
		}
	}

	_cellAt(position) {
		const result = Cell.all.find(
			(cell) => cell.x === position[0] && cell.y === position[1]
		);

		return result;
	}
}
