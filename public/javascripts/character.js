class Character {

	constructor(name = "Player") {
		this.name = name;
		this.health = Config.playerHealth;
		this.location = [0, 0];
	}

	startLocation(startingColumn, startingRow) {
		this.location = [
		startingColumn * Config.cellSize, 
		startingRow * Config.cellSize
		];
	}

	// attack() {
	// 	return Math.floor(Math.random() * 20);
	// }

	move(direction, amount) {
		if (direction == "right") {
			this._moveRight(amount);
		}
		if (direction == "left") {
			this._moveLeft(amount);
		}
		if (direction == "up") {
			this._moveUp(amount);
		}
		if (direction == "down") {
			this._moveDown(amount);
		}
	}

  hasFainted() {
    return this.health <= 0;
  }

	takeHit(amount) {
		this.health -= amount;
	}

	// Directions are here as private methods

	_moveRight(amount) {
		if (this.location[0] == Config.cellSize * Config.gridSize - 1) {
			return;
		}
		this.location[0] += Config.cellSize;
	}

	_moveLeft(amount) {
		if (this.location[0] == 0) {
			return;
		}
		this.location[0] -= Config.cellSize;
	}

	_moveUp(amount) {
		if (this.location[1] == 0) {
			return;
		}
		this.location[1] -= Config.cellSize;
	}

	_moveDown(amount) {
		if (this.location[1] == Config.cellSize * Config.gridSize - 1) {
			return;
		}
		this.location[1] += Config.cellSize;
	}
}
