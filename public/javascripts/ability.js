class Ability {
  constructor(
    name, 
    minAttack,
    maxAttack, 
    minHeal,
    maxHeal) 
    {
    this.name = name;
    this.min = minAttack;
    this.max = maxAttack;
    this.minHeal = minHeal;
    this.maxHeal = maxHeal;
    this.constructor.all.push(this)
  }

  static all = []
  static find(name) {
    return Ability.all.find(ability => ability.name === name);
  }
}