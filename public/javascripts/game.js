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
    this.player.startLocation(
      this.gameMap.startingColumn,
      this.gameMap.startingRow
    );

    this._generateCells();

    this.cells.forEach((cell) => {
      cell.calculateExits();
      cell.calculateTile();
    });
  }

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
    }

    if (legalMove) {
      this.player.move(direction, amount);

      this._setState(this._encounterRoll());
    }
  }

  showMap() {
    this.map.forEach((y, yi) => {
      y.forEach((x, xi) => {
        let cell = Cell.find(xi * Config.cellSize, yi * Config.cellSize)

        if (cell.isWall()) {
          image(wallImg, cell.x, cell.y);
        } else {
          image(tileImg, cell.x, cell.y);
        }
      });
    });
  }

  _cellAt(x, y) {
    return this.cells.find((cell) => cell.x == x && cell.y == y);
  }

  _generateCells() {
    this.map.forEach((y, yi) => {
      y.forEach((x, xi) => {
        new Cell(xi * Config.cellSize, yi * Config.cellSize, x == 1)
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
    // background(Config.victoryScreenBackground);
    // fill(0);
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
