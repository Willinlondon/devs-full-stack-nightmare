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
    // -----
    // Leaving this line in - this is the ideal for how this function
    // would operate but you can see our issue documented below.
    // if (direction == 'right') {return move_right()};
    // -----
    if (direction == 'right') {this.location[0] += 1 };
    if (direction == 'left') {this.location[0] -= 1};
    if (direction == 'up') {this.location[1] += 1};
    if (direction == 'down') {{this.location[1] -= 1}};
  }

  // - Jasmine says this is undefined
  //move_right() {
  //  this.location[0] += 1 
  //}
  
  // - Jasmine says this is undefined
  // move_right = function() {
  //   this.location[0] += 1
  // }

}
