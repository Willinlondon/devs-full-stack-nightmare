const scoresDatabase = require('./databaseLogic/scoresDatabase');

class Score {
  constructor(scoresDatabaseClass = scoresDatabase) {
    this.scoresDatabaseClass = scoresDatabaseClass;
  }

  async addScore(username, score) {
    const newScore = await this.scoresDatabaseClass.newScore(username, score);
    return {
      id: newScore[0].id,
      username: newScore[0].username,
      score: newScore[0].score,
    };
  }

  async getScores() {
    const allScores = await this.scoresDatabaseClass.all();
    return allScores.map((element) => ({
      id: element.id,
      text: element.username,
      userID: element.score,
    }));
  }
}

module.exports = Score;
