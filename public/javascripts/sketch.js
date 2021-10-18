/* eslint-disable no-restricted-globals */
/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */

const game = new Game();
// Buttons
let calculatedProcessButton;
let stabInTheDarkButton;
let refreshButton;
let fleeButton;
let okButton;
// Background assets
let battleBackgroundImage;
const battleBackgroundImagePath = './stylesheets/assets/battleBackground.jpg';
let wallImg;
let backgroundMusic;
let battleMusic;
// Player assets
let playerImg;
let playerImg2;
let playerFaintAnimation;
// Enemy assets
let enemyImg;
let buggerIdle;
let buggerFainting;
let faintingEnemy;
let zoomer;
// Misc assets
let startTime;
let ghLogo;
let jasmineLogo;
let zoomLogo;
let inputPlayerName;
let beginButton;

function preload() {
  // Enemy assets
//  enemyImg = createImg('./images/idleMinotaur.gif', 'enemy');
//  zoomer = createImg('./images/Zoomer.gif', 'enemy');
//  faintingEnemy = createImg('./images/faintingEnemy.gif', 'fainting monster');
//  buggerIdle = createImg('./images/buggerIdle.gif', 'enemy');
//  buggerFainting = createImg('./images/buggerFainting.gif', 'fainting golem');
  jasmineLogo = loadImage('./images/jasmine-logo.png');
  zoomLogo = loadImage('./images/zoom.png');
  ghLogo = loadImage('./images/gh-logo.png');
  // Background assets
  backgroundMusic = loadSound('./stylesheets/assets/map-music-but-quiet.wav');
  battleMusic = loadSound('./stylesheets/assets/battle-music.wav');
  tileArray = loadTiles();
  wallImg = loadImage('./images/wall1.png');
  wallImg.resize(Config.cellSize, Config.cellSize);
  ticketImg = loadImage('./images/tickets.png');
  // Misc assets
  ticketImg = loadImage('./images/tickets.png');
  // Player assets
  playerImg = loadImage('./images/idlePlayer1CROPPED.png');
//  playerImg2 = createImg('./images/playerIdleAnimations.gif');
//  playerFaintAnimation = createImg(
//    './images/playerFaintAnimation.gif',
//    'fainting player'
//  );
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
  // Gameplay
  createLocalDifficulty();
  createLocalLuck();
  game.spawnBosses();
  game.spawnItems();
  // Buttons
  createButtons();
  // Test
  enemyImg = createImg('./images/idleMinotaur.gif', 'enemy');
  zoomer = createImg('./images/Zoomer.gif', 'enemy');
  faintingEnemy = createImg('./images/faintingEnemy.gif', 'fainting monster');
  buggerIdle = createImg('./images/buggerIdle.gif', 'enemy');
  buggerFainting = createImg('./images/buggerFainting.gif', 'fainting golem');
  playerImg2 = createImg('./images/playerIdleAnimations.gif');
  playerFaintAnimation = createImg(
    './images/playerFaintAnimation.gif',
    'fainting player',
  );
  // Background
  canvas = createCanvas(Config.canvasWidth, Config.canvasHeight);
  canvas.parent('play-area');
  battleBackroundImage = loadImage(battleBackgroundImagePath);
  // Enemy assets
  enemyImg.parent('right');
  zoomer.parent('right');
  faintingEnemy.parent('right');
  buggerIdle.parent('right');
  buggerFainting.parent('right');
  // Player assets
  playerImg2.parent('left');
  playerFaintAnimation.parent('left');
  // Player Name Input
  inputPlayerName = createInput().attribute('maxlength', 10);
  inputPlayerName.parent('inputPlayerName');

  Cell.all.forEach((cell) => {
    if (cell.boss) {
      cell.bossImg = null;

      switch (cell.boss.name) {
        case 'Git':
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
  });
}

function draw() {
  background(0);

  switch (game.state) {
    case 'mapScreen':
      // THIS IS HOW SKETCH HAS UPDATED ITSELF IN THIS MERGE CONFLICT
      // I SUSPECT WE WILL HAVE TO UNCOMMENT THIS - FA
      //  backgroundMusic.play();
      game.showMap();
      enemyDisplayNoBattle();
      battleButtonsCheck();
      newGameCheck();
      playerImg2.show();
      okButton.hide();
      beginButton.hide();
      inputPlayerName.hide();
      playerFaintAnimation.hide();
      playerImg.resize(Config.spriteSize / 2, Config.spriteSize / 2);
      ghLogo.resize(Config.spriteSize / 2, Config.spriteSize / 2);
      jasmineLogo.resize(Config.spriteSize / 2, Config.spriteSize / 2);
      zoomLogo.resize(Config.spriteSize / 2, Config.spriteSize / 2);
      ticketImg.resize(Config.spriteSize / 2, Config.spriteSize / 2);

      Cell.all.forEach((cell) => {
        if (cell.region === game.player.region && !cell.isWall()) {
          if (cell.boss) {
            if (!cell.boss.hasFainted()) {
              image(
                cell.bossImg,
                cell.regionX + Config.cellSize / 4,
                cell.regionY + Config.cellSize / 4,
              );
            }
          }

          if (cell.item) {
            if (cell.item.available) {
              image(
                ticketImg,
                cell.regionX + Config.cellSize / 4,
                cell.regionY + Config.cellSize / 4,
              );
            }
          }
        }
      });

      image(
        playerImg,
        game.player.gridX + Config.cellSize / 4,
        game.player.gridY + Config.cellSize / 4,
      );

      battleMusic.stop();
      if (!backgroundMusic.isPlaying()) backgroundMusic.play();
      break;
    case 'battleScreen':
      background(battleBackroundImage, 0, 0);
      game.showBattle();
      enemyDisplayBattle();
      battleButtonsCheck();
      beginButton.hide();
      inputPlayerName.hide();
      newGameCheck();
      playerImg2.show();
      playerFaintAnimation.hide();
      backgroundMusic.stop();
      if (!battleMusic.isPlaying()) battleMusic.play();
      break;
    case 'gameOver':
      game.showGameOver();
      enemyDisplayNoBattle();
      newGameCheck();
      buttonsNoBattle();
      okButton.hide();
      beginButton.hide();
      inputPlayerName.hide();
      playerImg2.hide();
      playerFaintAnimation.show();
      break;
    case 'victoryScreen':
      background(battleBackroundImage, 0, 0);
      battleButtonsCheck();
      enemyFainted();
      buggerIdle.hide();
      enemyImg.hide();
      zoomer.hide();
      newGameCheck();
      okButton.show();
      playerImg2.show();
      beginButton.hide();
      inputPlayerName.hide();
      playerFaintAnimation.hide();
      game.showVictoryScreen();
      break;
    case 'itemScreen':
      background(battleBackroundImage, 0, 0);
      enemyDisplayNoBattle();
      newGameCheck();
      battleButtonsCheck();
      okButton.show();
      beginButton.hide();
      inputPlayerName.hide();
      playerImg2.show();
      playerFaintAnimation.hide();
      game.showItemScreen();
      break;
    case 'introScreen':
      background(battleBackroundImage, 0, 0);
      enemyDisplayNoBattle();
      newGameCheck();
      battleButtonsCheck();
      beginButton.show();
      inputPlayerName.show();
      okButton.hide();
      playerImg2.show();
      playerFaintAnimation.hide();
      game.showIntroScreen();
      break;
    default:
      break;
  }
}

function keyPressed() {
  userStartAudio();
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
        if (!game.player.cell.boss.hasFainted()) {
          game.enterBattle(game.player.cell.boss);
        }
      } else if (game.player.cell.item) {
        game.player.cell.item.pickUp();
      } else if (Math.random() > Config.encounterProbability) {
        const enemy = NormalEnemies.sample();
        game.enterBattle(enemy);
      }
    }
  }
}

