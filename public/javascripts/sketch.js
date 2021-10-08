const game = new Game
let okButton

function setup() {
  createOkButton()
  canvas = createCanvas(750, 750);
  canvas.parent("play-area");
}

function draw() {
  background(0);

  switch(game.state) {
    case "mapScreen":
      okButton.hide()
      game.showMap();

      fill(155);
      rect(game.player.location[0],game.player.location[1],75);
      break;
    case "battleScreen":
      game.showBattle();
      okButton.show()
      break;
    case "gameOver":
      okButton.hide()
      game.showGameOver();
  }
}

function keyPressed() {
  if (keyCode === LEFT_ARROW || keyCode === 65) {game.playerAction('left', 75)};
  if (keyCode === RIGHT_ARROW || keyCode === 68) {game.playerAction('right', 75)};
  if (keyCode === UP_ARROW || keyCode === 87) {game.playerAction('up', 75)};
  if (keyCode === DOWN_ARROW || keyCode === 83) {game.playerAction('down', 75)};
}

function createOkButton() {
  okButton = createButton('OK');
  okButton.position(400,500);

  okButton.mousePressed(() => {
    switch(game.battleWinner) {
      case 'Player' :
        game.state = 'mapScreen'
        break;
      case 'Enemy' :
        game.state = 'gameOver'
        break;
      default :
        game.state = 'mapScreen'
    }
  });
}
