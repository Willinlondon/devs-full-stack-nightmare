class Region {
  constructor(cells, offset) {
    this.cells = cells;
    this.offset = offset;
  }

  show() {
    this.cells.forEach((y, y_index) => {
      y.forEach((x, x_index) => {
        const currentCell = this._cellAt(
          x_index * Config.cellSize,
          y_index * Config.cellSize
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
