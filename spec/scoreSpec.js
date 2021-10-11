fdescribe('Score', () => {
  const Score = require('../model/score');
  let scoreDatabaseLogicMock;
  beforeEach(async () => {
    scoreDatabaseLogicMock = jasmine.createSpyObj('scoresDatabaseLogic', [
      'newScore',
      'all',
    ]);
    mockScoreData = [
      {
        id: 1,
        username: 'test-user',
        score: 10,
      },
    ];
    scoreDatabaseLogicMock.newPost.and.callFake(() => mockScoreData);
    scoreDatabaseLogicMock.all.and.callFake(() => mockScoreData);
    scoreInstance = new Score(scoreDatabaseLogicMock);
    console.log(scoreInstance);
  });

  describe('#addScore', () => {
    it('should call correct method in scoresDatabaseLogic with correct arguments', async () => {
      await scoreInstance.addScore('test-user', 10);
      expect(scoreDatabaseLogicMock.newScore).toHaveBeenCalledWith(
        'test-user',
        10
      );
    });

    it('should return array with length 1 based on calling newPost methd in postsDatabase', async () => {
      const newScore = await scoreInstance.addScore('test-user', 10);
      expect(newScore).toEqual({
        id: 1,
        username: 'test-user',
        score: 10,
      });
    });
  });

  describe('#getScores', () => {
    it('should call correct method in scoresDatabaseLogic', async () => {
      await scoreInstance.getScores();
      expect(scoresDatabaseLogic.all).toHaveBeenCalled;
    });
    it('should return array based on calling .all methd in scoresDatabaseLogic', async () => {
      const allScores = await scoreInstance.getScores();
      expect(allScores).toEqual([
        {
          id: 1,
          username: 'test-user',
          score: 10,
        },
      ]);
    });
  });
});
