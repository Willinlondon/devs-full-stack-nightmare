class Character {
	constructor(name = "Player", health = Config.playerHealth, abilities, verb, adjective) {
		this.name = name;
		this.health = health;
		this.maxHealth = health;
		this.location = [0, 0];
		this.abilities = abilities;
    this.verb = verb;
    this.adjective = adjective;
	}

	spawn(x, y) {
		this.location = [x * Config.cellSize, y * Config.cellSize];
		this.mapX = x * Config.cellSize;
		this.mapY = y * Config.cellSize;
	}

	move(direction, amount) {
		switch (direction) {
			case "north":
				if (this.cell.exits.north) this.mapY -= Config.cellSize;
				break;
			case "east":
				if (this.cell.exits.east) this.mapX += Config.cellSize;
				break;
			case "south":
				if (this.cell.exits.south) this.mapY += Config.cellSize;
				break;
			case "west":
				if (this.cell.exits.west) this.mapX -= Config.cellSize;
				break;
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

	takeHeal(amount) {
		this.health += amount;
	}

	setCell() {
		this.cell = Cell.find(this.mapX, this.mapY);
	}

	setGridPosition() {
		this.region = this.cell.region;
		this.gridX = this.cell.regionX;
		this.gridY = this.cell.regionY;
	}
}
