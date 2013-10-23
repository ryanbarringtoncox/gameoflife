function BassSprite() {

  return new Howl({
    urls: ['piano_bass.mp3'],
      sprite: {
        1: [0,500],
        2: [1000,500],
        3: [2000,500]
      }
  });

}

module.exports = BassSprite;
