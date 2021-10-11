class Battle {
  constructor(player1 = 'Captain Planet', player2 = 'Skeletor') {
    this.player1 = player1;
    this.player2 = player2;
    this.log = [];
  }

  takeTurn() {
    let player1Attack = this._attack(Config.baseMinAttack, Config.baseMaxAttack);
    let player2Attack = this._attack(Config.baseMinAttack, Config.baseMaxAttack);

    if (Math.random() * 100 > Config.dodgeChance) {
      if (Math.random() * 100 < Config.critChance) {
        console.log("Player CRIT", player1Attack * Config.critAttackMultiplier)
        this.player2.takeHit(player1Attack * Config.critAttackMultiplier)
      }
      else {
      console.log("Player attack", player1Attack)
      this.player2.takeHit(player1Attack);
      }
    }
    else {
      console.log("Jasmine dodged the Player's attack")
    }

    if (Math.random() * 100 > Config.dodgeChance) {
      if (Math.random() * 100 < Config.critChance) {
        console.log("Jasmine CRIT", player2Attack * Config.critAttackMultiplier)
        this.player1.takeHit(player2Attack * Config.critAttackMultiplier)
      }
      else {
      console.log("Jasmine attack", player2Attack)
      this.player1.takeHit(player2Attack);
      }
    }
    else {
      console.log("Player dodged Jasmine's attack")
    }
  }

  over() {
    return (this.player1.hasFainted() || this.player2.hasFainted());
  }

  winner() {
    return this.player1.health >= this.player2.health ? this.player1 : this.player2
  }

  _attack(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
  } 
}
