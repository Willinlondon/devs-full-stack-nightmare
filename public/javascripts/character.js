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
    switch(direction) {
      case "north":
      this.mapY -= Config.cellSize if this.cell.exits.north;
      break;
      case "east":
      this.mapX += Config.cellSize if this.cell.exits.east;
      break;
      case "south":
      this.mapY += Config.cellSize if this.cell.exits.south;
      break;
      case "west":
      this.mapX -= Config.cellSize if this.cell.exits.west;
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

  setCell() {
    this.cell = Cell.find(this.mapX, this.mapY);
  }

  setGridPosition() {
    this.region = this.cell.region;
    this.gridX = this.cell.regionX;
    this.gridY = this.cell.regionY;
  }
}
