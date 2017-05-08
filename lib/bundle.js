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


/***/ }),
/* 1 */
/***/ (function(module, exports) {

class Duck {
  constructor (canvas, id) {
    this.duck = this.duckSprite();
    this.duck.scaleX = 1.8;
    this.duck.scaleY = 1.8;
    this.duck.x = Math.random() * canvas.width;
    this.duck.y = Math.random() * canvas.height - 200;
    this.duck.velX = 10;
    this.duck.velY = 10;
    this.duck.duckId = id;
    this.duck.status = 1;

    const hit = new createjs.Shape();
    hit.graphics.beginFill("#000").drawRect(-5,-5,40,40);
    this.duck.hitArea = hit;
  }

  moveDuck(canvas) {
    if (this.duck.velX > 0 && this.duck.scaleX < 0) {
      this.duck.scaleX *= -1;
    }

    switch(this.duck.status) {
      case 1:
        if (this.duck.x >= canvas.width - 60) {
          this.duck.velX = -1 * Math.abs(this.duck.velX);
          this.duck.scaleX *= -1;
        } else if (this.duck.x <= 60) {
          this.duck.velX = Math.abs(this.duck.velX);
          this.duck.scaleX *= -1;
        } else if (this.duck.y >= canvas.height - 200) {
          this.duck.velY = -1 * Math.abs(this.duck.velY);
        } else if (this.duck.y <= 0) {
          this.duck.velY = Math.abs(this.duck.velY);
        }
        this.duck.x += this.duck.velX;
        this.duck.y += this.duck.velY;
        break;
      case 0:
        this.duck.y += 6;
        // window.setTime(() => { this.})
    }
  }

  deadDuck () {
    this.duck.gotoAndPlay("shot");
    this.duck.status = 0;
  }

  duckSprite () {
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
  constructor(board) {
    this.stage = board.stage;
    this.canvas = board.canvas;
    this.bullets = 3;
    this.ducks = {};

    this.createDucks(5);
    this.createGrass();
    createjs.Ticker.addEventListener('tick', this.handleTick.bind(this));

    this.canvas.addEventListener('click', this.handleShot.bind(this));
  }

  createDucks(num = 1) {
    for (var id = 0; id < num; id++) {
      const duck = new Duck (this.canvas, id);
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
        // if (duck.duck.status === 0 && duck.duck.y > 400) {
        //   this.stage.children.forEach((child) => {
        //     if (child.duckId === duck.duck.duckId) {
        //       this.stage.removeChild(child);
        //     }
        //   });
        // }
        duck.moveDuck(this.canvas);
      }
    );
  }

  shotDuck(e) {
    const duck = this.ducks[e.target.id];
    // debugger
    if (duck.duck.status === 1) {
      duck.deadDuck();
    }
  }

  handleShot(e) {
    const shotSound = new Audio('assets/audio/shot.mp3');
    shotSound.currentTime = 0;

    shotSound.play();
  }


  createGrass() {
    const grass = new createjs.Bitmap('./assets/images/grass.png');
    grass.scaleX = 2.5;
    grass.scaleY = 2;
    grass.y = 302;
    this.stage.addChild(grass);
  }
}


module.exports = Round;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map