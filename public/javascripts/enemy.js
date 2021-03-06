class Enemy {
  constructor(name, health = Config.defaultEnemyHealth) {
    this.name = name
    this.health = health
    this.maxHealth = health
  }

  hasFainted() {
    return this.health <= 0;
  }

	takeHit(amount) {
		this.health -= amount;
	}
}