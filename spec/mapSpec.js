describe('Map', () => {
  const Map = require('../public/javascripts/Map');
  let map;

  beforeEach(() => {
    map = new Map(10, 10, 4);
  });
  describe('createArray', () => {
    it('returns correct array', () => {
      expect(Map._createArray(1, 3)).toEqual([
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1],
      ]);
    });
  });

  describe('createMap', () => {
    it('returns array with correct length', () => {
      expect(map.createMap().length).toEqual(10);
    });

    it('returns nested arrays with correct lengths', () => {
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
        0.2
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
    it('returns correct array with Math.rand stubbed and differen starting position', () => {
      spyOn(Math, 'random').and.returnValues(
        0.4,
        0.4,
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
        0.2
      );
      expect(map.createMap()).toEqual([
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 0, 0, 1, 1, 1, 1],
        [1, 1, 1, 1, 0, 0, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      ]);
    });
    it('returns correct array with Math.rand stubbed and larger tunnels', () => {
      spyOn(Math, 'random').and.returnValues(
        0.5,
        0.5,
        0.1,
        0.5,
        0.8,
        0.5,
        0.45,
        0.5,
        0.5,
        0.5,
        0.1,
        0.5,
        0.8,
        0.5,
        0.45,
        0.5,
        0.5,
        0.5,
        0.1,
        0.5,
        0.8,
        0.5
      );
      expect(map.createMap()).toEqual([
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 0, 0, 0, 1, 1],
        [1, 1, 1, 1, 1, 0, 1, 0, 1, 1],
        [1, 1, 1, 1, 1, 0, 0, 0, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      ]);
    });

    it('returns correct array with Math.rand stubbed and tunnel that goes off map at the start', () => {
      spyOn(Math, 'random').and.returnValues(
        0.2,
        0.2,
        0.1,
        1,
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
        0.2
      );
      expect(map.createMap()).toEqual([
        [1, 1, 0, 0, 1, 1, 1, 1, 1, 1],
        [1, 1, 0, 0, 1, 1, 1, 1, 1, 1],
        [1, 1, 0, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      ]);
    });
    it('returns correct array with Math.rand stubbed and tunnely going off map at the end', () => {
      spyOn(Math, 'random').and.returnValues(
        0.7,
        0.7,
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
        1,
        0.1,
        0.5,
        0.5,
        0.2,
        0.1,
        0.2,
        0.8,
        0.2
      );
      expect(map.createMap()).toEqual([
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 1, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      ]);
    });
  });
});
