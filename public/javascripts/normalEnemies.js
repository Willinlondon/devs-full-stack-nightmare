class NormalEnemies {
  static all = [
    function() {
      let bugger = new Character(
      'Bugger',
      Config.defaultEnemyHealth,
      ["Break", "Crash"],
      "ambushed",
      "a pesky"
      )

      return bugger;
    }
  ]

  static sample() {
    return this.all[Math.floor(Math.random() * this.all.length)]()
  }
}
