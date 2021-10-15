class Bosses {
  static all = [
    function() {
      let git = new Character(
      'Git',
        Config.bossGitHealth,
        ["Unknown Origin", "Push Upstream", "Conflictive Merge", "Invisible Branch", "Detatch Head"],
        "oppressed",
        "an imposing, diabolical"
      )

      return git;
    },

    function() {
      let zoomer = new Character(
        'Zoomer',
        Config.bossZoomHealth,
        ["Visual Termination", "Countdown Initiated", "Time's End", "Unforseen Blackout"],
        "caught",
        "an impatient, rude"
      )

      return zoomer;
    },

    function() {
      let jasmine = new Character(
        'Jasmine',
        Config.bossJasmineHealth,
        ["Undefined Reality", "Failure Bombardment", "Confusion & Chaos"],
        "ambushed",
        "an angry, obnoxious"
      )
      
      return jasmine;
    }
  ]

  static sample() {
    return this.all[Math.floor(Math.random() * this.all.length)]()
  }
}
