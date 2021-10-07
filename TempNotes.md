// Built-in P5 function

// To add movement

function keyPressed() {
  if (keyCode === UP_ARROW) {
    game.player.move("up");
    game.rollForEncounter();
  } else if (keyCode === RIGHT_ARROW) {
    game.player.move("right");
    game.rollForEncounter();
  } else if (keyCode === DOWN_ARROW) {
    game.player.move("down");
    game.rollForEncounter();
  } else if (keyCode === LEFT_ARROW) {
    game.player.move("left");
    game.rollForEncounter();
  }
  turns += 1;
}

