class CollectableCoin extends CollectableObject {
    width = 150;
    height = 150;
    offsetY = -100;
    offsetX = -100;

    collect_sound = new Audio('./assets/sound/collect-coin.mp3');
    collect_sound_volume = 1;

    IMAGES = [
        './assets/img/8_coin/coin_1.png',
        './assets/img/8_coin/coin_2.png'
    ]

    constructor(x, y) {
        super().loadImage('./assets/img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES);
        this.x = x;
        this.y = y;
        this.animate();
    }

    animate() {
        let animate = setInterval(() => {
            this.animateImages(this.IMAGES);
        }, 1000 / 4);
        this.pushToObjectInterval(animate);
    }
}