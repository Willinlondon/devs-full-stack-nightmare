
const game = new Game
let okButton
let img;
let imagePath = './stylesheets/assets/battleBackground.jpg';

function preload() {

}

function setup() {
  createOkButton()
  canvas = createCanvas(Config.canvasWidth, Config.canvasHeight);
  canvas.parent("play-area");
  img = loadImage(imagePath);
}

function draw() {
  background(0);

  switch(game.state) {
    case "mapScreen":
      okButton.hide();
      attackButton.hide();
      game.showMap();

      fill(Config.playerColour);
      rect(game.player.location[0],game.player.location[1], Config.spriteSize);
      break;
    case "battleScreen":
      background(img, 0, 0);
      game.showBattle();
      okButton.show();
      attackButton.show();
      break;
    case "gameOver":
      okButton.hide();
      attackButton.hide();
      game.showGameOver();
  }
}

function keyPressed() {
  if (game.state === "mapScreen") {
  if (keyCode === LEFT_ARROW || keyCode === 65) {game.playerAction('left', 75)};
  if (keyCode === RIGHT_ARROW || keyCode === 68) {game.playerAction('right', 75)};
  if (keyCode === UP_ARROW || keyCode === 87) {game.playerAction('up', 75)};
  if (keyCode === DOWN_ARROW || keyCode === 83) {game.playerAction('down', 75)};
  }
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

function createAttackButton() {
  attackButton = attackButton('Attack!');
  attackButton.position(500, 500);

  attackButton.mousePressed(() => {
    game.battle.takeTurn();
  });
}
