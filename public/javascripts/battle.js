class Battle {
  constructor(player1 = 'Captain Planet', player2 = 'Skeletor') {
    this.player1 = player1;
    this.player2 = player2;
  }

  // winner(player1Roll, player2Roll) {
  //   if (player1Roll > player2Roll) {
  //     return 'Player';
  //   } 
  //   else if (player1Roll < player2Roll){
  //     return 'Enemy'
  //   } 
  //   else {
  //     return 'Draw'
  //   }
  // }

  takeTurn() {
    let player1Attack = Math.floor(Math.random() * Config.baseAttack);
    let player2Attack = Math.floor(Math.random() * Config.baseAttack);

    switch (true) {
      case player1Attack >= player2Attack:
        this.player2.takeHit(player1Attack);
      break;
      case player2Attack > player1Attack:
        this.player1.takeHit(player2Attack);
      break;
      default:
      break;
    }
  }

  over() {
    return this.player1.hasFainted() || this.player2.hasFainted();
  }

  winner() {
    return this.player1.health >= this.player2.health ? this.player1 : this.player2
  }
}
