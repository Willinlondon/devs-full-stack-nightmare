describe('scoreDatabaseLogic', () => {
  const scoresDatabaseLogic = require('../model/databaseLogic/scoresDatabaseLogic');
  require('./databasehelpers');
  let scoresData;
  let newScore;

  beforeEach(async () => {
    scoresData = await scoresDatabaseLogic.all();
  });

  describe('#newScore', () => {
    beforeEach(async () => {});
    it('returns array of length 1', async () => {
      newScore = await scoresDatabaseLogic.newScore('test-player-2', 10);
      expect(newScore.length).toEqual(1);
    });
    it('returns object with correct keys', async () => {
      newScore = await scoresDatabaseLogic.newScore('test-player-2', 10);
      const updatedScoresData = await scoresDatabaseLogic.all();
      expect(Object.keys(updatedScoresData[1])).toContain('id');
      expect(Object.keys(updatedScoresData[1])).toContain('username');
      expect(Object.keys(updatedScoresData[1])).toContain('score');
    });
    it('returns correct values in object', async () => {
      newScore = await scoresDatabaseLogic.newScore('test-player-2', 10);
      const updatedScoresData = await scoresDatabaseLogic.all();
      expect(updatedScoresData[1].id).toEqual(2);
      expect(updatedScoresData[1].username).toEqual('test-player-2');
      expect(updatedScoresData[1].score).toEqual(10);
    });
  });

  describe('#all', () => {
    beforeAll(async () => {});
    it('returns array of correct length', async () => {
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
