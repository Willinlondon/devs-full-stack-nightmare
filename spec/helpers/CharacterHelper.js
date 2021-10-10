characterMoves = function (character, square) {
  character.move('right', square); [1, 0];
  character.move('right', square); [2, 0];
  character.move('up', square); [2, -1];
  character.move('up', square); [2, -2];
  character.move('left', square); [1, 1];
  character.move('down', square); [1, -1];
};
