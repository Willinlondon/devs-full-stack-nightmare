class Item {
  constructor(game, x, y, description = "a ticket", info = "You picked up a ticket", effect = null, amount = 0) {
    this.game = game;
    this.mapX = x;
    this.mapY = y;
    this.description = description;
    this.effect = effect;
    this.amount = amount;
    this.available = true;
    this.info = info;
  }

  pickUp() {
    if (this.available) {
      this.game.player.score += 100;
      this.game.state = "itemScreen"
      this.applyEffect();
      this.available = false;
    }
  }

  applyEffect() {
    switch(this.effect) {
      case "addHealth":
        this.game.player.health += this.amount;
      break;
      case "decreaseHealth":
        this.game.player.health -= this.amount;
      break;
      case "addXP":
      break;
      case "increaseMaxHealth":
        this.game.player.maxHealth += this.amount;
      break;
      default:
      break;
    }
  }

  show() {
    // Broken! Debug?
    if (this.available) {
      fill(0, 255, 0)
      circle(this.regionX + Config.cellSize / 2, this.regionY + Config.cellSize / 2, 20)
    }
  }
}
