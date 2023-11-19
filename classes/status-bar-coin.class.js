/**
 * Class representing a coin status bar, extending the StatusBar class.
 */
class StatusBarCoin extends StatusBar {
    /**
     * @property {string[]} IMAGES - Array of file paths for coin status bar images.
     */
    IMAGES = [
        './assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png',
        './assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png',
        './assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png',
        './assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
        './assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
        './assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png'
    ];

    /**
     * Constructor for the StatusBarCoin class.
     * Loads coin status bar images, sets initial position, and initializes with a default percentage value of 0.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 10;
        this.y = 30;
        this.setPercentage(0);
    }
}