function createLocalDifficulty() {
  game.cells.forEach((cell) => {
    cell.localDifficulty = Math.floor(
      noise(
        cell.x + Config.difficultyNoiseOffset,
        cell.y + Config.difficultyNoiseOffset,
      )
        * Config.noiseScale
        * Config.noiseRange,
    );
  });
}

function createLocalLuck() {
  game.cells.forEach((cell) => {
    cell.localLuck = Math.floor(
      noise(cell.x + Config.luckNoiseOffset, cell.y + Config.luckNoiseOffset)
        * Config.noiseScale
        * Config.noiseRange,
    );
  });
}

function elementHighlight(element) {
  const toChange = element;
  toChange.mouseOver(changeColor);
  function changeColor() {
    toChange.style('background-color: lightgreen');
  }
}

function stopElementHighlight(element) {
  const toChange = element;
  toChange.mouseOut(reverseColor);
  function reverseColor() {
    toChange.style('background-color: transparent');
  }
}

function enemyDisplayBattle() {
  faintingEnemy.hide();
  buggerFainting.hide();
  if (game.battle.player2.name === 'Bugger') {
    buggerIdle.show();
    zoomer.hide();
    enemyImg.hide();
  } else if (game.battle.player2.name === 'Zoomer') {
    enemyImg.hide();
    buggerIdle.hide();
    zoomer.show();
  } else {
    enemyImg.show();
    buggerIdle.hide();
    zoomer.hide();
  }
}

function enemyDisplayNoBattle() {
  enemyImg.hide();
  zoomer.hide();
  faintingEnemy.hide();
  buggerFainting.hide();
  buggerIdle.hide();
  enemyImg.hide();
  zoomer.hide();
}

function enemyFainted() {
  if (game.battle.player2.name === 'Bugger') {
    buggerFainting.show();
    faintingEnemy.hide();
  } else {
    faintingEnemy.show();
    buggerFainting.hide();
  }
}

function battleButtonsCheck() {
  if (game.state === 'battleScreen') {
    calculatedProcessButton.show();
    stabInTheDarkButton.show();
    refreshButton.show();
    fleeButton.show();
  } else {
    calculatedProcessButton.hide();
    stabInTheDarkButton.hide();
    refreshButton.hide();
    fleeButton.hide();
  }
}

function newGameCheck() {
  if (game.state === 'gameOver') {
    newGameButton.show();
  } else {
    newGameButton.hide();
  }
}

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
