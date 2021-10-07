fdescribe('Map', () => {
  const Map = require('../public/javascripts/Map');
  let map;

  beforeEach(() => {
    map = new Map();
  });
  describe('createArray', () => {
    it('returns correct array', () => {
      const map = new Map();
      expect(map.createArray(3, 3)).toEqual([
        [3, 3, 3],
        [3, 3, 3],
        [3, 3, 3],
      ]);
      // spyOn(Math, 'random').and.returnValues(0.1, 0.2, 0.3, 0.4);
    });
  });

  describe('createMap', () => {
    it('returns array with correct length', () => {
      expect(map.createMap().length).toEqual(10);
    });

    it('returns nested arrays with correct lengths', () => {
      expect(map.createMap()[0].length).toEqual(10);
    });

    fit('returns correct array with Math.rand stubbed', () => {
      spyOn(Math, 'random').and.returnValues(0.5);
      expect(map.createMap()).toEqual([]);
    });
  });
});
