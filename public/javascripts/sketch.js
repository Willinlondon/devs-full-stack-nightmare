async function addToScoreDatabase(username, score) {
  const gameData = { username, score };

  const response = await fetch('/score', {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(gameData),
  });
  const data = await response.json();
  console.log(data);
}

const game = new Game();
let precisionStrikeButton;
let wildFlailButton;
let healButton;
let okButton;
let fleeButton;
let battleBackgroundImage;
const battleBackgroundImagePath = './stylesheets/assets/battleBackground.jpg';
let tileImg;
let wallImg;
let playerImg;
let playerImg2;
let enemyImg;
let backgroundMusic;
let playerFaintAnimation;
let faintingEnemy;

function preload() {
  tileImg = loadImage('./images/tile1.png');
  tileImg.resize(Config.cellSize, Config.cellSize);
  wallImg = loadImage('./images/wall1.png');
  wallImg.resize(Config.cellSize, Config.cellSize);
  playerImg = loadImage('./images/idlePlayer1CROPPED.png');
  playerImg2 = createImg('./images/playerIdleAnimations.gif');
  enemyImg = createImg('./images/idleMinotaur.gif', 'enemy');
  playerFaintAnimation = createImg('./images/playerFaintAnimation.gif', 'fainting player');
  backgroundMusic = loadSound('./stylesheets/assets/map-music-but-quiet.wav');
  faintingEnemy = createImg('./images/faintingEnemy.gif', 'fainting monster');
}

function setup() {
  createPrecisionStrikeButton();
  createWildFlailButton();
  createHealButton();
	createOkButton();
	createFleeButton();
	canvas = createCanvas(Config.canvasWidth, Config.canvasHeight);
	canvas.parent("play-area");
  enemyImg.parent("right");
  playerImg2.parent("left");
  //playerImg2.parent("left");
  playerFaintAnimation.parent("left");
  faintingEnemy.parent("right");
	battleBackroundImage = loadImage(battleBackgroundImagePath);
}

function draw() {
  background(0);

  switch (game.state) {
    case 'mapScreen':
      //  backgroundMusic.play();
      enemyImg.hide();
      playerImg2.show();
      okButton.hide();
      faintingEnemy.hide();
      precisionStrikeButton.hide();
      wildFlailButton.hide();
      healButton.hide();
			fleeButton.hide();
			game.showMap();
      playerFaintAnimation.hide();
			playerImg.resize(Config.spriteSize / 2, Config.spriteSize / 2);

      image(
        playerImg,
        game.player.gridX + Config.cellSize / 4,
        game.player.gridY + Config.cellSize / 4
      );
			// fill(Config.playerColour);
      // rect(game.player.location[0],game.player.location[1], Config.spriteSize);

      break;
    case 'battleScreen':
      background(battleBackroundImage, 0, 0);
      enemyImg.show();
      playerImg2.show();
      game.showBattle();
      precisionStrikeButton.show();
      wildFlailButton.show();
      healButton.show();
			fleeButton.show();
      playerFaintAnimation.hide();
      faintingEnemy.hide();
			break;
		case "gameOver":
			okButton.hide();
      enemyImg.hide();
      playerImg2.hide();
      precisionStrikeButton.hide();
      wildFlailButton.hide();
      healButton.hide();
			fleeButton.hide();
      playerFaintAnimation.show();
      faintingEnemy.hide();
			game.showGameOver();
			break;
		case "victoryScreen":
      background(battleBackroundImage, 0, 0);
      enemyImg.hide();
      faintingEnemy.show();
      playerFaintAnimation.hide();
      okButton.show();
      playerImg2.show();
      precisionStrikeButton.hide();
      wildFlailButton.hide();
      fleeButton.hide();
      healButton.hide();
      game.showVictoryScreen();
      break;
  }
}

function keyPressed() {
  if (game.state === 'mapScreen') {
    let moved = false;
    if (keyCode === LEFT_ARROW || keyCode === 65) {
      game.player.move('west'); moved = true;
    }
    if (keyCode === RIGHT_ARROW || keyCode === 68) {
      game.player.move('east'); moved = true;
    }
    if (keyCode === UP_ARROW || keyCode === 87) {
      game.player.move('north'); moved = true;
    }
    if (keyCode === DOWN_ARROW || keyCode === 83) {
      game.player.move('south'); moved = true
    }

    if (moved) {
      if (Math.random() > Config.encounterProbability) game.enterBattle();
    }

  }
}

function createOkButton() {
  okButton = createImg('./images/okButton150px.png');
  okButton.parent('okButton');

  okButton.mousePressed(() => {
    game.battle = null;
    game.state = 'mapScreen';
  });
}

function createPrecisionStrikeButton() {

  precisionStrikeButton = createImg('./images/precisionStrike150px.png');
  precisionStrikeButton.parent('strike');

  precisionStrikeButton.mousePressed(() => {
    if (game.battle) {
      game.battle.takeTurn(Ability.find("Precision Strike"));
    }
  });
}

function createWildFlailButton() {
  wildFlailButton = createButton('Wild Flail');
  // wildFlailButton.position(500, 500);
  wildFlailButton.parent('wildflail');
  wildFlailButton.mousePressed(() => {
    if (game.battle) {
      wildFlail = new Ability(
        'Wild Flail',
        Config.wildFlailMin,
        Config.wildFlailMax
      );
      game.battle.takeTurn(wildFlail);
    }
  });
	wildFlailButton = createButton("Wild Flail");
	//wildFlailButton.position(500, 500);
	wildFlailButton = createImg("./images/wildFlail150px.png");

  wildFlailButton.parent("wildflail");

	wildFlailButton.mousePressed(() => {
		if (game.battle) {
			game.battle.takeTurn(Ability.find("Wild Flail"));
		}
	});
}

function createHealButton() {
  healButton = createButton('Recovery');
  healButton.parent('heal');
  healButton = createImg('./images/recovery150px.png');
  healButton.parent("heal");

  healButton.mousePressed(() => {
    if (game.battle) {
      heal = new Ability('Recovery');
      game.battle.takeTurn(heal);
		if (game.battle) {
			game.battle.takeTurn(Ability.find("Recovery"));
    }
  });
}

function createFleeButton() {
  fleeButton = createImg('./images/flee150px.png');
  fleeButton.parent('flee');

  fleeButton.mousePressed(() => {
    if (Math.random() > Config.fleeFailureChance) {
      game.battle = null;
      game.state = 'mapScreen';
    } else {
      game.battle.takeTurn('Flee!', true);
    }
  });
}
