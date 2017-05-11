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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const Round = __webpack_require__(4);

class Board {
  constructor (game) {
    this.stage = game.stage
    this.canvas = game.canvas;
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
    this.score += 400 * (this.round + .5);
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


/***/ }),
/* 1 */
/***/ (function(module, exports) {

const Dog = {
  dogSprite() {
    const dogData = {
      images: ['./assets/images/duck_hunt.png'],
      frames: [
        [6, 70, 56, 50],
        [62, 70, 67, 48],
        [137, 70, 33, 48],
        [176, 70, 33, 48]
      ],
      animations: {
        oneDuckLeft: 0,
        twoDucksLeft: 1,
        allDucks: [2, 3],
      },
      framerate: 10
    };

    const dogSpriteSheet = new createjs.SpriteSheet(dogData);
    const dog = new createjs.Sprite(dogSpriteSheet);
    dog.scaleX = 1.8;
    dog.scaleY = 1.8;
    dog.x = 288;
    dog.y = 310;

    return dog;
  },

  renderDog (roundContainer, ducksRemaining) {

    const dog = this.dogSprite();
    switch (ducksRemaining) {
      case 0:
        dog.gotoAndPlay('twoDucksLeft');
        break;
      case 1:
        dog.gotoAndPlay('oneDuckLeft');
        break;
      case 2:
        dog.gotoAndPlay('allDucks');
        break;
    }
    roundContainer.addChild(dog);

    if (ducksRemaining === 2) {
      const shotSound = new Audio('assets/audio/dog_laugh.mp3');
      shotSound.currentTime = 0;
      shotSound.play();
    } else {
      const shotSound = new Audio('assets/audio/round_clear.mp3');
      shotSound.currentTime = 0;
      shotSound.play();
    }
  },

  move(dog) {
    if (dog.y > 238) {
      dog.y -= 5;
    }
  }

};

module.exports = Dog;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

class Duck {
  constructor (round, duckId, roundNumber) {
    this.ducksContainer = round.ducksContainer;
    this.canvas = round.canvas;
    this.round = round;

    this.duck = this.duckSprite();
    this.duck.framerate = 5 + roundNumber/1.2;
    this.duck.scaleX = 1.8;
    this.duck.scaleY = 1.8;
    this.duck.x = Math.random() * this.canvas.width;
    this.duck.y = Math.random() * this.canvas.height - 200;
    this.duck.velX = 7 + roundNumber * 2;
    this.duck.velY = 5.5 + roundNumber * 2;
    this.duck.duckId = duckId;
    this.duck.status = 1;

    const hit = new createjs.Shape();
    hit.graphics.beginFill('#000').drawRect(-5, -5, 55, 40);
    this.duck.hitArea = hit;


    this.removeDuckIfOutOfScreen = this.removeDuckIfOutOfScreen.bind(this);
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
        if (this.duck.y < 300) {
          this.duck.y += 6;
        } else {
          this.removeDuckIfOutOfScreen(this.duck)
          const duckHitsGround = new Audio('assets/audio/duck_hits_ground.mp3');
          duckHitsGround.currentTime = 0;
          duckHitsGround.play();
        }
        break;
      case 2:
        if (this.duck.y > -30 && (this.duck.x > -30 && this.duck.x < 630)) {
          this.duck.y -= 6;
          this.duck.x += 6 * this.duck.velX / Math.abs(this.duck.velX);
        } else {
          this.removeDuckIfOutOfScreen(this.duck)
        }
        break;
    }
  }

  removeDuckIfOutOfScreen(duck) {
    if (duck.status === 2) {
      duck.flyAway.pause();
    }
    this.ducksContainer.removeChild(duck);
    delete this.round.ducks[duck.duckId];
  }

  deadDuck() {
    this.duck.gotoAndPlay('shot');
    this.duck.status = 0;
  }

  flyAway() {
    if (this.duck.status === 1) {
      this.duck.gotoAndPlay('flyUp');
      this.duck.status = 2;

      this.duck.flyAway = new Audio('assets/audio/fly_away.mp3');
      this.duck.flyAway.currentTime = 0;
      this.duck.flyAway.play();
    }
  }

  duckSprite() {
    const data = {
      images: ['./assets/images/duck_hunt.png'],
      frames: [
        [8, 127, 35, 34],
        [49, 127, 35, 34],
        [89, 127, 35, 34],
        [137, 132, 32, 37],
        [169, 132, 32, 37],
        [204, 132, 25, 37],
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
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const Board = __webpack_require__(0);

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('canvas');

  const game = new Game (canvas);
});


class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.stage = new createjs.Stage(canvas);
    this.stage.enableMouseOver();

    this.topScore = 0;

    this.handleClick = this.handleClick.bind(this);
    this.addTitle = this.addTitle.bind(this);
    this.startGame = this.startGame.bind(this);
    this.renderStartScreen();
  }

  renderStartScreen() {
    createjs.Ticker.addEventListener('tick', this.stage);

    const blackBackground = new createjs.Shape();
    blackBackground.graphics.beginFill('black').drawRect(0, 0, 640, 480);
    this.stage.addChild(blackBackground);
    this.addTitle();
    this.addStartButton();
    this.startTitleMusic();
    this.canvas.addEventListener('click', this.handleClick);
  }

  addTitle() {
    const ducksText = new createjs.Text('DUCKS', "90px 'Erica One'", '#28F8FE');
    ducksText.x = 75;
    ducksText.y = 15;

    const hunterText = new createjs.Text('HUNTER', "90px 'Erica One'", '#28F8FE');
    hunterText.x = 175;
    hunterText.y = 122;

    const underline = new createjs.Shape();
    underline.graphics.beginFill('#FFB23B').drawRect(77, 140, 485, 5);

    const credits = new createjs.Text('INSPIRED BY NINTENDO CO.,LTD.', "17px 'Press Start 2P'", '#fff')
    credits.x = 90;
    credits.y = 450;

    const score = new createjs.Text(`TOP SCORE = ${this.topScore}`, "20px 'Press Start 2P'", '#93e473')
    score.x = 190;
    score.y = 400;

    this.stage.addChild(ducksText, hunterText, underline, score, credits);
  }

  startTitleMusic() {
    const titleMusic = new Audio('assets/audio/title.mp3');
    titleMusic.currentTime = 0;
    titleMusic.play();
  }

  addStartButton() {
    const start = new createjs.Text('START GAME', "24px 'Press Start 2P'", '#FFB23B')
    start.x = 200;
    start.y = 310;
    const hit = new createjs.Shape();
    hit.graphics.beginFill('#000').drawRect(-5, -5, 210, 30);
    start.hitArea = hit;

    start.addEventListener('mouseover', () => this.turnWhite(start));
    start.addEventListener('mouseout', () => this.turnOrange(start));
    start.addEventListener('click', () => this.startGame());

    this.stage.addChild(start);
  }

  startGame() {
    this.stage.removeAllChildren();
    createjs.Ticker.removeEventListener('tick', this.stage);
    this.canvas.removeEventListener('click', this.handleClick);
    new Board(this);
  }

  turnWhite(startText) {
    startText.color = '#fff';
  }

  turnOrange(startText) {
    startText.color = '#FFB23B';
  }

  handleClick(e) {
      const shotSound = new Audio('assets/audio/shot.mp3');
      shotSound.currentTime = 0;
      shotSound.play();
      this.screenFlash();
  }

  screenFlash() {
    const flash = new createjs.Shape();

    flash.graphics.beginFill('white').drawRect(0, 0, 640, 480);
    flash.alpha = .9;
    this.stage.addChild(flash);
    window.setTimeout(
      (
        () => this.stage.removeChild(flash)
      ), 50
    );
  }
}


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const Duck = __webpack_require__(2);
const Dog = __webpack_require__(1);

class Round {
  constructor(board, roundNumber) {
    this.board = board;
    this.stage = board.stage;
    this.canvas = board.canvas;
    this.roundContainer = board.roundContainer;
    this.roundNumber = roundNumber;
    //
    this.bullets = 3;
    this.bulletsSprite = '';
    this.ducksContainer = new createjs.Container();
    this.ducks = {};
    this.duckCount = 2;
    //
    this.dogContainer = new createjs.Container();

    this.roundStatus = 0

    this.createRound();
    this.handleTick = this.handleTick.bind(this);
    this.handleShot = this.handleShot.bind(this);
    this.renderGrass = this.renderGrass.bind(this);
    this.renderBullets = this.renderBullets.bind(this);
    this.screenFlash = this.screenFlash.bind(this);
    this.createDucks = this.createDucks.bind(this);
    this.roundOver = this.roundOver.bind(this);
    this.roundStart = this.roundStart.bind(this);

    createjs.Ticker.addEventListener('tick', this.handleTick);
  }

  createRound() {
    this.roundContainer.addChild(this.ducksContainer);
    this.roundContainer.addChild(this.dogContainer);
    this.renderGrass();
    this.renderBullets();
    this.board.renderScore();
    this.renderRoundInfo(this.roundNumber);
  }

  renderRoundInfo() {
    const score = new createjs.Text(`R=${this.roundNumber}`, "14px 'Press Start 2P'", '#93e473');
    score.x = 68;
    score.y = 390;
    this.roundContainer.addChild(score);

    const roundText = new createjs.Text(`ROUND ${this.roundNumber}`, "18px 'Press Start 2P'", '#fff');
    roundText.x = 270;
    roundText.y = 200;
    this.roundContainer.addChild(roundText);
    this.roundContainer.addChild(this.board.miniDucksContainer);

    window.setTimeout(
      () => {
        this.roundContainer.removeChild(roundText);
        this.roundStart(this.roundNumber);
      },
      1000
    );
  }

  roundStart() {
    this.createDucks(this.roundNumber);
    this.roundStatus = 1;
    this.canvas.addEventListener('click', this.handleShot);
    this.board.flashMiniDucks();
  }

  handleTick(event) {
    this.stage.update(event);
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

  createDucks(roundNumber) {
    for (var id = 0; id < 2; id++) {
      const duck = new Duck (this, id, roundNumber);
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
        this.board.nextRound();
        createjs.Ticker.removeEventListener('tick', this.handleTick);
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
        if(this.duckCount > 0) {
          const ducks = Object.keys(this.ducks);
          ducks.forEach((duckId) => {
            this.ducks[duckId].flyAway();
          });
        }
        break;
      }
    }
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