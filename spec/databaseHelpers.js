const connection = require('../database/connection');

const databaseTearDown = async () => {
  await connection.pool.query('TRUNCATE TABLE scores RESTART IDENTITY');
};

const seedScoreData = async (username, score) => {
  await connection.pool.query(
    'INSERT INTO scores(username, score) VALUES($1, $2)',
    [username, score]
  );
};

beforeEach(async () => {
  await databaseTearDown();
  await seedScoreData('test-player', 10);
});
