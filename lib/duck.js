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
