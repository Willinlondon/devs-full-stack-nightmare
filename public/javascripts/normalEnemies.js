class NormalEnemies {
  static all = [
    new Character(
    'Bugger',
    80,
    ["Break", "Crash"],
    "ambushed",
    "a pesky"
    )
  ]

  static sample() {
    return this.all[Math.floor(Math.random() * this.all.length)]
  }
}
