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
let wallImg;
let playerImg;
let playerImg2;
let enemyImg;
let backgroundMusic;
let playerFaintAnimation;
let faintingEnemy;
let startTime;
let ghLogo;
let jasmineLogo;
let zoomLogo;

function preload() {
  wallImg = loadImage('./images/wall1.png');
  wallImg.resize(Config.cellSize, Config.cellSize);
  playerImg = loadImage('./images/idlePlayer1CROPPED.png');
  playerImg2 = createImg('./images/playerIdleAnimations.gif');
  enemyImg = createImg('./images/idleMinotaur.gif', 'enemy');
  tileArray = loadTiles();
  playerFaintAnimation = createImg(
    './images/playerFaintAnimation.gif',
    'fainting player'
  );
  backgroundMusic = loadSound('./stylesheets/assets/map-music-but-quiet.wav');
  faintingEnemy = createImg('./images/faintingEnemy.gif', 'fainting monster');
  ghLogo = loadImage('./images/gh-logo.png');
  jasmineLogo = loadImage('./images/jasmine-logo.png');
  zoomLogo = loadImage('./images/zoom.png');
  ticketImg = loadImage('./images/tickets.png');
}

function loadTiles() {
  const tileArray = [];

  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].forEach((i) => {
    tileArray.push(loadImage(`./images/new-tiles/${i}.png`));
  });

  tileArray.forEach((img) => {
    img.resize(Config.cellSize, Config.cellSize);
  });

  return tileArray;
}

function setup() {
	createPrecisionStrikeButton();
	createWildFlailButton();
	createHealButton();
	createOkButton();
	createFleeButton();
  createNewGameButton();
  createLocalDifficulty();
  createLocalLuck();
  game.spawnBosses();
  game.spawnItems();
	canvas = createCanvas(Config.canvasWidth, Config.canvasHeight);
	canvas.parent("play-area");
  enemyImg.parent("right");
  playerImg2.parent("left");
  playerFaintAnimation.parent("left");
  faintingEnemy.parent("right");
	battleBackroundImage = loadImage(battleBackgroundImagePath);

  Cell.all.forEach((cell) => {
    if (cell.boss) {
      cell.bossImg = null;

      switch(cell.boss.name) {
        case 'Git, Master of Sabotage':
          cell.bossImg = ghLogo;
        break;
        case 'Jasmine':
          cell.bossImg = jasmineLogo;
        break;
        case 'Zoomer':
          cell.bossImg = zoomLogo;
        break;
        default:
          cell.bossImg = ghLogo;
        break;
      }
    }
  })
}

function draw() {
  background(0);

  switch (game.state) {
    case 'mapScreen':
      //  backgroundMusic.play();
      enemyImg.hide();
      playerImg2.show();
      okButton.hide();
      newGameButton.hide();
      faintingEnemy.hide();
      precisionStrikeButton.hide();
      wildFlailButton.hide();
      healButton.hide();
      fleeButton.hide();
      game.showMap();
      playerFaintAnimation.hide();
			playerImg.resize(Config.spriteSize / 2, Config.spriteSize / 2);
      ghLogo.resize(Config.spriteSize / 2, Config.spriteSize / 2);
      jasmineLogo.resize(Config.spriteSize / 2, Config.spriteSize / 2);
      zoomLogo.resize(Config.spriteSize / 2, Config.spriteSize / 2);
      ticketImg.resize(Config.spriteSize / 2, Config.spriteSize / 2);

      Cell.all.forEach((cell) => {
        if (cell.region == game.player.region && !cell.isWall()) {
          if (cell.boss) {
            if (!cell.boss.hasFainted()) {
              image(
                cell.bossImg,
                cell.regionX + Config.cellSize / 4,
                cell.regionY + Config.cellSize / 4
              );
            }
          }

          if (cell.item) {
            if (cell.item.available) {
              image(
                ticketImg,
                cell.regionX + Config.cellSize / 4,
                cell.regionY + Config.cellSize / 4
              );
            }
          }
        }
      })

      image(
        playerImg,
        game.player.gridX + Config.cellSize / 4,
        game.player.gridY + Config.cellSize / 4
      );

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
      newGameButton.hide();
      break;
    case 'gameOver':
      okButton.hide();
      enemyImg.hide();
      playerImg2.hide();
      precisionStrikeButton.hide();
      wildFlailButton.hide();
      healButton.hide();
      fleeButton.hide();
      playerFaintAnimation.show();
      faintingEnemy.hide();
      newGameButton.show();
      game.showGameOver();
      break;
    case 'victoryScreen':
      background(battleBackroundImage, 0, 0);
      enemyImg.hide();
      faintingEnemy.show();
      okButton.show();
      playerImg2.show();
      precisionStrikeButton.hide();
      wildFlailButton.hide();
      fleeButton.hide();
      healButton.hide();
      newGameButton.hide();
      game.showVictoryScreen();
      break;
    case 'itemScreen':
      background(battleBackroundImage, 0, 0);
      enemyImg.hide();
      faintingEnemy.hide();
      okButton.show();
      playerImg2.show();
      precisionStrikeButton.hide();
      wildFlailButton.hide();
      fleeButton.hide();
      healButton.hide();
      newGameButton.hide();
      game.showItemScreen();
      break;
  }
}

