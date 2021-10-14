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
//Buttons
let calculatedProcessButton;
let stabInTheDarkButton;
let refreshButton;
let fleeButton;
let okButton;
//Background assets
let battleBackgroundImage;
const battleBackgroundImagePath = './stylesheets/assets/battleBackground.jpg';
let wallImg;
let backgroundMusic;
//Player assets
let playerImg;
let playerImg2;
let playerFaintAnimation;
//Enemy assets
let enemyImg;
let faintingEnemy;
let idleMinotaur2;
//Misc assets
let startTime;
let ghLogo;
let jasmineLogo;
let zoomLogo;

function preload() {
  //Enemy assets
  enemyImg = createImg('./images/idleMinotaur.gif', 'enemy');
  idleMinotaur2 = createImg('./images/idleMinotaur2.gif', 'enemy');
  faintingEnemy = createImg('./images/faintingEnemy.gif', 'fainting monster');
  jasmineLogo = loadImage('./images/jasmine-logo.png');
  zoomLogo = loadImage('./images/zoom.png');
  ghLogo = loadImage('./images/gh-logo.png');
  //Background assets
  backgroundMusic = loadSound('./stylesheets/assets/map-music-but-quiet.wav');
  tileArray = loadTiles();
  wallImg = loadImage('./images/wall1.png');
  wallImg.resize(Config.cellSize, Config.cellSize);
  ticketImg = loadImage('./images/tickets.png');
  //Misc assets
  ticketImg = loadImage('./images/tickets.png');
  //Player assets
  playerImg = loadImage('./images/idlePlayer1CROPPED.png');
  playerImg2 = createImg('./images/playerIdleAnimations.gif');
  playerFaintAnimation = createImg(
    './images/playerFaintAnimation.gif',
    'fainting player'
  );
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
  
  //Gameplay 
  createLocalDifficulty();
  createLocalLuck();
  game.spawnBosses();
  game.spawnItems();
  //Buttons
	createcalculatedProcessButton();
	createstabInTheDarkButton();
	createrefreshButton();
	createOkButton();
	createFleeButton();
  createNewGameButton();
  //Background
	canvas = createCanvas(Config.canvasWidth, Config.canvasHeight);
	canvas.parent("play-area");
  battleBackroundImage = loadImage(battleBackgroundImagePath);
  //Enemy assets
  enemyImg.parent("right");
  idleMinotaur2.parent("right");
  faintingEnemy.parent("right");
  //Player assets
  playerImg2.parent("left");
  playerFaintAnimation.parent("left");

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
      game.showMap();
      enemyDisplayNoBattle();
      battleButtonsCheck();
      newGameCheck();
      playerImg2.show();
      okButton.hide();
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
      game.showBattle();
      enemyDisplayBattle();
      battleButtonsCheck();
      newGameCheck();
      playerImg2.show();
      playerFaintAnimation.hide();
      break;
    case 'gameOver':
      enemyDisplayNoBattle();
      newGameCheck();
      buttonsNoBattle();
      okButton.hide();
      playerImg2.hide();
      playerFaintAnimation.show();
      game.showGameOver();
      break;
    case 'victoryScreen':
      background(battleBackroundImage, 0, 0);
      battleButtonsCheck();
      enemyFainted();
      newGameCheck();
      okButton.show();
      playerImg2.show();
      game.showVictoryScreen();
      break;
    case 'itemScreen':
      background(battleBackroundImage, 0, 0);
      enemyDisplayNoBattle();
      newGameCheck();
      battleButtonsCheck();
      okButton.show();
      playerImg2.show();
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
        if (!game.player.cell.boss.hasFainted()) {
          game.enterBattle(game.player.cell.boss)
        }
      } else if (game.player.cell.item) {
        game.player.cell.item.pickUp();
      } else {
        if (Math.random() > Config.encounterProbability) {
          let enemy  = NormalEnemies.sample()
          game.enterBattle(enemy);
        }
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

function enemyDisplayBattle() {
  faintingEnemy.hide();
  if (game.battle.player2.name == 'Bugger')
  { idleMinotaur2.show();
    enemyImg.hide(); }
  else {
    enemyImg.show();
    idleMinotaur2.hide();
  }
}

function enemyDisplayNoBattle(){
  enemyImg.hide();
  idleMinotaur2.hide();
  faintingEnemy.hide();
}

function enemyFainted(){
  enemyImg.hide();
  idleMinotaur2.hide();
    if(game.battle.player2.name = 'Bugger')
    {faintingEnemy.show();}
}

function battleButtonsCheck(){
  if (game.state === 'battleScreen'){
  calculatedProcessButton.show();
  stabInTheDarkButton.show();
  refreshButton.show();
  fleeButton.show();}
  else{
  calculatedProcessButton.hide();
  stabInTheDarkButton.hide();
  refreshButton.hide();
  fleeButton.hide();
  }
}

function newGameCheck(){
  if (game.state === 'gameOver')
  {newGameButton.show();}
  else{newGameButton.hide();}
}
