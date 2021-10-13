class Battle {
  constructor(player1 = 'Captain Planet', player2 = 'Skeletor') {
    this.player1 = player1;
    this.player2 = player2;
    this.log = [];
  }

  takeTurn(playerAbility, flee = false) {
    let turn = new Turn(this.player1, this.player2, playerAbility, this.player2.abilities, flee);
    this.log.push(turn);
    this.outcomeStrings = turn.outcome();
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
