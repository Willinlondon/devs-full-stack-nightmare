class NormalEnemies {
  static all = [
    function() {
      let bugger = new Character(
      'Bugger',
      30,
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
