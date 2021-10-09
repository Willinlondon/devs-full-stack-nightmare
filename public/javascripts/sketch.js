const game = new Game

function preload() {

}

function setup() {
  canvas = createCanvas(Config.canvasWidth, Config.canvasHeight);
  canvas.parent("play-area");
}

function draw() {
  background(0);

  switch(game.state) {
    case "mapScreen":
      game.showMap();

      fill(155);
      rect(game.player.location[0],game.player.location[1],75);
      break;
    case "battleScreen":
      game.showBattle();
  }
}

function keyPressed() {
  if (keyCode === LEFT_ARROW || keyCode === 65) {game.playerAction('left', Config.cellSize)};
  if (keyCode === RIGHT_ARROW || keyCode === 68) {game.playerAction('right', Config.cellSize)};
  if (keyCode === UP_ARROW || keyCode === 87) {game.playerAction('up', Config.cellSize)};
  if (keyCode === DOWN_ARROW || keyCode === 83) {game.playerAction('down', Config.cellSize)};
}
