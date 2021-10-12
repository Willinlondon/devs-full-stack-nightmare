function addToScoreDatabase(username, score) {
  const gameData = { username, score };

  fetch('http://localhost:3000/score', {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(gameData),
  }).then((res) => {
    console.log('Request complete! response:', res);
  });
}
addToScoreDatabase('new-test-player', 100);

const game = new Game();
let attackButton;
let okButton;
let fleeButton;
let img;
const imagePath = './stylesheets/assets/battleBackground.jpg';
let tileImg;
let wallImg;
let playerImg;

function preload() {
  tileImg = loadImage('./images/tile1.png');
  wallImg = loadImage('./images/wall1.png');
  playerImg = loadImage('./images/idlePlayer1CROPPED.png');
}

function setup() {
  createAttackButton();
  createOkButton();
  createFleeButton();
  canvas = createCanvas(Config.canvasWidth, Config.canvasHeight);
  canvas.parent('play-area');
  img = loadImage(imagePath);
}

function draw() {
  background(0);

  switch (game.state) {
    case 'mapScreen':
      okButton.hide();
      attackButton.hide();
      fleeButton.hide();
      game.showMap();

      // fill(Config.playerColour);
      playerImg.resize(Config.spriteSize / 2, Config.spriteSize / 2);
      image(
        playerImg,
        game.player.location[0] + Config.cellSize / 4,
        game.player.location[1] + Config.cellSize / 4
      );

      break;
    case 'battleScreen':
      background(img, 0, 0);
      game.showBattle();
      attackButton.show();
      fleeButton.show();
      break;
    case 'gameOver':
      okButton.hide();
      attackButton.hide();
      fleeButton.hide();
      game.showGameOver();
      break;
    case 'victoryScreen':
      okButton.show();
      attackButton.hide();
      fleeButton.hide();
      game.showVictoryScreen();
      break;
  }
}

function keyPressed() {
  if (game.state === 'mapScreen') {
    if (keyCode === LEFT_ARROW || keyCode === 65) {
      game.playerAction('left', 75);
    }
    if (keyCode === RIGHT_ARROW || keyCode === 68) {
      game.playerAction('right', 75);
    }
    if (keyCode === UP_ARROW || keyCode === 87) {
      game.playerAction('up', 75);
    }
    if (keyCode === DOWN_ARROW || keyCode === 83) {
      game.playerAction('down', 75);
    }
  }
}

function createOkButton() {
  okButton = createButton('OK');
  okButton.position(Config.canvasWidth / 2, Config.canvasHeight / 2);

  okButton.mousePressed(() => {
    game.battle = null;
    game.state = 'mapScreen';
  });
}

function createAttackButton() {
  attackButton = createButton('Attack!');
  attackButton.position(500, 500);

  attackButton.mousePressed(() => {
    if (game.battle) {
      game.battle.takeTurn();
    }
  });
}

function createFleeButton() {
  fleeButton = createButton('Flee!');
  fleeButton.position(600, 500);

  fleeButton.mousePressed(() => {
    if (Math.random() > Config.fleeFailureChance) {
      game.battle = null;
      game.state = 'mapScreen';
    } else {
      game.battle.takeTurn(true);
    }
  });
}
