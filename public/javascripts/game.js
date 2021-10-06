class Game {
  constructor(map = new Map, player = new Character) {
    this.map = map.createMap();
    this.player = player;
  }
}
