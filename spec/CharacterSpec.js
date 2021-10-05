describe('Character', () => {
  const { Character } = require('../public/javascripts/Character');

  beforeEach(() => {
    player = new Character("Will");
  });

  it('has a default health of 100', () => {
    expect(player.health).toBe(100);
  });
});
