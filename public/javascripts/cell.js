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
    this.exits.north = this._freeCell([this.y - Config.cellSize, this.x]);
    this.exits.south = this._freeCell([this.y + Config.cellSize, this.x]);
    this.exits.northwest = this._freeCell([this.x - Config.cellSize, this.y - Config.cellSize]);
    this.exits.southwest = this._freeCell([this.x - Config.cellSize, this.y + Config.cellSize]);
    this.exits.northeast = this._freeCell([this.x + Config.cellSize, this.y - Config.cellSize]);
    this.exits.southeast = this._freeCell([this.x + Config.cellSize, this.y + Config.cellSize]);
  }

  _freeCell(position) {
    let x = position[0];
    let y = position[1];

    let result = Cell.all.some((cell) => {
      return cell.x === x
      && cell.y === y
      && cell.x >= 0
      && cell.y >= 0
      && cell.x < Config.canvasWidth
      && cell.y < Config.canvasHeight
      && !cell.isWall();
    })

    console.log(result);

    return result;
  }
}
