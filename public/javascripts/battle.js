class Battle {
  constructor(player1 = 'Captain Planet', player2 = 'Skeletor') {
    this.player1 = player1;
    this.player2 = player2;
  }

  takeTurn() {
    let player1Attack = Math.floor(Math.random() * Config.baseAttack);
    let player2Attack = Math.floor(Math.random() * Config.baseAttack);
   
    if (Math.random() * 100 > Config.dodgeChance) {
      console.log("Player attack", player1Attack)
      this.player2.takeHit(player1Attack);
    }
    else {
      console.log("Jasmine dodged the Player's attack")
    }

    if (Math.random() * 100 > Config.dodgeChance) {
      console.log("Jasmine attack", player2Attack)
      this.player1.takeHit(player2Attack);
    }
    else {
      console.log("Player dodged Jasmine's attack")
    }
    // switch (true) {
    //   case player1Attack >= player2Attack:
    //     this.player2.takeHit(player1Attack);
    //   break;
    //   case player2Attack > player1Attack:
    //     this.player1.takeHit(player2Attack);
    //   break;
    //   default:
    //   break;
    // }
  }

  over() {
    return (this.player1.hasFainted() || this.player2.hasFainted());
  }

  winner() {
    return this.player1.health >= this.player2.health ? this.player1 : this.player2
  }
}
