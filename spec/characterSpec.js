describe('Character', () => {

  describe("when a new user is initialized the following should pass", function() {
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

});

describe("these should test when a character attacks", function() {

  beforeEach(() => {
    player = new Character("Spiderman");
  });

  it('expects a player attack to return a number less than 21', () => {
    let attack = player.attack();

    expect(attack).toBeLessThan(21)
  });

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
        characterMoves(player2);
        expect(player2.location).toEqual([1,1]);
    });
  });
});
