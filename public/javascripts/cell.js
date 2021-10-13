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
			switch (this.tileType) {
				case 1:
					image(tileImg1, this.regionX, this.regionY);
					break;
				case 2:
					image(tileImg2, this.regionX, this.regionY);
					break;
				case 3:
					image(tileImg3, this.regionX, this.regionY);
					break;
				case 4:
					image(tileImg4, this.regionX, this.regionY);
					break;
				case 5:
					image(tileImg5, this.regionX, this.regionY);
					break;
				case 6:
					image(tileImg6, this.regionX, this.regionY);
					break;
				case 7:
					image(tileImg7, this.regionX, this.regionY);
					break;
				case 8:
					image(tileImg8, this.regionX, this.regionY);
					break;
				case 9:
					image(tileImg9, this.regionX, this.regionY);
					break;
				case 10:
					image(tileImg10, this.regionX, this.regionY);
					break;
				case 11:
					image(tileImg11, this.regionX, this.regionY);
					break;
				case 12:
					image(tileImg12, this.regionX, this.regionY);
					break;
				case 13:
					image(tileImg13, this.regionX, this.regionY);
					break;
				case 14:
					image(tileImg14, this.regionX, this.regionY);
					break;
				default:
					image(tileImg15, this.regionX, this.regionY);
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
