describe('Character', () => {
  const { Character } = require('../public/javascripts/Character');

  beforeEach(() => {
    player = new Character("Will");
  });

  it('has a default health of 100', () => {
    expect(player.health).toBe(100);
  });

  it('accepts a player name as input and names the character', () => {
    expect(player.name).toBe("Will");
  });

  it('expects a default location of 0, 0', () => {
    expect(player.location).toEqual([0, 0]);
  });

  it('expects a player attack to return a number between 1 and 20', () => {
    expect(player.attack()).toBeWithinRange(1,20);
  });
});
