const game = new Game
console.log(game.player.location)
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
  if (keyCode === LEFT_ARROW) {game.player.move('left')};
  if (keyCode === RIGHT_ARROW) {game.player.move('right')};
  if (keyCode === UP_ARROW) {game.player.move('up')};
  if (keyCode === DOWN_ARROW) {game.player.move('down')};
}