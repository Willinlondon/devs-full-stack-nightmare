describe("Game", () => {
	describe("When a new game is created", () => {
		beforeEach(() => {
			game = new Game();
		});

		it("creates a map upon new game", () => {
			expect(game.map).toBeInstanceOf(Array);
		});

		it("creates a player upon new game", () => {
			expect(game.player).toBeInstanceOf(Character);
		});

		it("creates a default inGame state upon new game", () => {
			expect(game.state).toEqual("inGame");
		});
	});

	describe("checks the random battle trigger", () => {
		beforeEach(() => {
			game = new Game();
		});

		it("checks the range of the encounter roll", () => {
			expect(game._encounterRoll()).toBeLessThanOrEqual(100);
		});

		it("can change this.state ", () => {
			game._checkState(81);
			expect(game.state).toEqual("battle");
		});
	});

	describe("it checks the game loop", () => {
		beforeEach(() => {
			game = new Game();
		});

		it("the player should lose - with a let and cheese but good enough", () => {
			let lostGame = losingTheGame(game);
			expect(lostGame).toEqual('gameOver')
		});

	});
});
