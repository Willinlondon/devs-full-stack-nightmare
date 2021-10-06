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

  it('expects a player to be able to move right', () => {
    player.move('right');
    expect(player.location).toEqual([1,0]);
  });

  // describe('Movement'), function() {

  // // beforeEach(() => {
  // //   player2 = new Character("Spiderman");
  // // });

  // it('expects a player to be able to move right', () => {
  //   player2 = new Character("Spiderman");
  //   player2.move(right);
  //   expect(player2.location).toEqual([1,0]);
  // });

  // }
});
