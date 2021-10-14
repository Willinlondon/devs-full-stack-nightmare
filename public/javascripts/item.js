class Item {
  constructor(game, x, y, rarity, descriptionText, effectText, effect) {
    this.game = game;
    this.mapX = x;
    this.mapY = y;
    this.rarity = rarity;
    this.descriptionText = descriptionText;
    this.effectText = effectText;
    this.effect = effect;
    this.available = true;
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
    if (Math.random() > this.rarity) {
      this.effect()
    } else {
      this.effectText = 'You completed it uneventfully'
    }
  }
}
