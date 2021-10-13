const scoresDatabaseLogic = require('./databaseLogic/scoresDatabaseLogic');

class Score {
  constructor(scoresDatabaseClass = scoresDatabaseLogic) {
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
      username: element.username,
      score: element.score,
    }));
  }
}

module.exports = Score;
