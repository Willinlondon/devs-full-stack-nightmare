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
     square = 75
     player2.location = [square,square]
   });

   it('expects a player to be able to move right', () => {
     player2.move('right', square);
     expect(player2.location).toEqual([square * 2, square]);
   });

    it('expects a player to be able to move left', () => {
      player2.move('left', square);
      expect(player2.location).toEqual([0,square]);
    });

    it('expects a player to be able to move up', () => {
      player2.move('up', square);
      expect(player2.location).toEqual([square,0]);
    });

    it('expects a player to be able to move down', () => {
      player2.move('down', square);
      expect(player2.location).toEqual([square,square * 2]);
    });

    it('expects to receive a specific format after a series of moves', () => {
      characterMoves(player2,square);
      expect(player2.location).toEqual([square * 2,square]);
    });

    it('is unable to move out of the play area to the left', () => {
      player2.move('left', square);
      player2.move('left', square);
      expect(player2.location).toEqual([0,square]);
    });

    it('is unable to move out of the play area up', () => {
      player2.move('up', square);
      player2.move('up', square);
      expect(player2.location).toEqual([square,0]);
    });

    it('is unable to move out of the play area to the right', () => {
      player2.location = [square * 8,square * 8]
      player2.move('right', square);
      player2.move('right', square);
      expect(player2.location).toEqual([square * 9,square * 8]);
    });

    it('is unable to move out of the play area down', () => {
      player2.location = [square * 8,square * 8]
      player2.move('down', square);
      player2.move('down', square);
      expect(player2.location).toEqual([square * 8,square * 9]);
    });
  });
});
