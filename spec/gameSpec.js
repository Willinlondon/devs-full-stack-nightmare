describe('Game', () => {

  beforeEach(() => {
    game = new Game;
  });

  describe('When a new game is created', () => {
    it('has a map', () => {
      expect(game.map).toBeInstanceOf(Array);
    });
  })
});
