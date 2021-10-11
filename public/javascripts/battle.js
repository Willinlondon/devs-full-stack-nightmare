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

    switch() {
      case player1Attack >= player2Attack:
        player2.takeHit(player1Attack);
      break;
      case player2Attack < player1Attack:
        player1.takeHit(player2Attack);
      break;
      default:
      break;
    }
  }
}
