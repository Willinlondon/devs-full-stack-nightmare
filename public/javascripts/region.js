class Region {
  constructor(cells, offset) {
    this.cells = cells;
    this.offset = offset;
  }

  show() {
    this.cells.forEach((y, yi) => {
      y.forEach((x, xi) => {
        let cell = Cell.find(xi * Config.cellSize, yi * Config.cellSize)

        if (cell.isWall()) {
          image(wallImg, cell.x - this.offset, cell.y - this.offset);
        } else {
          image(tileImg, cell.x - this.offset, cell.y - this.offset);
        }
      });
    });
  }
}
