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
    this.game = game;
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
    this.gameOver = this.gameOver.bind(this);
    this.renderTopScore = this.renderTopScore.bind(this);
  }

  createBackground() {
    const background = new createjs.Bitmap('./assets/images/background.png');
    background.scaleX = 2.5;
    background.scaleY = 2;
    this.stage.addChild(background);
    this.stage.addChild(this.roundContainer)
    new Round(this);
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
    if (this.round < 5) {
      this.round += 1;

      this.stage.removeChild(this.roundContainer);
      this.roundContainer = new createjs.Container();
      this.stage.addChild(this.roundContainer);

      new Round(this);
    } else {
      this.gameOver();
    }
  }

  gameOver() {
    const gameOverMusic = new Audio('assets/audio/game_over.mp3');
    gameOverMusic.currentTime = 0;
    gameOverMusic.volume = .1;
    gameOverMusic.play();

    if (this.score > this.game.topScore) {
      this.game.topScore = this.score;
      this.renderTopScore();
    }

    const gameOverText = new createjs.Text('GAME OVER', "18px 'Press Start 2P'", '#fff');
    gameOverText.x = 250;
    gameOverText.y = 180;
    const thanksText = new createjs.Text('THANKS FOR PLAYING', "18px 'Press Start 2P'", '#fff');
    thanksText.x = 175;
    thanksText.y = 228;
    this.roundContainer.addChild(gameOverText, thanksText);

    window.setTimeout(() => this.game.startNewGame(), 5000);
  }

  renderTopScore() {
    const topScore = new createjs.Text(`NEW TOP SCORE ${this.score}`, "18px 'Press Start 2P'", '#fff');
    topScore.x = 175;
    topScore.y = 130;
    this.roundContainer.addChild(topScore);
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
  renderDog (dogContainer, ducksRemaining) {
    const dog = this.dogSprite();
    switch (ducksRemaining) {
      case 0:
        dog.x = 265;
        dog.gotoAndPlay('noDucksLeft');
        break;
      case 1:
        dog.gotoAndPlay('oneDuckLeft');
        break;
      case 2:
        dog.gotoAndPlay('allDucksLeft');
        break;
    }
    dogContainer.addChild(dog);

    if (ducksRemaining === 2) {
      const dogLaugh = new Audio('assets/audio/dog_laugh.mp3');
      dogLaugh.currentTime = 0;
      dogLaugh.volume = .1;
      dogLaugh.play();
    } else {
      const roundClear = new Audio('assets/audio/round_clear.mp3');
      roundClear.currentTime = 0;
      roundClear.volume = .1;
      roundClear.play();
    }
  },

  move(dog) {
    if (dog.y > 238) {
      dog.y -= 5;
    }
  },

  renderIntroDog (round) {
    const dog = this.introDogSprite();

    round.introDogContainer.addChild(dog);

    window.setInterval(() => this.moveIntroDog(dog, round), 100);
  },

  moveIntroDog(dog, round) {
    if (dog.x > 250 && dog.currentAnimation === 'walking') {
      dog.gotoAndPlay('sniffing');
      window.setTimeout(() => {
        Dog.bark();
        dog.y -= 7;
        dog.gotoAndPlay('excited');
        window.setTimeout(() => {
          dog.gotoAndPlay('jumping');
        },
        500);
      },
      1000);
    }

    if ((dog.x > 120 && dog.x < 130) && dog.currentAnimation === 'walking') {
      dog.gotoAndPlay('sniffing');
      window.setTimeout(() => {
        dog.gotoAndPlay('walking');
        dog.x += 8;
      },
      1000);
    }

    if (dog.currentAnimation === 'walking' ) {
      dog.x += 8;
    }

    if (dog.currentAnimation === 'jumping' && dog.y > 210) {
      dog.y -= 13;
    }

    if (dog.currentAnimation === 'jumping' && dog.y < 240) {
      dog.gotoAndPlay('landing');
      round.shiftToBackground(round.introDogContainer);
    }

    if (dog.currentAnimation === 'landing') {
      dog.y += 13;
    }
  },

  bark() {
    const dogBark = new Audio('assets/audio/dog_bark.mp3');
    dogBark.currentTime = 0;
    dogBark.volume = .1;
    dogBark.play();
  },

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
        noDucksLeft: 1,
        allDucksLeft: [2, 3],
      },
      framerate: 10
    };

    const dogSpriteSheet = new createjs.SpriteSheet(dogData);
    const dog = new createjs.Sprite(dogSpriteSheet);
    dog.scaleX = 1.8;
    dog.scaleY = 1.8;
    dog.x = 295;
    dog.y = 310;

    return dog;
  },

  introDogSprite() {
    const dogData = {
      images: ['./assets/images/duck_hunt.png'],
      frames: [
        [7, 22, 53, 45],
        [68, 22, 52, 45],
        [126, 20, 51, 45],
        [180, 21, 51, 45],
        [236, 22, 51, 45],
        [217, 72, 53, 45],
        [283, 69, 44, 49],
        [333, 75, 42, 41]
      ],
      animations: {
        walking: [2, 4],
        sniffing: [0, 1],
        excited: 5,
        jumping: 6,
        landing: 7,
      },
      framerate: 5
    };
    const dogSpriteSheet = new createjs.SpriteSheet(dogData);
    const dog = new createjs.Sprite(dogSpriteSheet, 'walking');
    dog.scaleX = 1.8;
    dog.scaleY = 1.8;
    dog.x = 5;
    dog.y = 310;

    return dog;
  }
};

