class Battle {
  constructor(player1 = "Captain Planet", player2 = "Skeletor") {
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
}
