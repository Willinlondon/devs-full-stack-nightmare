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