module.exports = Dog;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

class Duck {
  constructor (round, duckId) {
    this.ducksContainer = round.ducksContainer;
    this.canvas = round.canvas;
    this.round = round;

    this.duck = this.duckSprite(round.roundNumber, duckId);

    const hit = new createjs.Shape();
    hit.graphics.beginFill('#000').drawRect(-5, -5, 45, 40);
    this.duck.hitArea = hit;

    this.removeDuckOutOfScreen = this.removeDuckOutOfScreen.bind(this);
  }

  moveDuck() {
    if ((this.duck.velX > 0 && this.duck.scaleX < 0) || (this.duck.velX < 0 && this.duck.scaleX > 0)) {
      this.duck.scaleX *= -1;
    }

    const randomDirection = (Math.random() > 0.5 ? 1 : -1);
    switch(this.duck.status) {
      case 1:
        this.randomQuacks();
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
          this.removeDuckOutOfScreen(this.duck);
          const duckHitsGround = new Audio('assets/audio/duck_hits_ground.mp3');
          duckHitsGround.currentTime = 0;
          duckHitGround.volume = .1;
          duckHitsGround.play();
        }
        break;
      case 2:
        if (this.duck.y > -100 && (this.duck.x > -100 && this.duck.x < 700)) {
          this.duck.y -= 6;
          this.duck.x += 6 * this.duck.velX / Math.abs(this.duck.velX);
        } else {
          this.removeDuckOutOfScreen(this.duck);
        }
        break;
    }
  }

  randomQuacks() {
    const quack = new Audio('assets/audio/quack.mp3');
    quack.volume = .1;

    if (Math.random() < 0.025) {
      quack.currentTime = 0;
      quack.play();
    }
  }

  removeDuckOutOfScreen(duck) {
    if (duck.status === 2) {
      duck.flyAway.pause();
    }
    this.ducksContainer.removeChild(duck);
    delete this.round.ducks[duck.duckId];
  }

  deadDuck() {
    const fallingDuck = new Audio('assets/audio/duck_falling.mp3');
    fallingDuck.currentTime = 0;
    fallingDuck.volume = .1;
    fallingDuck.play();
    this.duck.gotoAndPlay('shot');
    this.duck.status = 0;
  }

  flyAway() {
    if (this.duck.status === 1) {
      this.duck.gotoAndPlay('flyUp');
      this.duck.status = 2;

      this.duck.flyAway = new Audio('assets/audio/fly_away.mp3');
      this.duck.flyAway.volume = .1;
      this.duck.flyAway.currentTime = 0;
      this.duck.flyAway.play();
    }
  }

  duckSprite(roundNumber, duckId) {
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
    const duck = new createjs.Sprite(spriteSheet, 'flyForward');

    duck.framerate = 5 + roundNumber/1.35;
    duck.scaleX = 1.8;
    duck.scaleY = 1.8;
    duck.x = Math.random() * this.canvas.width;
    duck.y = Math.random() * this.canvas.height - 200;
    duck.velX = 9.5 + 2 * roundNumber;
    duck.velY = 9.5 + 1.6 * roundNumber;
    duck.duckId = duckId;
    duck.status = 1;

    return duck;
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
    this.stage.enableMouseOver(60);

    createjs.Ticker.addEventListener('tick', this.stage);

    this.topScore = 0;

    this.handleClick = this.handleClick.bind(this);
    this.addTitle = this.addTitle.bind(this);
    this.startGame = this.startGame.bind(this);
    this.renderStartScreen = this.renderStartScreen.bind(this);

    this.startNewGame();
  }

  startNewGame() {
    this.stage.removeAllChildren();

    this.renderStartScreen();
  }

  renderStartScreen() {
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
    hunterText.x = 160;
    hunterText.y = 122;

    const underline = new createjs.Shape();
    underline.graphics.beginFill('#FFB23B').drawRect(77, 140, 470, 5);

    const credits = new createjs.Text('INSPIRED BY NINTENDO CO.,LTD.', "15px 'Press Start 2P'", '#fff')
    credits.x = 100;
    credits.y = 430;

    const creator = new createjs.Text('CREATED BY EUGENE LOW', "15px 'Press Start 2P'", '#fff')
    creator.x = 160;
    creator.y = 455;

    const score = new createjs.Text(`TOP SCORE = ${this.topScore}`, "20px 'Press Start 2P'", '#93e473')
    score.x = 185;
    score.y = 350;

    this.stage.addChild(ducksText, hunterText, underline, score, creator, credits);
  }

  startTitleMusic() {
    this.titleMusic = new Audio('assets/audio/title.mp3');
    this.titleMusic.volume = .1;
    this.titleMusic.currentTime = 0;
    // debugger
    // this.titleMusic.volume = .2;
    this.titleMusic.play();
  }

  addStartButton() {
    const start = new createjs.Text('START GAME', "24px 'Press Start 2P'", '#FFB23B')
    start.x = 195;
    start.y = 280;
    const hit = new createjs.Shape();
    hit.graphics.beginFill('#000').drawRect(-5, -5, 250, 30);
    start.hitArea = hit;

    start.addEventListener('mouseover', () => this.turnWhite(start));
    start.addEventListener('mouseout', () => this.turnOrange(start));
    start.addEventListener('click', () => this.startGame());

    this.stage.addChild(start);
  }

  startGame() {
    this.handleClick();
    this.titleMusic.pause();
    this.stage.removeAllChildren();
    this.canvas.removeEventListener('click', this.handleClick);
    window.setTimeout(() => new Board(this), 200);
  }

  turnWhite(startText) {
    const startSound = new Audio('assets/audio/start.mp3');
    startSound.currentTime = 0;
    startSound.volume = .1;
    startSound.play();
    startText.color = '#fff';
  }

  turnOrange(startText) {
    startText.color = '#FFB23B';
  }

  handleClick(e) {
      const shotSound = new Audio('assets/audio/shot.mp3');
      shotSound.currentTime = 0;
      shotSound.volume = .1;
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
      newGame.volume = .1;
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
        this.startTimer();
      },
      1000
    );
  }

  startTimer() {
    window.setTimeout(
      () => {
        this.ducksFlyAway();
        this.canvas.removeEventListener('click', this.handleShot);
      },
      7500
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
    shotSound.volume = .1;
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


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map