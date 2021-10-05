class Character {
  constructor(name) {
    this.name = name;
    this.health = 100;
    this.location = [0,0];
    console.log("Made a character!")
  }

  attack() {

  }
}

module.exports = { Character: Character }
