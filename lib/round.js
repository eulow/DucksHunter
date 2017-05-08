const Duck = require ('./duck');

class Round {
  constructor(board, duckCount) {
    this.board = board;
    this.stage = board.stage;
    this.canvas = board.canvas;
    this.bullets = 3;
    this.bulletsSprite = '';
    this.ducksContainer = new createjs.Container();
    this.ducks = {};
    this.duckCount = duckCount;

    this.createDucks(duckCount);
    this.createRoundInfo();
    createjs.Ticker.addEventListener('tick', this.handleTick.bind(this));

    this.canvas.addEventListener('click', this.handleShot.bind(this));
    this.renderGrass = this.renderGrass.bind(this);
    this.renderBullets = this.renderBullets.bind(this);
    this.screenFlash = this.screenFlash.bind(this);
    this.showScore = this.showScore.bind(this);
  }

  roundOver() {

  }

  createDucks(num = 1) {
    for (var id = 0; id < num; id++) {
      const duck = new Duck (this.canvas, this.ducksContainer, id);
      duck.duck.addEventListener('click', this.shotDuck.bind(this));

      this.stage.addChild(duck.duck);
      this.ducks[duck.duck.id] = duck;
    }
  }

  handleTick(event) {
    this.stage.update(event);
    const arrayDucks = Object.keys(this.ducks).map(id => this.ducks[id]);

    arrayDucks.forEach(
      (duck) => {
        duck.moveDuck();
      }
    );
  }

  shotDuck(e) {
    const duck = this.ducks[e.target.id];

    if (duck.duck.status === 1 && this.bullets > 0) {
      this.duckCount -= 1;
      duck.deadDuck();
      this.showScore(e.stageX, e.stageY);
      this.board.addToScoreBoard();
    }
  }

  showScore(x, y) {
    const score = new createjs.Text('500', "18px 'Press Start 2P'", '#ffffff');
    score.x = x;
    score.y = y;
    this.stage.addChild(score);
    window.setTimeout(
      (
        () => this.stage.removeChild(score)
      ), 500
    );
  }

  handleShot(e) {
    if (this.bullets > 0) {
      const shotSound = new Audio('assets/audio/shot.mp3');
      shotSound.currentTime = 0;
      shotSound.play();
      this.screenFlash();

      this.bullets -= 1;

      switch (this.bullets) {
        case 2:
        return this.bulletsSprite.gotoAndPlay('two');
        case 1:
        return this.bulletsSprite.gotoAndPlay('one');
        case 0:
        return this.bulletsSprite.gotoAndPlay('zero');
      }
    }
  }

  screenFlash() {
    const flash = new createjs.Shape();

    flash.graphics.beginFill('white').drawRect(0, 0, 640, 480);
    flash.alpha = .9;
    this.stage.addChild(flash);
    window.setTimeout(
      (
        () => this.stage.removeChild(flash)
      ), 80
    );
  }

  createRoundInfo() {
    this.stage.addChild(this.ducksContainer);
    this.renderGrass();
    this.renderBullets();
    this.board.renderScore();
  }

  renderGrass() {
    const grass = new createjs.Bitmap('./assets/images/grass.png');
    grass.scaleX = 2.5;
    grass.scaleY = 2;
    grass.y = 302;
    this.stage.addChild(grass);
  }

  renderBullets() {
    const data = {
      images: ['./assets/images/duck_hunt.png'],
      frames: [
        [498, 261, 0, 8],
        [498, 261, 9, 8],
        [498, 261, 18, 8],
        [498, 261, 26, 8]
      ],
      animations: {
        zero: 0,
        one: 1,
        two: 2,
        three: 3
      },
      framerate: 0
    };
    const spriteSheet = new createjs.SpriteSheet(data);
    const bullets = new createjs.Sprite(spriteSheet, 'three');

    bullets.scaleX = 2.5;
    bullets.scaleY = 2;
    bullets.x = 56;
    bullets.y = 418;

    this.bulletsSprite = bullets;
    this.stage.addChild(bullets);

  }
}


module.exports = Round;
