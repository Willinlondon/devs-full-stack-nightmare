class Config {
	static canvasWidth = 750;
	static canvasHeight = 750;
	static cellSize = 75;
	static encounterProbability = 0.5;
	static gridSize = 100;
	static spriteSize = 75;
	static playerColour = 155;
	static wallColour = [150, 50, 150];
	static battleFontSize = 32;
	static battleTextColor = [212, 217, 166];
	static playerHealth = 110;
	static critAttackMultiplier = 3;
	static victoryScreenBackground = [251, 72, 196];
	static dodgeChance = 0.1;
	static critChance = 0.1;
	static fleeFailureChance = 0.1;
	static defaultEnemyHealth = 80;
	static mapDimension = 100;
	static NoOfTunnels = 50;
	static maxTunnelLength = 20;
	static regionDivisor = 10; // meaning e.g. 2 horizontally * 2 vertically, = 4 in total
	static precisionStrike = new Ability("Precision Strike", "Damaging", 5, 8, 0, 0);
	static wildFlail = new Ability("Wild Flail", "Damaging", 2, 13, 0, 0);
	static heal = new Ability("Recovery", "Heal", 0, 0, 4, 7);
	static undefinitedReality = new Ability("Undefined Reality", "Damaging", 5, 8, 0, 0);
	static unexpectedFailure = new Ability("Unexpected Failure", "Heal", 0, 0, 4, 7);
    static noiseScale = 0.1;
    static noiseRange = 100;
}
