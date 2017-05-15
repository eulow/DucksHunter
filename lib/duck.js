class Duck {
  constructor (round, duckId) {
    this.ducksContainer = round.ducksContainer;
    this.canvas = round.canvas;
    this.round = round;

    this.duck = this.duckSprite();
    this.duck.framerate = 5 + round.roundNumber/1.35;
    this.duck.scaleX = 1.8;
    this.duck.scaleY = 1.8;
    this.duck.x = Math.random() * this.canvas.width;
    this.duck.y = Math.random() * this.canvas.height - 200;
    this.duck.velX = 7 + Math.random() * round.roundNumber * 3;
    this.duck.velY = 7 + Math.random() * round.roundNumber * 3;
    this.duck.duckId = duckId;
    this.duck.status = 1;

    const hit = new createjs.Shape();
    hit.graphics.beginFill('#000').drawRect(-5, -5, 55, 40);
    this.duck.hitArea = hit;

    this.removeDuckOutOfScreen = this.removeDuckOutOfScreen.bind(this);
  }

  moveDuck() {
    // makes duck face correct direction
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
          duckHitsGround.play();
        }
        break;
      case 2:
        if (this.duck.y > -30 && (this.duck.x > -30 && this.duck.x < 630)) {
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
    fallingDuck.play();
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
