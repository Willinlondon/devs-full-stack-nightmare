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
  })
}