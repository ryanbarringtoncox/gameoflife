function PianoSprite() {

  return new Howl({
    urls: ['piano.mp3'],
       sprite: {
         1: [0,1028],
         2: [3000,1111],
         3: [6000,1240],
         4: [9000,967],
         5: [11000,926],
         6: [13000,1172],
         7: [16000,1005],
         8: [19000,1363],
         9: [22000,1275],
         10: [25000,1346],
       }

  });

}

module.exports = PianoSprite;
