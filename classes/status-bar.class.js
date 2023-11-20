/**
 * Class representing a status bar, extending the DrawableObject class.
 */
class StatusBar extends DrawableObject {
    /**
     * @property {number} percentage - The percentage value represented by the status bar.
     * @property {number} height - The height of the status bar.
     * @property {number} width - The width of the status bar.
     * @property {number} x - The x-coordinate of the status bar.
     * @property {number} y - The y-coordinate of the status bar.
     * @property {string[]} IMAGES - Array of file paths for status bar images.
     */
    percentage = 100;
    height = 60;
    width = 230;
    x = 0;
    y = 120;

    IMAGES = [];

    /**
     * Constructor for the StatusBar class.
     * Loads images, sets initial position, and initializes with a default percentage value of 100.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 0;
        this.y = 0;
        this.setPercentage(100);
    }

    /**
     * Sets the percentage value for the status bar and updates the displayed image.
     *
     * @param {number} percentage - The percentage value to set for the status bar.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let imagePath = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[imagePath];
    }

    /**
     * Resolves the image index based on the current percentage value.
     *
     * @returns {number} - The index corresponding to the appropriate image based on the percentage.
     */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if(this.percentage > 80) {
            return 4;
        } else if(this.percentage > 60) {
            return 3;
        } else if(this.percentage > 40) {
            return 2;
        } else if(this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }
}