const Score = require('../model/score');

const ScoreController = {
  async New(req, res) {
    try {
      const score = new Score();
      const playerUsername = req.body.username;
      const playerScore = req.body.score;
      await score.addScore(playerUsername, playerScore);
      res.send('response');
    } catch (error) {
      console.log(error.message);
    }
  },
  Index(req, res) {
    try {
      res.render('scores/index');
    } catch (error) {
      console.log(error.message);
    }
  },
};

module.exports = ScoreController;
