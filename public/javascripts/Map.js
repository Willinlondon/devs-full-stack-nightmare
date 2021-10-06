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

	createMap() {
		// setting Map parameters
		let dimensions = 10,
			maxTunnels = 10,
			maxLength = 4;
		// generating "empty map" full of walls represented by 1's
		let map = this.createArray(1, dimensions);
		// setting random starting point
		let currentRow = Math.floor(Math.random() * dimensions),
			currentColumn = Math.floor(Math.random() * dimensions);
		// setting directions that tunnels can be generated in i.e N, S, E, W
		let directions = [
			[-1, 0],
			[1, 0],
			[0, -1],
			[0, 1],
		];
		let lastDirection = [],
			randomDirection;
		// pick a new random direction to make a tunnel in so long as its not the same as before or going back on itself
		while (maxTunnels && dimensions && maxLength) {
			do {
				randomDirection =
					directions[Math.floor(Math.random() * directions.length)];
			} while (
				(randomDirection[0] === -lastDirection[0] &&
					randomDirection[1] === -lastDirection[1]) ||
				(randomDirection[0] === lastDirection[0] &&
					randomDirection[1] === lastDirection[1])
			);
			// set random tunnel length
			let randomLength = Math.ceil(Math.random() * maxLength),
				tunnelLength = 0;
			while (tunnelLength < randomLength) {
				if (
					// break to stop tunnel leaving map
					(currentRow === 0 && randomDirection[0] === -1) ||
					(currentColumn === 0 && randomDirection[1] === -1) ||
					(currentRow === dimensions - 1 && randomDirection[0] === 1) ||
					(currentColumn === dimensions - 1 && randomDirection[1] === 1)
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

// let map = new Map();
// console.log(map.createMap(20, 3));
