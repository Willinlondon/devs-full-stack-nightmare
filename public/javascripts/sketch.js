const game = new Game


function setup() {
  canvas = createCanvas(750, 750);
  canvas.parent("play-area")
}

function draw() {
  background(0)
  fill(155)
  rect(game.player.location[0],game.player.location[1],75)
}

function keyPressed() {
  if (keyCode === LEFT_ARROW || keyCode === 65) {game.player.move('left', 75)};
  if (keyCode === RIGHT_ARROW || keyCode === 68) {game.player.move('right', 75)};
  if (keyCode === UP_ARROW || keyCode === 87) {game.player.move('up', 75)};
  if (keyCode === DOWN_ARROW || keyCode === 83) {game.player.move('down', 75)};
}
