class Cell {
  constructor(x, y, wall) {
    this.x = x;
    this.y = y;
    this.wall = wall;
    this.exits = new Object;
    this.constructor.all.push(this);
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

  _freeCell(position) {
    let x = position[0];
    let y = position[1];
    let cell = this._cellAt(position);

    if (cell != undefined) {
      return !cell.wall
    } else {
      return false
    }
  }

  _cellAt(position) {
    const result = Cell.all.find(cell => cell.x === position[0] && cell.y === position[1])

    return result;
  }
}
