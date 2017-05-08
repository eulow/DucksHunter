const Round = require ('./round');

class Board {
  constructor (canvas) {
    this.stage = new createjs.Stage(canvas);
    this.canvas = canvas;
    this.score = 0;
    this.scoreContainer = new createjs.Container();

    const background = this.createBackground();

    this.round = new Round(this, 2);
    this.renderScore = this.renderScore.bind(this);
  }

  createBackground() {
    const background = new createjs.Bitmap('./assets/images/background.png');
    background.scaleX = 2.5;
    background.scaleY = 2;
    this.stage.addChild(background);
  }

  renderScore() {
    this.scoreContainer.removeAllChildren();

    this.stage.addChild(this.scoreContainer);
    const score = new createjs.Text('SCORE', "13.5px 'Press Start 2P'", '#ffffff')
    score.x = 528;
    score.y = 438;
    this.scoreContainer.addChild(score);

    const number = new createjs.Text(this.score.toString(), "14px 'Press Start 2P'", '#ffffff')
    number.x = 480;
    number.y = 420;
    this.scoreContainer.addChild(number);
  }

  addToScoreBoard() {
    this.score += 500;
    this.renderScore();
  }
}

module.exports = Board;
