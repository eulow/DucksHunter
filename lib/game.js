const Board = require('./board');

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
