const Duck = require('./duck');
const Dog = require('./dog');

class Round {
  constructor(board) {
    this.board = board;
    this.stage = board.stage;
    this.canvas = board.canvas;
    this.roundContainer = board.roundContainer;
    this.roundNumber = board.round;

    this.bullets = 3;
    this.bulletsSprite = '';

    this.ducksContainer = new createjs.Container();
    this.ducks = {};
    this.duckCount = 2;

    this.dogContainer = new createjs.Container();
    this.introDogContainer = new createjs.Container();
    // status of 1 === round started
    this.roundStatus = 0;

    this.createRound();

    this.moveObjects = this.moveObjects.bind(this);
    this.handleShot = this.handleShot.bind(this);
    this.renderGrass = this.renderGrass.bind(this);
    this.renderBullets = this.renderBullets.bind(this);
    this.screenFlash = this.screenFlash.bind(this);
    this.createDucks = this.createDucks.bind(this);
    this.roundOver = this.roundOver.bind(this);
    this.startRound = this.startRound.bind(this);
    this.ducksFlyAway = this.ducksFlyAway.bind(this);
  }

  createRound() {
    this.roundContainer.addChild(this.ducksContainer);
    this.roundContainer.addChild(this.dogContainer);
    this.renderGrass();
    this.renderBullets();
    this.board.renderScore();
    this.renderRoundInfo();

    if (this.roundNumber === 1) {
      const newGame = new Audio('assets/audio/new_game.mp3');
      newGame.currentTime = 0;
      newGame.play();
      this.stage.addChild(this.introDogContainer);
      Dog.renderIntroDog(this);
      window.setTimeout(() => {
        this.startRound()
        this.stage.removeChild(this.introDogContainer);
      }, 8000);
    } else {
      this.startRound();
    }
  }

  renderRoundInfo() {
    const roundInfo = new createjs.Text(`R=${this.roundNumber}`, "14px 'Press Start 2P'", '#73bb23');
    roundInfo.x = 68;
    roundInfo.y = 390;
    this.roundContainer.addChild(roundInfo);
  }

  startRound() {
    const roundText = new createjs.Text(`ROUND ${this.roundNumber}`, "18px 'Press Start 2P'", '#fff');
    roundText.x = 270;
    roundText.y = 200;
    this.roundContainer.addChild(roundText);
    this.roundContainer.addChild(this.board.miniDucksContainer);

    window.setTimeout(
      () => {
        this.roundContainer.removeChild(roundText);
        this.startDucks();
      },
      1000
    );
  }

  startDucks() {
    this.createDucks();
    this.roundStatus = 1;
    this.canvas.addEventListener('click', this.handleShot);
    this.board.flashMiniDucks();

    window.setInterval(() => this.moveObjects(), 50);
  }

  moveObjects() {
    const arrayDucks = Object.keys(this.ducks).map(id => this.ducks[id]);

    arrayDucks.forEach(
      (duck) => {
        duck.moveDuck();
      }
    );
    if (Object.keys(this.ducks).length === 0 && this.roundStatus === 1) {
      this.roundOver();
    }

    if (this.dogContainer.children.length > 0) {
      Dog.move(this.dogContainer.children[0]);
    }
  }

  createDucks() {
    for (var id = 0; id < 2; id++) {
      const duck = new Duck (this, id);
      duck.duck.addEventListener('click', this.shotDuck.bind(this));

      this.ducksContainer.addChild(duck.duck);
      this.ducks[duck.duck.duckId] = duck;
    }
  }

  roundOver() {
    this.roundStatus = 0;
    this.canvas.removeEventListener('click', this.handleShot);
    this.board.stopMiniDuckFlash(this.duckCount);

    Dog.renderDog(this.dogContainer, this.duckCount);
    window.setTimeout(
      () => {
        this.roundContainer.removeChild(this.dogContainer);
        this.board.nextRound();
      },
      1500
    );
  }


  shotDuck(e) {
    const duck = this.ducks[e.target.duckId];

    if (duck.duck.status === 1 && this.bullets > 0) {
      this.board.miniDuckRed(this.duckCount);
      this.duckCount -= 1;
      duck.deadDuck();
      this.showScoreOnKill(e.target.x, e.target.y);
      this.board.addToScoreBoard();
    }
  }

  showScoreOnKill(x, y) {
    const score = new createjs.Text(`${(this.roundNumber + .5) * 400}`, "18px 'Press Start 2P'", '#ffffff');
    score.x = x;
    score.y = y;
    this.roundContainer.addChild(score);
    window.setTimeout(
      (
        () => this.roundContainer.removeChild(score)
      ), 500
    );
  }

  handleShot(e) {
    if (this.bullets > 0) {
      this.shotSound();
      this.bullets -= 1;

      switch (this.bullets) {
        case 2:
          this.bulletsSprite.gotoAndPlay('two');
          break;
        case 1:
          this.bulletsSprite.gotoAndPlay('one');
          break;
        case 0:
          this.bulletsSprite.gotoAndPlay('zero');
          if(this.duckCount > 0) {
            this.ducksFlyAway();
          }
          break;
      }
    }
  }

  shotSound () {
    const shotSound = new Audio('assets/audio/shot.mp3');
    shotSound.currentTime = 0;
    shotSound.play();
    this.screenFlash();
  }

  ducksFlyAway() {
    const ducks = Object.keys(this.ducks);
    ducks.forEach((duckId) => {
      this.ducks[duckId].flyAway();
    });
  }

  screenFlash() {
    const flash = new createjs.Shape();

    flash.graphics.beginFill('white').drawRect(0, 0, 640, 480);
    flash.alpha = .9;
    this.roundContainer.addChild(flash);
    window.setTimeout(
      (
        () => this.roundContainer.removeChild(flash)
      ), 80
    );
  }

  renderGrass() {
    const grass = new createjs.Bitmap('./assets/images/grass.png');
    grass.scaleX = 2.5;
    grass.scaleY = 2;
    grass.y = 302;
    this.roundContainer.addChild(grass);
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
    this.roundContainer.addChild(bullets);
  }

  shiftToBackground(container) {
    this.stage.setChildIndex(container, this.stage.getChildIndex(this.roundContainer));
  }
}
module.exports = Round;
