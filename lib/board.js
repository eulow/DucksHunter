const Round = require ('./round');

class Board {
  constructor (canvas) {
    this.stage = new createjs.Stage(canvas);
    this.canvas = canvas;
    const background = this.createBackground();

    this.round = new Round(this);
  }


  createBackground() {
    const background = new createjs.Bitmap('./assets/images/background.png');
    background.scaleX = 2.5;
    background.scaleY = 2;
    this.stage.addChild(background);
    
  }
}

module.exports = Board;
