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
let calculatedProcessButton;
let stabInTheDarkButton;
let refreshButton;
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
	createcalculatedProcessButton();
	createstabInTheDarkButton();
	createrefreshButton();
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
      calculatedProcessButton.hide();
      stabInTheDarkButton.hide();
      refreshButton.hide();
      fleeButton.hide();
      game.showMap();
      playerFaintAnimation.hide();
			playerImg.resize(Config.spriteSize / 2, Config.spriteSize / 2);
      ghLogo.resize(Config.spriteSize / 2, Config.spriteSize / 2);
      ticketImg.resize(Config.spriteSize / 2, Config.spriteSize / 2);

      Cell.all.forEach((cell) => {
        if (cell.region == game.player.region && !cell.isWall()) {
          if (cell.boss) {
            if (!cell.boss.hasFainted()) {
              image(
                ghLogo,
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
      calculatedProcessButton.show();
      stabInTheDarkButton.show();
      refreshButton.show();
      fleeButton.show();
      playerFaintAnimation.hide();
      faintingEnemy.hide();
      newGameButton.hide();
      break;
    case 'gameOver':
      okButton.hide();
      enemyImg.hide();
      playerImg2.hide();
      calculatedProcessButton.hide();
      stabInTheDarkButton.hide();
      refreshButton.hide();
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
      calculatedProcessButton.hide();
      stabInTheDarkButton.hide();
      fleeButton.hide();
      refreshButton.hide();
      newGameButton.hide();
      game.showVictoryScreen();
      break;
    case 'itemScreen':
      background(battleBackroundImage, 0, 0);
      enemyImg.hide();
      faintingEnemy.hide();
      okButton.show();
      playerImg2.show();
      calculatedProcessButton.hide();
      stabInTheDarkButton.hide();
      fleeButton.hide();
      refreshButton.hide();
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
        if (Math.random() > Config.encounterProbability) game.enterBattle()
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

function createcalculatedProcessButton() {

  calculatedProcessButton = createImg('./images/calculatedProcess.png');
  calculatedProcessButton.parent('strike');
  elementHighlight(calculatedProcessButton);
  stopElementHighlight(calculatedProcessButton);
  calculatedProcessButton.mousePressed(() => {
    startTime = frameCount;
    if (game.battle) {
      game.battle.takeTurn(Ability.find("Calculated Process"));
    }
  });
}

function createstabInTheDarkButton() {
  stabInTheDarkButton = createImg('./images/stabInTheDark.png');
  stabInTheDarkButton.parent('wildflail');
  elementHighlight(stabInTheDarkButton);
  stopElementHighlight(stabInTheDarkButton);
  stabInTheDarkButton.mousePressed(() => {
    startTime = frameCount;
		if (game.battle) {
			game.battle.takeTurn(Ability.find("Stab in the Dark"));
		}
	});
}

function createrefreshButton() {
  refreshButton = createImg('./images/refresh150px.png');
  refreshButton.parent('heal');
  elementHighlight(refreshButton);
  stopElementHighlight(refreshButton);
	refreshButton.mousePressed(() => {
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