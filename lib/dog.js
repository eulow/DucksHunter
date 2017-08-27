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
      dogLaugh.volume = 0.1;
      dogLaugh.play();
    } else {
      const roundClear = new Audio('assets/audio/round_clear.mp3');
      roundClear.currentTime = 0;
      roundClear.volume = 0.1;
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
