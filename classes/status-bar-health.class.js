/**
 * Class representing a health status bar, extending the StatusBar class.
 */
class StatusBarHealth extends StatusBar {
    /**
     * @property {string[]} IMAGES - Array of file paths for health status bar images.
     */
    IMAGES = [
        './assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        './assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        './assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        './assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        './assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        './assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png'
    ];

    /**
     * Constructor for the StatusBarHealth class.
     * Loads health status bar images, sets initial position, and initializes with a default percentage value of 100.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 10;
        this.y = -15;
        this.setPercentage(100);
    }
}