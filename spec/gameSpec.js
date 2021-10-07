describe('Game', () => {

  describe('When a new game is created', () => {

    beforeEach(() => {
      game = new Game;
    });

    it('has a map', () => {
      expect(game.map).toBeInstanceOf(Array);
    });
  })
});
