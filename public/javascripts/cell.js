class Cell {
    constructor(x, y, wall) {
      this.x = x;
      this.y = y;
      this.wall = wall;
    }

    isWall() {
      return this.wall;
    }
}
