class Ability {
  constructor(
    name, 
    type,
    minAttack,
    maxAttack, 
    minHeal,
    maxHeal) 
    {
    this.name = name;
    this.type = type;
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