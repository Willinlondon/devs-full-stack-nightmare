class Game {
  constructor(
    map = new Map(
      Config.mapDimension,
      Config.NoOfTunnels,
      Config.maxTunnelLength
    ),
    player = new Character()
  ) {
    this.gameMap = map;
    this.map = this.gameMap.createMap();
    this.player = player;
    this.state = 'mapScreen';
    this.player.spawn(this.gameMap.startingColumn, this.gameMap.startingRow);
    this._generateCells();
    this.cells.forEach((cell) => {
      cell.calculateExits();
      cell.calculateTile();
    });
    this.player.setCell();
    this.player.setGridPosition();
  }

  playerAction(direction, amount) {
    let legalMove = true;

    switch (direction) {
      case 'east':
        legalMove = this.player.cell.exits.east;
        break;
      case 'west':
        legalMove = this.player.cell.exits.west;
        break;
      case 'north':
        legalMove = this.player.cell.exits.north;
        break;
      case 'south':
        legalMove = this.player.cell.exits.south;
        break;
    }

    if (legalMove) {
      this.player.move(direction, amount);

      this._setState(this._encounterRoll());
    }
  }

  showMap() {
    Cell.filterByRegion(this.player.region).forEach(cell => cell.show())
  }

  _cellAt(x, y) {
    return this.cells.find((cell) => cell.x === x && cell.y === y);
  }

  _generateCells() {
    let region = -1;

    this.map.forEach((y, yi) => {
      y.forEach((x, xi) => {
        let cell = new Cell(xi * Config.cellSize, yi * Config.cellSize, x == 1)

        cell.regionY = (xi * Config.gridSize + yi)
        % (Config.gridSize / Config.regionDivisor)
        * Config.cellSize

        cell.regionX = (yi * Config.gridSize + xi)
        % (Config.gridSize / Config.regionDivisor)
        * Config.cellSize

        cell.number = (cell.y * Config.gridSize + cell.x) / Config.cellSize
        cell.region = (
          Math.floor(
            (cell.y / Config.cellSize)/(Config.gridSize / Config.regionDivisor)
          )
          * Config.regionDivisor
          + Math.floor(
            (cell.x / Config.cellSize)/(Config.gridSize / Config.regionDivisor))
          );
      });
    });

    this.cells = Cell.all;
  }

  showBattle() {
    if (this.battle.over()) {
      if (this.player.hasFainted()) {
        addToScoreDatabase('new-test-player-2', 500);
        this.state = 'gameOver';
      } else {
        this.state = 'victoryScreen';
      }
      return;
    }

    fill(Config.battleTextColor);
    textSize(Config.battleFontSize);
    textAlign(CENTER, CENTER);
    text(
      `You were ambushed by an angry, \nobnoxious troll called ${this.battle.player2.name}!`,
      canvas.width / 2,
      canvas.height / 6
    );
    textSize(28);
    if (this.battle.string) {
      text(this.battle.string, canvas.width / 2, canvas.height / 2);
    }

    textSize(32);
    text(this.battle.player1.name, canvas.width / 5, (canvas.height / 5) * 4);
    text(
      `HP: ${this.battle.player1.health}/${Config.playerHealth}`,
      canvas.width / 5,
      (canvas.height / 5) * 4 + 35
    );
    text(
      this.battle.player2.name,
      (canvas.width / 5) * 4,
      (canvas.height / 5) * 4
    );
    text(
      `HP: ${this.battle.player2.health}/${this.battle.player2.maxHealth}`,
      (canvas.width / 5) * 4,
      (canvas.height / 5) * 4 + 35
    );
  }

  showGameOver() {
    background(0);
    fill(255);
    textSize(32);
    textAlign(CENTER, CENTER);
    text('GAME OVER', Config.canvasWidth / 2, Config.canvasHeight / 2);
  }

  showVictoryScreen() {
    textSize(32);
    textAlign(CENTER, CENTER);
    text(
      `${this.battle.player2.name} fainted!`,
      canvas.width / 2,
      canvas.height / 3
    );
  }

  _enterBattle() {
    this.battle = new Battle(this.player, new Enemy('Jasmine'));
    this.state = 'battleScreen';
  }

  // Should be called checkEncounter?
  _setState(_encounterRoll) {
    if (_encounterRoll > Config.encounterProbability) {
      this._enterBattle();
    }
    if (_encounterRoll <= Config.encounterProbability) {
      this.state = 'mapScreen';
    }
  }

  _encounterRoll() {
    return Math.random();
  }

  _removeEnemy() {}
}
