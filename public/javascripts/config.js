class Config {
    static canvasWidth = 750;
    static canvasHeight = 750;
    static cellSize = 75;
    static encounterProbability = 0.8;
    static gridSize = 10;
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
    static fleeFailureChance = 0.4;
    static defaultEnemyHealth = 80;
	  static mapDimension = 10;
	  static NoOfTunnels = 15;
  	static maxTunnelLength = 6;
    static precisionStrike = new Ability("Precision Strike", 5, 8, 0, 0);
    static wildFlail = new Ability("Wild Flail", 2, 13, 0, 0);
    static heal = new Ability("Recovery", 0, 0, 4, 7);
}
