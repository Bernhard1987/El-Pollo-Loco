class SoundToggle extends DrawableObject {
    width = 34;
    height = 34;
    x = 678;
    y = 8;

    soundOn = true;

    IMAGES = ['./assets/img/sound_on.svg', './assets/img/sound_off.svg'];

    constructor() {
        super();
        this.loadImage(this.IMAGES[0]);
    }

    switchSound() {
        if (this.soundOn) {
            this.loadImage(this.IMAGES[1]);
        } else {
            this.loadImage(this.IMAGES[0]);
        }
    }
}