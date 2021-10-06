class Map {
  constructor() {
    this.mapArray = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
  }

  createHardCodedMap() {
    return this.mapArray;
  }

  createMap(0, 5) {
    const array = [];
    for (let i = 0; i < dimensions; i++) {
      array.push([]);
      for (let j = 0; j < dimensions; j++) {
        array[i].push(num);
      }
    }
    return array;
  }
}

module.exports = Map;
