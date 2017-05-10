const Round = require ('./round');

class Board {
  constructor (canvas) {
    this.stage = new createjs.Stage(canvas);
    this.canvas = canvas;
    this.score = 0;
    this.scoreContainer = new createjs.Container();
    this.roundContainer = new createjs.Container();
    this.miniDucksContainer = new createjs.Container();

    this.round = 1;
    this.createBackground();
    this.renderMiniDucks();
    this.renderScore = this.renderScore.bind(this);
    this.flashMiniDucks = this.flashMiniDucks.bind(this);
    this.stopMiniDuckFlash = this.stopMiniDuckFlash.bind(this);
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

    const number = new createjs.Text(this.score.toString(), "14px 'Press Start 2P'", '#ffffff');
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

  renderMiniDucks() {
    this.roundContainer.addChild(this.miniDucksContainer);

    let x = 240;
    let y = 421;

    for (let i = 0; i < 10; i++) {
      const miniDuck = this.miniDuckSprite();
      miniDuck.scaleX = 2.4;
      miniDuck.scaleY = 2.2;
      miniDuck.x = x;
      miniDuck.y = y;
      this.miniDucksContainer.addChild(miniDuck);
      x += 20;
    }
  }

  flashMiniDucks() {
    const miniDuckIdx = this.round * 2;
    const duck1 = this.miniDucksContainer.children[miniDuckIdx-1].gotoAndPlay('flash');
    const duck2 = this.miniDucksContainer.children[miniDuckIdx-2].gotoAndPlay('flash');
  }

  miniDuckRed(numDuck) {
    const miniDuckIdx = this.round * 2;
    this.miniDucksContainer.children[miniDuckIdx-numDuck].gotoAndStop('red');
  }

  stopMiniDuckFlash(numDuck) {
    let miniDuckIdx = this.round * 2;
    for (let i = 1; i <= numDuck; i++) {
      this.miniDucksContainer.children[miniDuckIdx - i].gotoAndStop('white');
    }
  }

  miniDuckSprite() {
    const data = {
      images: ['./assets/images/duck_hunt.png'],
      frames: [
        [559, 253, 7, 7],
        [410, 220, 7, 7],
        [559, 273, 7, 7],
      ],
      animations: {
        white: 0,
        flash: [0, 1],
        red: 2
      },
      framerate: 4
    };
    const spriteSheet = new createjs.SpriteSheet(data);
    return new createjs.Sprite(spriteSheet, 'white');
  }
}

module.exports = Board;
