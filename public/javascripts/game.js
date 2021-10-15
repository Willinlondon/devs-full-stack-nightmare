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
    this.state = 'introScreen';
    this.player.spawn(this.gameMap.startingColumn, this.gameMap.startingRow);
    this._generateCells();

    this.cells.forEach((cell) => {
      cell.calculateExits();
      cell.calculateTile();
    });
    this.player.setCell();
    this.player.setGridPosition();
  }

  showMap() {
    Cell.filterByRegion(this.player.region).forEach(cell => cell.show())
  }

  _cellAt(x, y) {
    return this.cells.find((cell) => cell.x === x && cell.y === y);
  }

  _generateCells() {
    let region = -1;
    let noiseScale = 0.1;

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

  spawnBosses() {
    this.cells.forEach((cell) => {
      if (cell.localDifficulty > Config.bossSpawnThreshold && !cell.item) {
        cell.boss = Bosses.sample();
      }
    })
  }

  spawnItems() {
    this.cells.forEach((cell) => {
      if (cell.localLuck > Config.itemSpawnThreshold && !cell.boss) {
        // cell.item = new Item(
        //   this,
        //   cell.x,
        //   cell.y
        // );
        cell.item = Pickups.sample(game, cell.x, cell.y)
      }
    })
  }

  showBattle() {
    if (this.battle.over()) {
      if (this.player.hasFainted()) {
        addToScoreDatabase(this.player.name, this.player.score);
        this.state = 'gameOver';
      } else {
        if (this.battle.player2.hasFainted()) {
          if (this.battle.player2.name == "Jasmine") {
            this.player.score += 50;
          } else {
            this.player.score += 1000;
          }
        }
        this.state = 'victoryScreen';
      }
      return;
    }

    fill(Config.battleTextColor);
    textSize(Config.battleFontSize);
    textAlign(CENTER, CENTER);
    text(
      `You were ${
        this.battle.player2.verb
      } by\n ${
        this.battle.player2.adjective
      } troll called ${
        this.battle.player2.name
      }!`,
      canvas.width / 2,
      canvas.height / 6
    );

    textSize(28);
    if (this.battle.outcomeStrings) {
      if(frameCount > startTime + 30 && frameCount < startTime + 360){text(this.battle.outcomeStrings[0], canvas.width / 2, canvas.height / 2);}
      if(frameCount > startTime + 90 && frameCount < startTime + 360){text(this.battle.outcomeStrings[1], canvas.width / 2, canvas.height / 2 + 80);}
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
    fill(Config.battleTextColor);
    if (this.player.score > Config.winningScore) {
      fill(255);
      textSize(32);
      textAlign(CENTER, CENTER);
      text("As Dev's spectre form was defeated, they\nawoke from the nightmare with a\nfresh mind, confident that they had done\nenough, and ready to tackle the day ahead!", Config.canvasWidth / 2, Config.canvasHeight / 5);
      text('VICTORY!', Config.canvasWidth / 2, Config.canvasHeight / 4 * 3);
      text(`Your Score: ${this.player.score}`, Config.canvasWidth / 2, Config.canvasHeight / 4 * 3 + 50);
    } else {
      textSize(32);
      textAlign(CENTER, CENTER);
      text("As Dev's spectre form was defeated, they\nunfortunately succumbed to their nightmares\nand were forever haunted by failing\n tests and merge conflicts!", Config.canvasWidth / 2, Config.canvasHeight / 5);
      text('GAME OVER', Config.canvasWidth / 2, Config.canvasHeight / 4 * 3);
      text(`Your Score: ${this.player.score}`, Config.canvasWidth / 2, Config.canvasHeight / 4 * 3 + 50);
    }
  }

  showItemScreen() {
    background(0);
    fill(Config.battleTextColor);
    textSize(32);
    textAlign(CENTER, CENTER);
    text(`${this.player.cell.item.descriptionText}`, Config.canvasWidth / 2, Config.canvasHeight / 4);
    text(`${this.player.cell.item.effectText}`, Config.canvasWidth / 2, Config.canvasHeight / 4 + 50);
  }

  showIntroScreen() {
    // background(0);
    fill(Config.battleTextColor);
    textSize(32);
    textAlign(CENTER, CENTER);
    text("Meet Dev! An aspiring junior software developer!\nOr at least, their spectral form!\nAs unfortunately poor Dev is having a hard \ntime learning to code, and is having\nlabyrinth nightmares! Can you guide Dev and\nhelp them overcome their fears and awaken\nfrom the nightmare?", Config.canvasWidth / 2, Config.canvasHeight / 4);
  }

  showVictoryScreen() {
    fill(Config.battleTextColor);
    textSize(32);
    textAlign(CENTER, CENTER);
    text(
      `${this.battle.player2.name} fainted!`,
      canvas.width / 2,
      canvas.height / 3
    );
  }

  setState(state) {
    this.state = state;
  }

  enterBattle(enemy) {
    this.battle = new Battle(this.player, enemy);
    this.state = 'battleScreen';
  }

	_removeEnemy() {}
}
