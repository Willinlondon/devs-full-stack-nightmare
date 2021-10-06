class Character {
  constructor(name) {
    this.name = name;
    this.health = 100;
    this.location = [0,0];
  }

  attack() {
    return Math.floor(Math.random() * 20)
  }

  move(direction) {
    if (direction == 'right') {return move_right()};
    if (direction == 'left') {return move_left()};
    if (direction == 'up') {return move_up()};
    if (direction == 'down') {return move_down()};
  }

  move_right() {
    this.location[0] += 1
  }
}

module.exports = { Character: Character }
