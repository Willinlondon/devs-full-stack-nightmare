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
  });
});
