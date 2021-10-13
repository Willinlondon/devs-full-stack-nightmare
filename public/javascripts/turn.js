class Turn {
	constructor(player1, player2, playerAbility, enemyAbilities, flee) {
		this.player1 = player1;
		this.player2 = player2;
		this.p1Attack = playerAbility;
    this.p2PossibleAttacks = enemyAbilities;
    this.p2Attack = [];
		this.flee = flee;
		this._judge();
	}

	outcome() {
		let p1CritString = this.p1Attack.crit ? "CRITICAL HIT! " : "";
		let p2CritString = this.p2Attack.crit ? "CRITICAL HIT! " : "";

		let p1AttackString;
		let p2AttackString;

		if (this.flee === false) {
			if (this.p1Attack.type === "Damaging") {
				if (!this.p1Attack.dodged) {
					p1AttackString = `${p1CritString}${this.player1.name} used ${this.p1Attack.name}\nand dealt ${this.p1Attack.totalDamage} damage to ${this.player2.name}!`;
				} else {
					p1AttackString = `${this.player2.name} dodged ${this.player1.name}'s attack!`;
				}
			} else {
				console.log(this.p1Attack.type);
				p1AttackString = `${this.player1.name} used ${this.p1Attack.name} and healed for ${this.p1Attack.totalHeal}!`;
			}
		} else {
			p1AttackString = `${this.player1.name} was unable to flee!`;
		}

		if (this.p2Attack.type === "Heal") {
			p2AttackString = `${this.player2.name} used ${this.p2Attack.name} and healed for ${this.p2Attack.totalHeal}!`;
		}

    return [p1AttackString, p2AttackString];
	}

	_judge() {
		// Judge player 1 move
		if (this.flee === false && this.p1Attack.type === "Damaging") {
			this.p1Attack.baseDamage = this._valueAmount(
				this.p1Attack.min,
				this.p1Attack.max
			);
			if (Math.random() > Config.dodgeChance) {
				this.p1Attack.dodged = false;

				if (Math.random() < Config.critChance) {
					this.p1Attack.crit = true;
					this.p1Attack.totalDamage =
						this.p1Attack.baseDamage * Config.critAttackMultiplier;
					this.player2.takeHit(this.p1Attack.totalDamage);
				} else {
					this.p1Attack.crit = false;
					this.p1Attack.totalDamage = this.p1Attack.baseDamage;
					this.player2.takeHit(this.p1Attack.baseDamage);
				}
			} else {
				this.p1Attack.dodged = true;
				this.p1Attack.totalDamage = this.p1Attack.baseDamage;
			}
		}

		if (this.flee === false && this.p1Attack.type === "Heal") {
			this.p1Attack.totalHeal = this._valueAmount(
				this.p1Attack.minHeal,
				this.p1Attack.maxHeal
			);
			this.player1.takeHeal(this.p1Attack.totalHeal);
		}
		// Judge player 2 move
    let abilityRoll = Math.floor(Math.random() * (this.p2PossibleAttacks.length))
    this.p2Attack = Ability.find(this.p2PossibleAttacks[abilityRoll])
		if (this.p2Attack.type == "Damaging") {
			this.p2Attack.baseDamage = this._valueAmount(
				this.p2Attack.min,
				this.p2Attack.max
			);
			if (Math.random() > Config.dodgeChance) {
				this.p2Attack.dodged = false;

				if (Math.random() < Config.critChance) {
					this.p2Attack.totalDamage =
						this.p2Attack.baseDamage * Config.critAttackMultiplier;
					this.p2Attack.crit = true;
					this.player1.takeHit(
						this.p2Attack.baseDamage * Config.critAttackMultiplier
					);
				} else {
					this.p2Attack.crit = false;
					this.p2Attack.totalDamage = this.p2Attack.baseDamage;
					this.player1.takeHit(this.p2Attack.baseDamage);
				}
			} else {
				this.p2Attack.dodged = true;
				this.p2Attack.totalDamage = this.p2Attack.baseDamage;
			}
		}

		if (this.p2Attack.type === "Heal") {
			this.p2Attack.totalHeal = this._valueAmount(
				this.p2Attack.minHeal,
				this.p2Attack.maxHeal
			);
			this.player2.takeHeal(this.p2Attack.totalHeal);
		}
	}

	_valueAmount(min, max) {
		return Math.floor(Math.random() * (max - min) + min);
	}
}
