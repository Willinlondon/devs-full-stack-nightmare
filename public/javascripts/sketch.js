const game = new Game


let img;
let imagePath = './stylesheets/assets/battleBackground.jpg';


function preload() {

}


function setup() {
  canvas = createCanvas(Config.canvasWidth, Config.canvasHeight);
  canvas.parent("play-area");
  img = loadImage(imagePath);
}

function draw() {
  background(0);

  switch(game.state) {
    case "mapScreen":
      game.showMap();

      fill(Config.playerColour);
      rect(game.player.location[0],game.player.location[1], Config.spriteSize);
      break;
    case "battleScreen":  
    background(img, 0, 0);
    game.showBattle();
    //background(img, 0, 0);
      
  }
}

function keyPressed() {
  if (keyCode === LEFT_ARROW || keyCode === 65) {game.playerAction('left', Config.cellSize)};
  if (keyCode === RIGHT_ARROW || keyCode === 68) {game.playerAction('right', Config.cellSize)};
  if (keyCode === UP_ARROW || keyCode === 87) {game.playerAction('up', Config.cellSize)};
  if (keyCode === DOWN_ARROW || keyCode === 83) {game.playerAction('down', Config.cellSize)};
}
