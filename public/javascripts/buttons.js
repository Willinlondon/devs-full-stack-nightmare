function createButtons() {
  createBeginButton();
  createOkButton();
  createNewGameButton();
  createcalculatedProcessButton();
  createstabInTheDarkButton();
  createrefreshButton();
  createFleeButton();
}

function createBeginButton() {
  beginButton = createImg('./images/okButton150px.png');
  beginButton.parent('beginButton');
  elementHighlight(beginButton);
  stopElementHighlight(beginButton);
  beginButton.mousePressed(() => {
    game.battle = null;
    game.state = 'mapScreen';
    game.player.name = inputPlayerName.value();
  });
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
      game.battle.takeTurn(Ability.find('Calculated Process'));
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
      game.battle.takeTurn(Ability.find('Stab in the Dark'));
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
      game.battle.takeTurn(Ability.find('Refresh'));
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