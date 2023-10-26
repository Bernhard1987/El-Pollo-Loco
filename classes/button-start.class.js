class ButtonStart extends Button {
    width = 140;
    height = 52;
    // y = 420;
    x = 720 / 2 - 70;

    IMAGE = './assets/img/btn_start.svg';

    constructor() {
        super();
        this.loadImage(this.IMAGE);
    }
}