function DrumSprite() {

  return new Howl({
    urls: ['drums.mp3'],
      sprite: {
        1: [0,500],
        2: [1000,500],
        3: [2000,500],
        4: [3000,500],
        5: [4000,500],
        6: [5000,500],
        7: [6000,500],
      }
  });

}

module.exports = DrumSprite;
