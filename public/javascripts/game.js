class Game {
  constructor(map = new Map(), player = new Character()) {
    this.gameMap = map;
    this.map = this.gameMap.createMap();
    this.player = player;

    this.state = 'mapScreen';

    this.player.startLocation(
      this.gameMap.startingColumn,
      this.gameMap.startingRow,
    );

    this.cells = this._generateCells();
  }

  // player takes a move

  playerAction(direction, amount) {
    const playerX = this.player.location[0];
    const playerY = this.player.location[1];
    let legalMove = true;

    switch (direction) {
      case 'right':
        legalMove = !this._cellAt(playerX + amount, playerY).isWall();
        break;
      case 'left':
        legalMove = !this._cellAt(playerX - amount, playerY).isWall();
        break;
      case 'up':
        legalMove = !this._cellAt(playerX, playerY - amount).isWall();
        break;
      case 'down':
        legalMove = !this._cellAt(playerX, playerY + amount).isWall();
        break;
      default:
        break;
    }

    if (legalMove) {
      this.player.move(direction, amount);

      this._setState(this._encounterRoll());
    }
  }

  showMap() {
    this.map.forEach((y, yIndex) => {
      y.forEach((x, xIndex) => {
        const currentCell = this._cellAt(xIndex * 75, yIndex * 75);

        if (currentCell.isWall()) {
          fill(150, 50, 150);
          rect(currentCell.x, currentCell.y, 75);
        }
      });
    });
  }

  _cellAt(x, y) {
    return this.cells.find((cell) => cell.x === x && cell.y === y);
  }

  _generateCells() {
    const cellArray = [];

    this.map.forEach((y, yIndex) => {
      y.forEach((x, xIndex) => {
        const wall = x === 1;

        cellArray.push(new Cell(xIndex * 75, yIndex * 75, wall));
      });
    });

    return cellArray;
  }

  showBattle() {
    background(0, 255, 0);
    fill(0);
    textSize(32);
    textAlign(CENTER, CENTER);
    text(this.battleInfo, 400, 200);
    text(`${this.battleWinner}`, 400, 400);
  }

  _doBattle() {
    const battle = new Battle();
    const playerRoll = Math.floor(Math.random() * 20);
    const enemyRoll = Math.floor(Math.random() * 20);
    const winner = battle.winner(playerRoll, enemyRoll);
    const battleText = `
    You encountered an angry troll called Jasmine.
    \nYou attacked with ${playerRoll}!
    \nThey attacked with ${enemyRoll}`;

    this.battleWinner = winner;
    this.battleInfo = battleText;
  }

  _setState(_encounterRoll) {
    if (_encounterRoll > 80) {
      this._doBattle();
      this.state = 'battleScreen';
    }
    if (_encounterRoll <= 80) {
      this.state = 'mapScreen';
    }
  }

  _encounterRoll() {
    return Math.random() * 100;
  }
}
