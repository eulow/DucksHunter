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
    // dog.regX = 20;
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
