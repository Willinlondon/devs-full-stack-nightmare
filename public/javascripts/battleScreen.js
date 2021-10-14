let precisionStrikeButton;
  let wildFlailButton;
  let healButton;
  let fleeButton;
  let battleBackgroundImage;
  const battleBackgroundImagePath = './stylesheets/assets/battleBackground.jpg';
  let playerImg2;
  let enemyImg;
  let backgroundMusic;
  let startTime;
  let elementHighlight;
  
  function preload() {
    playerImg2 = createImg('./images/playerIdleAnimations.gif');
    enemyImg = createImg('./images/idleMinotaur.gif', 'enemy');
  }
  
  function setup() {
    createPrecisionStrikeButton();
    createWildFlailButton();
    createHealButton();
    createOkButton();
    createFleeButton();
    createLocalDifficulty();
    createLocalLuck();
    enemyImg.parent("right");
    playerImg2.parent("left");
    battleBackroundImage = loadImage(battleBackgroundImagePath);
  }
  
  function draw() {
    background(0);
        background(battleBackroundImage, 0, 0);
        enemyImg.show();
        playerImg2.show();
        game.showBattle();
        precisionStrikeButton.show();
        wildFlailButton.show();
        healButton.show();
        fleeButton.show();
        break;
      
  }
  
  function createPrecisionStrikeButton() {
  
    precisionStrikeButton = createImg('./images/precisionStrike150px.png');
    precisionStrikeButton.parent('strike');
  
    precisionStrikeButton.mouseOver(changeColor);
    precisionStrikeButton.mouseOut(reverseColor);
    precisionStrikeButton.mousePressed(() => {
      startTime = frameCount;
      if (game.battle) {
        game.battle.takeTurn(Ability.find("Precision Strike"));
      }
    });
  }
  
  function createWildFlailButton() {
    wildFlailButton = createImg('./images/wildFlail150px.png');
  
    wildFlailButton.parent('wildflail');
  
    wildFlailButton.mousePressed(() => {
      startTime = frameCount;
          if (game.battle) {
              game.battle.takeTurn(Ability.find("Wild Flail"));
          }
      });
  }
  
  function createHealButton() {
    healButton = createImg('./images/recovery150px.png');
    healButton.parent('heal');
  
      healButton.mousePressed(() => {
      startTime = frameCount;
          if (game.battle) {
              game.battle.takeTurn(Ability.find("Recovery"));
          }
      });
  }
  
  function createFleeButton() {
    fleeButton = createImg('./images/flee150px.png');
    fleeButton.parent('flee');
  
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
  
  function changeColor() {
    precisionStrikeButton.style(
            "background-color: lightgreen"
      )};
  
  function reverseColor() {
        precisionStrikeButton.style(
          "background-color: transparent"
  )};
  
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
  