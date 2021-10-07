class Map {
  constructor() {
    this.dimensions = 10;
    this.directions = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ];
  }

  createArray(wall, dimensions) {
    const array = [];
    for (let i = 0; i < dimensions; i++) {
      array.push([]);
      for (let j = 0; j < dimensions; j++) {
        array[i].push(wall);
      }
    }
    return array;
  }

  static sampleNumber() {
    return Math.random();
  }

  static isInvalidDirection(randomDirection, lastDirection) {
    return (
      (randomDirection[0] === -lastDirection[0] &&
        randomDirection[1] === -lastDirection[1]) ||
      (randomDirection[0] === lastDirection[0] &&
        randomDirection[1] === lastDirection[1])
    );
  }

  static randomPositionGenerator() {
    return Math.floor(Map.sampleNumber() * this.dimensions);
  }

  createMap() {
    // console.log('test', Map.sampleNumber());
    // setting Map parameters
    let maxTunnels = 10;
    const maxLength = 4;
    // generating "empty map" full of walls represented by 1's
    const map = this.createArray(1, this.dimensions);
    // setting random starting point
    let currentRow = Math.floor(Map.sampleNumber() * this.dimensions);
    let currentColumn = Math.floor(Map.sampleNumber() * this.dimensions);
    // setting directions that tunnels can be generated in i.e N, S, E, W
    let lastDirection = [];
    let randomDirection;
    // pick a new random direction to make a tunnel in so long as its not the same as before or going back on itself
    while (maxTunnels && this.dimensions && maxLength) {
      do {
        randomDirection =
          this.directions[
            Math.floor(Map.sampleNumber() * this.directions.length)
          ];
      } while (Map.isInvalidDirection(randomDirection, lastDirection));
      // set random tunnel length
      const randomLength = Math.ceil(Map.sampleNumber() * maxLength);
      let tunnelLength = 0;
      while (tunnelLength < randomLength) {
        if (
          // break to stop tunnel leaving map
          (currentRow === 0 && randomDirection[0] === -1) ||
          (currentColumn === 0 && randomDirection[1] === -1) ||
          (currentRow === this.dimensions - 1 && randomDirection[0] === 1) ||
          (currentColumn === this.dimensions - 1 && randomDirection[1] === 1)
        ) {
          break;
        } else {
          // dig a tunnel
          map[currentRow][currentColumn] = 0;
          currentRow += randomDirection[0];
          currentColumn += randomDirection[1];
          tunnelLength++;
        }
      }
      if (tunnelLength) {
        lastDirection = randomDirection;
        maxTunnels--;
      }
    }
    return map;
  }
}

module.exports = Map;

map = new Map();
console.log(map.createMap());
