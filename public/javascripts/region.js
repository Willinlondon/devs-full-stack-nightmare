class Region {
  constructor(cells, offset) {
    this.cells = cells;
    this.offset = offset;
  }

  show() {
    this.cells.forEach((y, yi) => {
      y.forEach((x, xi) => {
        const currentCell = this._cellAt(
          xi * Config.cellSize,
          yi * Config.cellSize
        );

        if (currentCell.isWall()) {
          image(wallImg, currentCell.x - offset, currentCell.y - offset);
        } else {
          image(tileImg, currentCell.x - offset, currentCell.y - offset);
        }
      });
    });
  }
}
