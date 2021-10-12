class Cell {
  constructor(x, y, wall) {
    this.x = x;
    this.y = y;
    this.wall = wall;
    this.exits = new Object;
    this.neighbours = this._calculateNeighbours();
    this.constructor.all.push(this);
  }

  static all = [];

  isWall() {
    return this.wall;
  }

  _calculateNeighbours() {
    let cellNeighbours = [];

    let west = [this.x - Config.cellSize, this.y];
    let east = [this.x + Config.cellSize, this.y];
    let north = [this.y - Config.cellSize, this.x];
    let south = [this.y + Config.cellSize, this.x];
    let northwest = [this.x - Config.cellSize, this.y - Config.cellSize];
    let southwest = [this.x - Config.cellSize, this.y + Config.cellSize];
    let northeast = [this.x + Config.cellSize, this.y - Config.cellSize];
    let southeast = [this.x + Config.cellSize, this.y + Config.cellSize];

    [north, east, south, west, northeast,
    northwest, southeast, southwest].forEach((dir) => {
      cellNeighbours.push(dir);
    });

    cellNeighbours = cellNeighbours.filter((dir) => {
      return (dir[0] >= 0 && dir[1] >= 0 &&
        dir[0] < Config.canvasWidth && dir[1] < Config.canvasHeight);
    });

    return cellNeighbours;
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
