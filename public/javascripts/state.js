class State {
  constructor(name, showFunction) {
    this.name = name;
    this.showFunction = showFunction;
    this.constructor.all.push(this);
  }

  static all = [];

  static find(name) {
    return this.all.find(state => state.name === name);
  }

  show() {
    this.showFunction();
  }
}
