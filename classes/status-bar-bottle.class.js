/**
 * Class representing a bottle status bar, extending the StatusBar class.
 */
class StatusBarBottle extends StatusBar {
    /**
     * @property {string[]} IMAGES - Array of file paths for bottle status bar images.
     */
    IMAGES = [
        './assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
        './assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
        './assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
        './assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
        './assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
        './assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png'
    ];

    /**
     * Constructor for the StatusBarBottle class.
     * Loads bottle status bar images, sets initial position, and initializes with a default percentage value of 0.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 10;
        this.y = 75;
        this.setPercentage(0);
    }
}