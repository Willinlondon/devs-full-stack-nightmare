class NormalEnemies {
  static all = [
    new Character(
    'Bugger',
    30,
    ["Break", "Crash"],
    "ambushed",
    "a pesky"
    )
  ]

  static sample() {
    return this.all[Math.floor(Math.random() * this.all.length)]
  }
}
