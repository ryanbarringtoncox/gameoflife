function DrumSprite() {

  return new Howl({
    urls: ['drums.mp3'],
      sprite: {
        1: [0,500],
        2: [1000,500],
        6: [5000,500],
        17: [16000,500]
      }
  });

}

module.exports = DrumSprite;
