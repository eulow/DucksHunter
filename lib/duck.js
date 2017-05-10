class Duck {
  constructor (canvas, ducksContainer, id, round) {
    this.ducksContainer = ducksContainer;
    this.canvas = canvas;

    this.duck = this.duckSprite();
    this.duck.framerate = 5 + round;
    this.duck.scaleX = 1.8;
    this.duck.scaleY = 1.8;
    this.duck.x = Math.random() * canvas.width;
    this.duck.y = Math.random() * canvas.height - 200;
    this.duck.velX = 3.5 + round;
    this.duck.velY = 5 + round;
    this.duck.duckId = id;
    this.duck.status = 1;

    const hit = new createjs.Shape();
    hit.graphics.beginFill('#000').drawRect(-5, -5, 65, 45);
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

  // removeDuckIfOutOfScreen() {
  //   if ((this.duck.status === 0 || this.duck.status === 2) && this.duck.y > 400) {
  //     this.ducksContainer.children.forEach((child) => {
  //       if (child.duckId === this.duck.duckId) {
  //         this.ducksContainer.removeChild(child);
  //       }
  //     });
  //   }
  // }

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
