/**
 * Class representing a collectable coin that extends CollectableObject.
 */

class CollectableCoin extends CollectableObject {
    /**
     * @property {number} width - The width of the coin.
     * @property {number} height - The height of the coin.
     * @property {number} offsetY - The offset along the y-axis.
     * @property {number} offsetX - The offset along the x-axis.
     * @property {Audio} collect_sound - Audio object for the collect sound of the coin.
     * @property {number} collect_sound_volume - Volume level for the collect sound of the coin.
     * @property {string[]} IMAGES - Array of file paths for coin animation images.
     */
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

    /**
     * Constructor for the CollectableCoin class.
     * Initializes properties, loads the initial coin image, loads animation images, sets position, and starts animation.
     * @param {number} x - The x-coordinate of the coin's position.
     * @param {number} y - The y-coordinate of the coin's position.
     */

    constructor(x, y) {
        super().loadImage('./assets/img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES);
        this.x = x;
        this.y = y;
        this.animate();
    }

    /**
     * Initiates the animation loop for the coin, animating through the coin images at a regular interval.
     */

    animate() {
        let animate = setInterval(() => {
            this.animateImages(this.IMAGES);
        }, 1000 / 4);
        this.pushToObjectInterval(animate);
    }
}