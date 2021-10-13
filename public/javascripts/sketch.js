function addToScoreDatabase(username, score) {
	const gameData = { username, score };

	fetch("/score", {
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		method: "POST",
		body: JSON.stringify(gameData),
	})
		.then((response) => response.json())
		.then((data) => console.log(data.scores));
}

const game = new Game();
let precisionStrikeButton;
let wildFlailButton;
let healButton;
let okButton;
let fleeButton;
let battleBackgroundImage;
const battleBackgroundImagePath = "./stylesheets/assets/battleBackground.jpg";
let tileImg1,
	tileImg2,
	tileImg3,
	tileImg4,
	tileImg5,
	tileImg6,
	tileImg7,
	tileImg8,
	tileImg9,
	tileImg10,
	tileImg11,
	tileImg12,
	tileImg13,
	tileImg14,
	tileImg15;
let tileImg;
let wallImg;
let playerImg;
let playerImg2;
let enemyImg;
let backgroundMusic;

function preload() {
	tileImg = loadImage(`./images/new-tiles/1.png`);
	tileImg.resize(Config.cellSize, Config.cellSize);
	tileImg2 = loadImage(`./images/new-tiles/2.png`);
	tileImg2.resize(Config.cellSize, Config.cellSize);
	tileImg3 = loadImage(`./images/new-tiles/3.png`);
	tileImg3.resize(Config.cellSize, Config.cellSize);
	tileImg4 = loadImage(`./images/new-tiles/4.png`);
	tileImg4.resize(Config.cellSize, Config.cellSize);
	tileImg5 = loadImage(`./images/new-tiles/5.png`);
	tileImg5.resize(Config.cellSize, Config.cellSize);
	tileImg6 = loadImage(`./images/new-tiles/6.png`);
	tileImg6.resize(Config.cellSize, Config.cellSize);
	tileImg7 = loadImage(`./images/new-tiles/7.png`);
	tileImg7.resize(Config.cellSize, Config.cellSize);
	tileImg8 = loadImage(`./images/new-tiles/8.png`);
	tileImg8.resize(Config.cellSize, Config.cellSize);
	tileImg9 = loadImage(`./images/new-tiles/9.png`);
	tileImg9.resize(Config.cellSize, Config.cellSize);
	tileImg10 = loadImage(`./images/new-tiles/10.png`);
	tileImg10.resize(Config.cellSize, Config.cellSize);
	tileImg11 = loadImage(`./images/new-tiles/11.png`);
	tileImg11.resize(Config.cellSize, Config.cellSize);
	tileImg12 = loadImage(`./images/new-tiles/12.png`);
	tileImg12.resize(Config.cellSize, Config.cellSize);
	tileImg13 = loadImage(`./images/new-tiles/13.png`);
	tileImg13.resize(Config.cellSize, Config.cellSize);
	tileImg14 = loadImage(`./images/new-tiles/14.png`);
	tileImg14.resize(Config.cellSize, Config.cellSize);
	tileImg15 = loadImage(`./images/new-tiles/15.png`);
	tileImg15.resize(Config.cellSize, Config.cellSize);
	wallImg = loadImage("./images/wall1.png");
	wallImg.resize(Config.cellSize, Config.cellSize);
	playerImg = loadImage("./images/idlePlayer1CROPPED.png");
	playerImg2 = createImg("./images/playerIdleAnimations.gif");
	enemyImg = createImg("./images/idleMinotaur.gif", "enemy");
	backgroundMusic = loadSound("./stylesheets/assets/map-music-but-quiet.wav");
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
	battleBackroundImage = loadImage(battleBackgroundImagePath);
}

function draw() {
	background(0);

	switch (game.state) {
		case "mapScreen":
			//  backgroundMusic.play();
			enemyImg.hide();
			playerImg2.show();
			okButton.hide();
			precisionStrikeButton.hide();
			wildFlailButton.hide();
			healButton.hide();
			fleeButton.hide();
			game.showMap();
			playerImg.resize(Config.spriteSize / 2, Config.spriteSize / 2);

			image(
				playerImg,
				game.player.gridX + Config.cellSize / 4,
				game.player.gridY + Config.cellSize / 4
			);
			// fill(Config.playerColour);
			// rect(game.player.location[0],game.player.location[1], Config.spriteSize);

			break;
		case "battleScreen":
			background(battleBackroundImage, 0, 0);
			enemyImg.show();
			playerImg2.show();
			game.showBattle();
			precisionStrikeButton.show();
			wildFlailButton.show();
			healButton.show();
			fleeButton.show();
			break;
		case "gameOver":
			okButton.hide();
			enemyImg.hide();
			playerImg2.show();
			precisionStrikeButton.hide();
			wildFlailButton.hide();
			healButton.hide();
			fleeButton.hide();
			game.showGameOver();
			break;
		case "victoryScreen":
			background(battleBackroundImage, 0, 0);
			enemyImg.hide();
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
	if (game.state === "mapScreen") {
		if (keyCode === LEFT_ARROW || keyCode === 65) {
			game.playerAction("west", 75);
		}
		if (keyCode === RIGHT_ARROW || keyCode === 68) {
			game.playerAction("east", 75);
		}
		if (keyCode === UP_ARROW || keyCode === 87) {
			game.playerAction("north", 75);
		}
		if (keyCode === DOWN_ARROW || keyCode === 83) {
			game.playerAction("south", 75);
		}
	}
}

function createOkButton() {
	okButton = createButton("OK");
	okButton.parent("okButton");

	okButton.mousePressed(() => {
		game.battle = null;
		game.state = "mapScreen";
	});
}

function createPrecisionStrikeButton() {
	precisionStrikeButton = createButton("Precision Strike");
	precisionStrikeButton.parent("strike");

	precisionStrikeButton.mousePressed(() => {
		if (game.battle) {
			game.battle.takeTurn(Ability.find("Precision Strike"));
		}
	});
}

function createWildFlailButton() {
	wildFlailButton = createButton("Wild Flail");
	//wildFlailButton.position(500, 500);
	wildFlailButton.parent("wildflail");

	wildFlailButton.mousePressed(() => {
		if (game.battle) {
			game.battle.takeTurn(Ability.find("Wild Flail"));
		}
	});
}

function createHealButton() {
	healButton = createButton("Recovery");
	healButton.parent("heal");

	healButton.mousePressed(() => {
		if (game.battle) {
			heal = new Ability("Recovery");
			game.battle.takeTurn(heal);
		}
	});
}

function createFleeButton() {
	fleeButton = createButton("Flee!");
	fleeButton.parent("flee");

	fleeButton.mousePressed(() => {
		if (Math.random() > Config.fleeFailureChance) {
			game.battle = null;
			game.state = "mapScreen";
		} else {
			game.battle.takeTurn("Flee!", true);
		}
	});
}
