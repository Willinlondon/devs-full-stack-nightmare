class Character {
  constructor(name) {
    this.name = name;
    this.health = 100;
    this.location = [0,0];
  }

  attack() {
    return Math.floor(Math.random() * 20)
  }
}

module.exports = { Character: Character }
