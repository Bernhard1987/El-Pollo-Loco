/**
 * Class representing a symbol for the boss status bar, extending the DrawableObject class.
 */
class StatusBarBossSymbol extends DrawableObject {
    /**
     * @property {string} IMAGE - File path for the boss status bar symbol image.
     */
    height = 60;
    width = 60;
    x = 0;
    y = 430;

    IMAGE = ['./assets/img/7_statusbars/3_icons/icon_health_endboss.png'];

    /**
     * Constructor for the StatusBarBossSymbol class.
     * Loads the boss status bar symbol image and sets its initial position.
     */
    constructor() {
        super();
        this.loadImage(this.IMAGE);
    }
}