class Cell {
  constructor(x, y, wall) {
    this.x = x;
    this.y = y;
    this.wall = wall;
    this.exits = new Object;
    this._calculateExits();
  }

  isWall() {
    return this.wall;
  }

  _calculateExits() {
    if(this.x == 0) { this.exits.west = false };
    if(this.x == Config.canvasWidth - Config.cellSize) { this.exits.east = false };
    if(this.y == 0) { this.exits.north = false };
    if(this.y == Config.canvasHeight - Config.cellSize) { this.exits.south = false };
  }
}
