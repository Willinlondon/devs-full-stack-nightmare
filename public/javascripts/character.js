class Character {

	constructor(name = "Player", health = Config.playerHealth, abilities) {
		this.name = name;
		this.health = health;
    this.maxHealth = health;
		this.location = [0, 0];
    this.abilities = abilities
	}

	spawn(x, y) {
		this.location = [x * Config.cellSize, y * Config.cellSize];
    this.mapX = x * Config.cellSize;
    this.mapY = y * Config.cellSize;
	}

	move(direction, amount) {
		if (direction == "east") {
			this._moveRight(amount);
		}
		if (direction == "west") {
			this._moveLeft(amount);
		}
		if (direction == "north") {
			this._moveUp(amount);
		}
		if (direction == "south") {
			this._moveDown(amount);
		}

    this.setCell();
    this.setGridPosition();
	}

  hasFainted() {
    return this.health <= 0;
  }

	takeHit(amount) {
		this.health -= amount;
	}

  setCell() {
    this.cell = Cell.find(this.mapX, this.mapY);
  }

  setGridPosition() {
    this.region = this.cell.region;
    this.gridX = this.cell.regionX;
    this.gridY = this.cell.regionY;
  }

	// Directions are here as private methods
  
	_moveRight(amount) {
		if (this.mapX == Config.cellSize * Config.gridSize - 1) {
			return;
		}
		this.mapX += Config.cellSize;
	}

	_moveLeft(amount) {
		if (this.mapX == 0) {
			return;
		}
		this.mapX -= Config.cellSize;
	}

	_moveUp(amount) {
		if (this.mapY == 0) {
			return;
		}
		this.mapY -= Config.cellSize;
	}

	_moveDown(amount) {
		if (this.mapY == Config.cellSize * Config.gridSize - 1) {
			return;
		}
		this.mapY += Config.cellSize;
	}
}
