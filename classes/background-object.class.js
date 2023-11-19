/**
 * Class representing a background object, extending the MovableObject class.
 */
class BackgroundObject extends MovableObject {
    /**
     * @property {number} width - The width of the background object.
     * @property {number} height - The height of the background object.
     */
    width = 720;
    height = 480;

    /**
     * Constructor for the BackgroundObject class.
     * Loads the image for the background object and sets its initial position.
     * @param {string} imagePath - The file path to the image of the background object.
     * @param {number} x - The initial x-coordinate of the background object.
     * @param {number} y - The initial y-coordinate of the background object.
     */
    constructor(imagePath, x, y) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = y;
    }
}