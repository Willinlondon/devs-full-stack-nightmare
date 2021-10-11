class Battle {
  constructor(player1 = 'Captain Planet', player2 = 'Skeletor') {
    this.player1 = player1;
    this.player2 = player2;
  }

  winner(player1Roll, player2Roll) {
    if (player1Roll > player2Roll) {
      return 'Player';
    } 
    else if (player1Roll < player2Roll){
      return 'Enemy'
    } 
    else {
      return 'Draw'
    }
  }

  takeTurn() {
    let player1Attack = Math.floor(Math.random() * Config.baseAttack);
    let player2Attack = Math.floor(Math.random() * Config.baseAttack);

    console.log(`Player 1 attack ${player1Attack}; Player 2 attack ${player2Attack}`)
    switch (true) {
      case player1Attack >= player2Attack:
        console.log("Player 1 wins round")
        this.player2.takeHit(player1Attack);
        // player1.takeHit(Math.floor(Math.random(player2Attack / 2)));
      break;
      case player2Attack > player1Attack:
        console.log("Player 2 wins round")
        this.player1.takeHit(player2Attack);
      break;
      default:
      break;
    }
  }
}
