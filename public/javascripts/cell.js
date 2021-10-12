class Cell {
  constructor(x, y, wall) {
    this.x = x;
    this.y = y;
    this.wall = wall;
    this.exits = new Object;
  }

  isWall() {
    return this.wall;
  }

  calculateExits() {
    ["north", "east", "south", "west",
    "northeast", "northwest", "southeast", "southwest"].forEach((dir) => {
      this.exits[dir] = true
    })

    if (this.x === 0) {
      this.exits.west = false
      this.exits.northwest = false
      this.exits.southwest = false
    }

    if (this.x === Config.canvasWidth - Config.cellSize) {
      this.exits.east = false
      this.exits.northeast = false
      this.exits.southeast = false
    }

    if (this.y === 0) {
      this.exits.north = false
      this.exits.northeast = false
      this.exits.northwest = false
    }

    if (this.y === Config.canvasHeight - Config.cellSize) {
      this.exits.south = false
      this.exits.southeast = false
      this.exits.southwest = false
    }
  }
}
