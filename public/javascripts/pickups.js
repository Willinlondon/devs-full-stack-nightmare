class Pickups {
  static all = [
    function(game, x, y) {
      let ticketXS = new Item(
        game, x, y, 0.5,
        "You attempted an xs ticket",
        "Job done! Your health increased by 1",
        () => { if (game.player.health < game.player.maxHealth) game.player.health += 1 },
      )

      return ticketXS;
    }
  ]

  static sample(game, x, y) {
    return this.all[Math.floor(Math.random() * this.all.length)](game, x, y)
  }
}
