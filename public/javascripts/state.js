class State {
  constructor(name, showFunction) {
    this.name = name;
    this.showFunction = showFunction;
  }

  show() {
    this.showFunction();
  }
}
