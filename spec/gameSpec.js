describe('Game', () => {

  describe('When a new game is created', () => {

    beforeEach(() => {
      game = new Game;
    });

    it('creates a map upon new game', () => {
      expect(game.map).toBeInstanceOf(Array);
    });

    it('creates a player upon new game', () => {
      expect(game.player).toBeInstanceOf(Character);
    });

    it('creates a default inGame state upon new game', () => {
      expect(game.state).toEqual('inGame');
    });

  });

  describe('checks the random battle trigger', () => {

    beforeEach(() => {
      game = new Game;
    });

    it('checks the range of the encounter roll', () => {
      expect(game._encounterRoll()).toBeLessThanOrEqual(100);
    });
  })
});
