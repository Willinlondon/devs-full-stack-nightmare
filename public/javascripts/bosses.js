class Bosses {
  static all = [
    function() {
      let git = new Character(
      'Git, Master of Sabotage',
        120,
        ["Unknown Origin", "Push Upstream", "Conflictive Merge", "Invisible Branch", "Detatch Head"],
        "oppressed",
        "imposing, diabolical"
      )

      return git;
    },

    function() {
      let zoomer = new Character(
        'Zoomer',
        90,
        ["Visual Termination", "Countdown Initiated", "Time's End", "Unforseen Blackout"],
        "caught",
        "impatient, rude"
      )

      return zoomer;
    },

    function() {
      let jasmine = new Character(
        'Jasmine',
        Config.defaultEnemyHealth,
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
