class StatusBarBossSymbol extends DrawableObject {
    height = 60;
    width = 60;
    x = 0;
    y = 430;

    IMAGE = ['./assets/img/7_statusbars/3_icons/icon_health_endboss.png'];

    constructor() {
        super();
        this.loadImage(this.IMAGE);
    }
}