function keyPressed() {
  if (game.state === 'mapScreen') {
    let moved = false;
    if (keyCode === 65) {
      game.player.move('west');
      moved = true;
    }
    if (keyCode === 68) {
      game.player.move('east');
      moved = true;
    }
    if (keyCode === 87) {
      game.player.move('north');
      moved = true;
    }
    if (keyCode === 83) {
      game.player.move('south');
      moved = true;
    }

    if (moved) {
      if (game.player.cell.boss) {
        game.enterBattle(game.player.cell.boss)
      } else if (game.player.cell.item) {
        game.player.cell.item.pickUp();
      } else {
        if (Math.random() > Config.encounterProbability) game.enterBattle();
      }
    }
  }
}

function createOkButton() {
  okButton = createImg('./images/okButton150px.png');
  okButton.parent('okButton');
  elementHighlight(okButton);
  stopElementHighlight(okButton);
  okButton.mousePressed(() => {
    game.battle = null;
    game.state = 'mapScreen';
  });
}

function createNewGameButton() {
  newGameButton = createImg('./images/newGame150px.png');
  newGameButton.parent('okButton');
  elementHighlight(newGameButton);
  stopElementHighlight(newGameButton);
  newGameButton.mousePressed(() => {
    open('/', '_self');
  });
}

function createPrecisionStrikeButton() {

  precisionStrikeButton = createImg('./images/precisionStrike150px.png');
  precisionStrikeButton.parent('strike');
  elementHighlight(precisionStrikeButton);
  stopElementHighlight(precisionStrikeButton);
  precisionStrikeButton.mousePressed(() => {
    startTime = frameCount;
    if (game.battle) {
      game.battle.takeTurn(Ability.find("Calculated Process"));
    }
  });
}

function createWildFlailButton() {
  wildFlailButton = createImg('./images/wildFlail150px.png');
  wildFlailButton.parent('wildflail');
  elementHighlight(wildFlailButton);
  stopElementHighlight(wildFlailButton);
  wildFlailButton.mousePressed(() => {
    startTime = frameCount;
		if (game.battle) {
			game.battle.takeTurn(Ability.find("Stab in the Dark"));
		}
	});
}

function createHealButton() {
  healButton = createImg('./images/recovery150px.png');
  healButton.parent('heal');
  elementHighlight(healButton);
  stopElementHighlight(healButton);
	healButton.mousePressed(() => {
    startTime = frameCount;
		if (game.battle) {
			game.battle.takeTurn(Ability.find("Refresh"));
		}
	});
}

function createFleeButton() {
  fleeButton = createImg('./images/flee150px.png');
  fleeButton.parent('flee');
  elementHighlight(fleeButton);
  stopElementHighlight(fleeButton);
  fleeButton.mousePressed(() => {
    startTime = frameCount;
    if (Math.random() > Config.fleeFailureChance) {
      game.battle = null;
      game.state = 'mapScreen';
    } else {
      game.battle.takeTurn('Flee!', true);
    }
  });
}


function createLocalDifficulty() {
  game.cells.forEach((cell) => {
    cell.localDifficulty = Math.floor((noise(
      cell.x + Config.difficultyNoiseOffset,
      cell.y + Config.difficultyNoiseOffset
      ) * Config.noiseScale) * Config.noiseRange);
  })
};

function createLocalLuck() {
  game.cells.forEach((cell) => {
    cell.localLuck = Math.floor((noise(
      cell.x + Config.luckNoiseOffset,
      cell.y + Config.luckNoiseOffset
      ) * Config.noiseScale) * Config.noiseRange);
  })
}

function elementHighlight(element) {
  let toChange = element
  toChange.mouseOver(changeColor);
    function changeColor() {
      toChange.style(
                "background-color: lightgreen"
          )};
};

function stopElementHighlight(element) {
  let toChange = element
  toChange.mouseOut(reverseColor);
  function reverseColor() {
    toChange.style(
      "background-color: transparent"
)};
};
