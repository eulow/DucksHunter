const Duck = require ('./duck');

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
