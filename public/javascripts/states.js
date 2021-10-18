function createMapScreen() {
  return new State('mapScreen', () => {
    game.showMap();
    enemyDisplayNoBattle();
    battleButtonsCheck();
    newGameCheck();
    playerImg2.show();
    okButton.hide();
    beginButton.hide();
    inputPlayerName.hide();
    playerFaintAnimation.hide();
    playerImg.resize(Config.spriteSize / 2, Config.spriteSize / 2);
    ghLogo.resize(Config.spriteSize / 2, Config.spriteSize / 2);
    jasmineLogo.resize(Config.spriteSize / 2, Config.spriteSize / 2);
    zoomLogo.resize(Config.spriteSize / 2, Config.spriteSize / 2);
    ticketImg.resize(Config.spriteSize / 2, Config.spriteSize / 2);

    Cell.all.forEach((cell) => {
      if (cell.region === game.player.region && !cell.isWall()) {
        if (cell.boss) {
          if (!cell.boss.hasFainted()) {
            image(
              cell.bossImg,
              cell.regionX + Config.cellSize / 4,
              cell.regionY + Config.cellSize / 4,
            );
          }
        }

        if (cell.item) {
          if (cell.item.available) {
            image(
              ticketImg,
              cell.regionX + Config.cellSize / 4,
              cell.regionY + Config.cellSize / 4,
            );
          }
        }
      }
    });

    image(
      playerImg,
      game.player.gridX + Config.cellSize / 4,
      game.player.gridY + Config.cellSize / 4,
    );

    battleMusic.stop();
    if (!backgroundMusic.isPlaying()) backgroundMusic.play();
  });
}

function createBattleScreen() {
  return new State('battleScreen', () => {
    background(battleBackgroundImage, 0, 0);
    game.showBattle();
    enemyDisplayBattle();
    battleButtonsCheck();
    beginButton.hide();
    inputPlayerName.hide();
    newGameCheck();
    playerImg2.show();
    playerFaintAnimation.hide();
    backgroundMusic.stop();
    if (!battleMusic.isPlaying()) battleMusic.play();
  });
}

function createGameOverScreen() {
  return new State('gameOver', () => {
    game.showGameOver();
    enemyDisplayNoBattle();
    newGameCheck();
    buttonsNoBattle();
    okButton.hide();
    beginButton.hide();
    inputPlayerName.hide();
    playerImg2.hide();
    playerFaintAnimation.show();
  });
}

function createVictoryScreen() {
  return new State('victoryScreen', () => {
    background(battleBackgroundImage, 0, 0);
    battleButtonsCheck();
    enemyFainted();
    buggerIdle.hide();
    enemyImg.hide();
    zoomer.hide();
    newGameCheck();
    okButton.show();
    playerImg2.show();
    beginButton.hide();
    inputPlayerName.hide();
    playerFaintAnimation.hide();
    game.showVictoryScreen();
  });
}

function createItemScreen() {
  return new State('itemScreen', () => {
    background(battleBackgroundImage, 0, 0);
    enemyDisplayNoBattle();
    newGameCheck();
    battleButtonsCheck();
    okButton.show();
    beginButton.hide();
    inputPlayerName.hide();
    playerImg2.show();
    playerFaintAnimation.hide();
    game.showItemScreen();
  });
}

function createIntroScreen() {
  return new State('introScreen', () => {
    background(battleBackgroundImage, 0, 0);
    enemyDisplayNoBattle();
    newGameCheck();
    battleButtonsCheck();
    beginButton.show();
    inputPlayerName.show();
    okButton.hide();
    playerImg2.show();
    playerFaintAnimation.hide();
    game.showIntroScreen();
  });
}
