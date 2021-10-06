describe('Character', () => {
  const { Character } = require('../public/javascripts/Character');
  const { characterMoves } = require('../spec/helpers/CharacterHelper');

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

  it('expects a player attack to return a number between 0 and 20', () => {
    expect(player.attack()).toBeWithinRange(0,20);
  });

  describe("when a user is attempting to move", function() {

   beforeEach(() => {
     player2 = new Character("Spiderman");
   });

   it('expects a player to be able to move right', () => {
     player2.move('right');
     expect(player2.location).toEqual([1,0]);
   });

   it('expects a player to be able to move left', () => {
    player2.move('left');
    expect(player2.location).toEqual([-1,0]);
  });

  it('expects a player to be able to move up', () => {
    player2.move('up');
    expect(player2.location).toEqual([0,1]);
  });

  it('expects a player to be able to move down', () => {
    player2.move('down');
    expect(player2.location).toEqual([0,-1]);
  });

  it('expects to receive a specific format after a series of moves', () => {
    // We've written a helper method which you can find in the helpers
    // folder and is referenced above
    // No idea how to call it though so we've stuck the player actions in here
    player2.move('right');
    player2.move('right');
    player2.move('up'); 
    player2.move('up'); 
    player2.move('left'); 
    player2.move('down');
    expect(player2.location).toEqual([1,1]);
  });

   });
});
