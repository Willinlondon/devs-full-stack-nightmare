class Bosses {
  static all = [
    new Character(
    'Git, Master of Sabotage',
      120,
      ["Unknown Origin", "Push Upstream", "Conflictive Merge", "Invisible Branch", "Detatch Head"],
      "oppressed",
      "imposing, diabolical"
    ),
    new Character(
      'Zoomer',
      90,
      ["Visual Termination", "Countdown Initiated", "Time's End", "Unforseen Blackout"],
      "caught",
      "impatient, rude"
    ),
    new Character(
      'Jasmine',
      Config.defaultEnemyHealth,
      ["Undefined Reality", "Failure Bombardment", "Confusion & Chaos"],
      "ambushed",
      "an angry, obnoxious"
    )
  ]

  static sample() {
    return this.all[Math.floor(Math.random() * this.all.length)]
  }
}
