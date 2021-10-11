
const game = new Game
let attackButton;
let okButton;
let img;
let imagePath = './stylesheets/assets/battleBackground.jpg';

function preload() {

}

function setup() {
  createAttackButton();
  createOkButton();
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
      break;
    case "victoryScreen":
      okButton.show();
      attackButton.hide();
      game.showVictoryScreen();
      break;
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
  okButton.position(Config.canvasWidth / 2, Config.canvasHeight / 2);

  okButton.mousePressed(() => {
    game.battle = null;
    game.state = "mapScreen"
  });
}

function createAttackButton() {
  attackButton = createButton('Attack!');
  attackButton.position(500, 500);

  attackButton.mousePressed(() => {
    if (game.battle) { game.battle.takeTurn() }
  });
}
