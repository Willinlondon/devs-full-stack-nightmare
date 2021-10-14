class Bosses {
  static all = [
    new Character(
    'Git, Master of Sabotage',
      Config.bossGitHealth,
      ["Unknown Origin", "Push Upstream", "Conflictive Merge", "Invisible Branch", "Detatch Head"],
      "oppressed",
      "imposing, diabolical"
    ),
    new Character(
      'Zoomer',
      Config.bossZoomHealth,
      ["Visual Termination", "Countdown Initiated", "Time's End", "Unforseen Blackout"],
      "caught",
      "impatient, rude"
    ),
    new Character(
      'Jasmine',
      Config.bossJasmineHealth,
      ["Undefined Reality", "Failure Bombardment", "Confusion & Chaos"],
      "ambushed",
      "an angry, obnoxious"
    )
  ]

  static sample() {
    return this.all[Math.floor(Math.random() * this.all.length)]
  }
}
