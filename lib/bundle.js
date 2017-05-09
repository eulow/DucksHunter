/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const Round = __webpack_require__ (3);

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
    // debugger
    this.stage.removeChild(this.roundContainer);
    // this.canvas.unbind('click');

    this.roundContainer = new createjs.Container();
    this.stage.addChild(this.roundContainer);
    // this.roundContainer.removeAllChildren();
    new Round(this, this.round);
  }
}

module.exports = Board;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

class Duck {
  constructor (canvas, ducksContainer, id, round) {
    this.ducksContainer = ducksContainer;
    this.canvas = canvas;

    this.duck = this.duckSprite();
    this.duck.scaleX = 1.8;
    this.duck.scaleY = 1.8;
    this.duck.x = Math.random() * canvas.width;
    this.duck.y = Math.random() * canvas.height - 200;
    this.duck.velX = 3.5 + round;
    this.duck.velY = 5 + round;
    this.duck.duckId = id;
    this.duck.status = 1;

    const hit = new createjs.Shape();
    hit.graphics.beginFill("#000").drawRect(-5, -5, 65, 45);
    this.duck.hitArea = hit;
  }

  moveDuck() {
    // makes duck face correct direction
    if ((this.duck.velX > 0 && this.duck.scaleX < 0) || (this.duck.velX < 0 && this.duck.scaleX > 0)) {
      this.duck.scaleX *= -1;
    }

    const randomDirection = (Math.random() > 0.5 ? 1 : -1);

    switch(this.duck.status) {
      case 1:
        if (this.duck.x >= this.canvas.width - 60) {
          this.duck.velX = -1 * Math.abs(this.duck.velX);
          this.duck.velY *= randomDirection;
          this.duck.scaleX *= -1;
        } else if (this.duck.x <= 60) {
          this.duck.velX = Math.abs(this.duck.velX);
          this.duck.velY *= randomDirection;
          this.duck.scaleX *= -1;
        } else if (this.duck.y >= this.canvas.height - 200) {
          this.duck.velY = -1 * Math.abs(this.duck.velY);
          this.duck.velX *= randomDirection;
        } else if (this.duck.y <= 0) {
          this.duck.velY = Math.abs(this.duck.velY);
          this.duck.velX *= randomDirection;
        }
        this.duck.x += this.duck.velX;
        this.duck.y += this.duck.velY;
        break;
      case 0:
        this.duck.y += 6;
    }
  }

  removeDuckIfOutOfScreen() {
    if (this.duck.status === 0 && this.duck.y > 400) {
      this.ducksContainer.children.forEach((child) => {
        if (child.duckId === this.duck.duckId) {
          this.ducksContainer.removeChild(child);
        }
      });
    }
  }

  deadDuck() {
    this.duck.gotoAndPlay("shot");
    this.duck.status = 0;

    window.setTimeout(
      (
        () => {
          this.ducksContainer.children.forEach((child) => {
            if (child.duckId === this.duck.duckId) {
              this.ducksContainer.removeChild(child);
            }
          });
        }
      ), 4000
    );
  }

  duckSprite() {
    const data = {
      images: ['./assets/images/duck_hunt.png'],
      frames: [
        [8, 127, 35, 34],
        [49, 138, 35, 23],
        [89, 138, 35, 28],
        [137, 126, 29, 37],
        [169, 132, 32, 31],
        [204, 132, 25, 32],
        [238, 135, 31, 32],
        [280, 134, 20, 32],
        [305, 133, 16, 33],
        [328, 134, 20, 32],
        [353, 134, 16, 33]
      ],
      animations: {
        flyForward: [0, 2],
        flyUp: [3, 5],
        shot: [6, 6, 'fall'],
        fall: [7, 10]
      },
      framerate: 8
    };
    const spriteSheet = new createjs.SpriteSheet(data);
    return new createjs.Sprite(spriteSheet, 'flyForward');
  }

}

module.exports = Duck;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const Board = __webpack_require__(0);

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('canvas');

  const board = new Board (canvas);
 });


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const Duck = __webpack_require__ (1);

class Round {
  constructor(board, round) {
    // this.round = round;
    this.board = board;
    this.stage = board.stage;
    this.canvas = board.canvas;
    this.roundContainer = board.roundContainer;

    this.bullets = 3;
    this.bulletsSprite = '';
    this.ducksContainer = new createjs.Container();
    this.ducks = {};
    this.duckCount = 2;

    this.createRound(round);
    createjs.Ticker.addEventListener('tick', this.handleTick.bind(this));
    this.handleShot = this.handleShot.bind(this);
    this.canvas.addEventListener('click', this.handleShot);
    this.renderGrass = this.renderGrass.bind(this);
    this.renderBullets = this.renderBullets.bind(this);
    this.screenFlash = this.screenFlash.bind(this);
    this.createDucks = this.createDucks.bind(this);
    this.roundOver = this.roundOver.bind(this);
    // debugger
  }

  createRound(round) {
    this.createDucks(round);
    this.roundContainer.addChild(this.ducksContainer);
    this.renderGrass();
    this.renderBullets();
    this.board.renderScore();
    this.renderRoundInfo(round);
  }

  renderRoundInfo(round) {
    const score = new createjs.Text(`R=${round}`, "14px 'Press Start 2P'", '#93e473');
    score.x = 68;
    score.y = 390;
    this.roundContainer.addChild(score);
  }

  createDucks(round) {
    for (var id = 0; id < 2; id++) {
      const duck = new Duck (this.canvas, this.ducksContainer, id, round);
      duck.duck.addEventListener('click', this.shotDuck.bind(this));

      this.roundContainer.addChild(duck.duck);
      this.ducks[duck.duck.id] = duck;
    }
  }

  roundOver() {
    if (this.duckCount === 0 || this.bullets === 0) {
      this.canvas.removeEventListener('click', this.handleShot);
      this.board.nextRound();
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
      this.showScoreOnKill(e.target.x, e.target.y);
      this.board.addToScoreBoard();
    }
    this.roundOver();
  }

  showScoreOnKill(x, y) {
    const score = new createjs.Text('500', "18px 'Press Start 2P'", '#ffffff');
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
      const shotSound = new Audio('assets/audio/shot.mp3');
      shotSound.currentTime = 0;
      shotSound.play();
      this.screenFlash();

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
        break;
      }
    }
    this.roundOver();
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
}


module.exports = Round;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map