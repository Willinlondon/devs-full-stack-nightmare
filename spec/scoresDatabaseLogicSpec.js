fdescribe('scoreDatabaseLogic', () => {
  const scoresDatabaseLogic = require('../model/databaseLogic/scoresDatabaseLogic');
  require('./databasehelpers');
  let scoresData;
  let newScore;

  describe('#all', () => {
    beforeAll(async () => {
      scoresData = await scoresDatabaseLogic.all();
    });
    it('returns array of correct length', () => {
      expect(scoresData.length).toEqual(1);
    });
    it('returns object with correct keys', () => {
      expect(Object.keys(scoresData[0])).toContain('id');
      expect(Object.keys(scoresData[0])).toContain('username');
      expect(Object.keys(scoresData[0])).toContain('score');
    });

    it('returns correct values in object', () => {
      expect(scoresData[0].id).toEqual(1);
      expect(scoresData[0].username).toEqual('test-player');
      expect(scoresData[0].score).toEqual(10);
    });
  });
});
