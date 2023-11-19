/**
 * Class representing a boss status bar, extending the StatusBar class.
 */
class StatusBarBoss extends StatusBar {
    /**
     * @property {string[]} IMAGES - Array of file paths for boss status bar images.
     */
    IMAGES = [
        './assets/img/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png',
        './assets/img/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png',
        './assets/img/7_statusbars/1_statusbar/2_statusbar_health/orange/40.png',
        './assets/img/7_statusbars/1_statusbar/2_statusbar_health/orange/60.png',
        './assets/img/7_statusbars/1_statusbar/2_statusbar_health/orange/80.png',
        './assets/img/7_statusbars/1_statusbar/2_statusbar_health/orange/100.png'
    ];

    /**
     * Constructor for the StatusBarBoss class.
     * Loads boss status bar images, sets initial position, and initializes with a default percentage value of 100.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 10;
        this.y = 421;
        this.setPercentage(100);
    }
}