const Score = require('../model/score');

const ScoreController = {
  async New(req, res) {
    try {
      console.log('This is the score controller');
      const score = new Score();
      await score.addScore('dan', 10);
      const scores = await score.getScores();
      res.render('scores/index', { scores });
    } catch (error) {
      console.log(error.message);
    }
  },
};

module.exports = ScoreController;
