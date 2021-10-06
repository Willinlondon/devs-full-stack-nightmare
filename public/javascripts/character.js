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
    if (direction == 'right') {this._moveRight()};
    if (direction == 'left') {this._moveLeft()};
    if (direction == 'up') {this._moveUp()};
    if (direction == 'down') {this._moveDown()};
  }

  // Directions are here as private methods
  
  _moveRight() {
    this.location[0] += 1 
  }
  
  _moveLeft() {
    this.location[0] -= 1 
  }

  _moveUp() {
    this.location[1] += 1 
  }

  _moveDown() {
    this.location[1] -= 1 
  }


  // - Jasmine says this is undefined
  // move_right = function() {
  //   this.location[0] += 1
  // }

}
