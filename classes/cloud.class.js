/**
 * Class representing a cloud that extends MovableObject.
 */
class Cloud extends MovableObject {
    /**
     * @property {number} width - The width of the cloud.
     * @property {number} height - The height of the cloud.
     */
    width = 700;
    height = 350;

    /**
     * Constructor for the Cloud class.
     * Initializes properties, loads the cloud image, sets position, and starts animation.
     * @param {number} positionStart - The starting position of the cloud on the x-axis.
     * @param {string} cloudImg - The filename of the cloud image.
     */
    constructor(positionStart, cloudImg) {
        super().loadImage(`./assets/img/5_background/layers/4_clouds/${cloudImg}.png`);

        this.x = positionStart + Math.random() * 300;
        this.y = 20;
        this.animate();
    }

    /**
     * Initiates the animation loop for the cloud, moving it to the left at a regular interval.
     */

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }
}