class Turn {
  constructor(player1, player2) {
    this.player1 = player1;
    this.player2 = player2;
    this.p1Attack = new Object;
    this.p2Attack = new Object;
    this._judge();
  }

  outcome() {
    
  }

  _judge() {
    this.p1Attack.baseDamage = this._attack(Config.baseMinAttack, Config.baseMaxAttack);
    this.p2Attack.baseDamage = this._attack(Config.baseMinAttack, Config.baseMaxAttack);

    // Judge player 1 move

    if (Math.random() > Config.dodgeChance) {
      if (Math.random() < Config.critChance) {
        console.log("Player CRIT", this.p1Attack.baseDamage * Config.critAttackMultiplier)
        this.p1Attack.crit = true
        this.player2.takeHit(this.p1Attack.baseDamage * Config.critAttackMultiplier)
      }
      else {
        console.log("Player attack", this.p1Attack.baseDamage)
        this.p1Attack.crit = false
        this.player2.takeHit(this.p1Attack.baseDamage);
      }
    } else {
      console.log("Jasmine dodged the Player's attack")
    }

    // Judge player 2 move

    if (Math.random() > Config.dodgeChance) {
      if (Math.random() < Config.critChance) {
        console.log("Jasmine CRIT", this.p2Attack.baseDamage * Config.critAttackMultiplier)
        this.p2Attack.crit = true
        this.player1.takeHit(this.p2Attack.baseDamage * Config.critAttackMultiplier)
      }
      else {
        console.log("Jasmine attack", this.p2Attack.baseDamage)
        this.p2Attack.crit = false
        this.player1.takeHit(this.p2Attack.baseDamage);
      }
    } else {
      console.log("Jasmine dodged the Player's attack")
    }
  }

  _attack(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
  } 
}

//   takeTurn() {
//     // let player1Attack = this._attack(Config.baseMinAttack, Config.baseMaxAttack);
//     // let player2Attack = this._attack(Config.baseMinAttack, Config.baseMaxAttack);
// 
//     if (Math.random() > Config.dodgeChance) {
//       if (Math.random() < Config.critChance) {
//         // console.log("Player CRIT", player1Attack * Config.critAttackMultiplier)
//         this.player2.takeHit(p1Attack * Config.critAttackMultiplier)
//       }
//       else {
//       // console.log("Player attack", player1Attack)
//       this.player2.takeHit(p1Attack);
//       }
//     }
//     else {
//       // console.log("Jasmine dodged the Player's attack")
//     }
// 
//     if (Math.random() * 100 > Config.dodgeChance) {
//       if (Math.random() * 100 < Config.critChance) {
//         console.log("Jasmine CRIT", player2Attack * Config.critAttackMultiplier)
//         this.player1.takeHit(player2Attack * Config.critAttackMultiplier)
//       }
//       else {
//       console.log("Jasmine attack", player2Attack)
//       this.player1.takeHit(player2Attack);
//       }
//     }
//     else {
//       console.log("Player dodged Jasmine's attack")
//     }
  // }


