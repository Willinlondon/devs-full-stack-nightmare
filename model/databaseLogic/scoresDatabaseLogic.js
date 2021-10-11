const connection = require('../../database/connection');

class scoresDatabase {
  static async newScore(username, score) {
    const newScore = await connection.pool.query(
      'INSERT INTO games(username, score) VALUES($1, $2) RETURNING id, username, score;',
      [username, score]
    );
    return newScore.rows;
  }

  static async all() {
    const allScores = await connection.pool.query(
      'SELECT * FROM scores ORDER BY id ASC'
    );
    return allScores.rows;
  }
}

module.exports = scoresDatabase;
