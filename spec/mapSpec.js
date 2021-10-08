fdescribe("Map", () => {
	const Map = require("../public/javascripts/Map");
	let map;

  beforeEach(() => {
    map = new Map();
  });
  describe('createArray', () => {
    it('returns correct array', () => {
      expect(Map._createArray(3, 3)).toEqual([
        [3, 3, 3],
        [3, 3, 3],
        [3, 3, 3],
      ]);
    });
  });

	describe("createMap", () => {
		it("returns array with correct length", () => {
			expect(map.createMap().length).toEqual(10);
		});

		it("returns nested arrays with correct lengths", () => {
			expect(map.createMap()[0].length).toEqual(10);
		});

    it('returns all nested arrays with correct lengths', () => {
      const newMap = map.createMap();
      for (let i = 0; i < 10; i++) {
        expect(newMap[i].length).toEqual(10);
      }
    });
    it('returns correct array with Math.rand stubbed', () => {
      spyOn(Math, 'random').and.returnValues(
        0.5,
        0.5,
        0.1,
        0.2,
        0.8,
        0.2,
        0.45,
        0.2,
        0.5,
        0.2,
        0.1,
        0.2,
        0.8,
        0.2,
        0.45,
        0.2,
        0.5,
        0.2,
        0.1,
        0.2,
        0.8,
        0.2,
        0.45,
        0.2,
        0.5,
        0.2,
        0.1,
        0.2,
        0.8,
        0.2,
        0.45,
        0.2,
        0.5,
        0.2,
        0.1,
        0.2,
        0.8
      );
      expect(map.createMap()).toEqual([
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 0, 0, 1, 1, 1],
        [1, 1, 1, 1, 1, 0, 0, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      ]);
    });
  });
});
