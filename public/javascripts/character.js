class Character {
  constructor(name) {
    this.name = name;
    this.health = 100;
    this.location = [0,0];
  }

  attack() {
    return Math.floor(Math.random() * 20)
  }

  move(direction, amount) {
    if (direction == 'right') {this._moveRight(amount)};
    if (direction == 'left') {this._moveLeft(amount)};
    if (direction == 'up') {this._moveUp(amount)};
    if (direction == 'down') {this._moveDown(amount)};
  }

  // Directions are here as private methods
  
  _moveRight(amount) {
    if (this.location[0] == 675) {return}
    this.location[0] += amount
  }
  
  _moveLeft(amount) {
    if (this.location[0] == 0) {return}
    this.location[0] -= amount
  }

  _moveUp(amount) {
    if (this.location[1] == 0) {return}
    this.location[1] -= amount
  }

  _moveDown(amount) {
    if (this.location[1] == 675) {return}
    this.location[1] += amount
  }


  // - Jasmine says this is undefined
  // move_right = function() {
  //   this.location[0] += 1
  // }

}

