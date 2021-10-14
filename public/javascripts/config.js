class Config {
	static canvasWidth = 750;
	static canvasHeight = 750;
	static cellSize = 75;
	static encounterProbability = 0.9;
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
	static regionDivisor = 10;
	static calculatedProcess = new Ability("Calculated Process", "Damaging", 5, 8, 0, 0);
	static stabInTheDark = new Ability("Stab in the Dark", "Damaging", 2, 13, 0, 0);
	static refreshHeal = new Ability("Refresh", "Heal", 0, 0, 4, 7);
  static bossJasmine = new Character(
    'Jasmine',
    Config.defaultEnemyHealth,
    ["Undefined Reality", "Failure Bombardment", "Confusion & Chaos"],
    "ambushed",
    "an angry, obnoxious"
    )
	static undefinedReality = new Ability("Undefined Reality", "Damaging", 5, 8, 0, 0);
	static failureBombardment = new Ability("Failure Bombardment", "Damaging", 6, 12, 0, 0);
  static confusionAndChaos = new Ability("Confusion & Chaos", "Damaging", 9, 16, 0, 0);  
  static bossZoom = new Character(
    'Zoomer',
    90,
    ["Visual Termination", "Countdown Initiated", "Time's End", "Unforseen Blackout"],
    "caught",
    "impatient, rude"
  )
  static visualTermination = new Ability("Visual Termination", "Damaging", 5, 8, 0, 0);
  static countdownInitiated = new Ability("Countdown Initiated", "Damaging", 6, 12, 0, 0);
  static timesEnd = new Ability("Time's End", "Damaging", 6, 12, 0, 0);
  static unforseenBlackout = new Ability("Unforseen Blackout", "Damaging", 6, 12, 0, 0);
  static bossGit = new Character(
    'Git, Master of Sabotage',
    120,
    ["Unknown Origin", "Push Upstream", "Conflictive Merge", "Invisible Branch", "Detatch Head"],
    "oppressed",
    "imposing, diabolical"
  )
  static unknownOrigin = new Ability("Unknown Origin", "Damaging", 5, 8, 0, 0);
  static pushUpstream = new Ability("Push Upstream", "Heal", 0, 0, 10, 20);
  static conflictiveMerge = new Ability("Conflictive Merge", "Damaging", 5, 8, 0, 0);
  static noiseScale = 0.01;
  static noiseRange = 10000;
  static bossSpawnThreshold = 75;
  static difficultyNoiseOffset = 0.05;
  static luckNoiseOffset = 0.376;
  static itemSpawnThreshold = 65;
}
