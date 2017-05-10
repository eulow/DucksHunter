const Round = require ('./round');

class Board {
  constructor (canvas) {
    this.stage = new createjs.Stage(canvas);
    this.canvas = canvas;
    this.score = 0;
    this.scoreContainer = new createjs.Container();
    this.roundContainer = new createjs.Container();

    this.round = 1;
    this.createBackground();

    this.renderScore = this.renderScore.bind(this);
  }

  createBackground() {
    const background = new createjs.Bitmap('./assets/images/background.png');
    background.scaleX = 2.5;
    background.scaleY = 2;
    this.stage.addChild(background);
    this.stage.addChild(this.roundContainer)
    new Round(this, this.round);
  }

  renderScore() {
    this.scoreContainer.removeAllChildren();

    this.stage.addChild(this.scoreContainer);
    const score = new createjs.Text('SCORE', "13.5px 'Press Start 2P'", '#ffffff')
    score.x = 530;
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

  nextRound() {
    this.round += 1;

    this.stage.removeChild(this.roundContainer);
    this.roundContainer = new createjs.Container();
    this.stage.addChild(this.roundContainer);

    new Round(this, this.round);
  }
}

module.exports = Board;
