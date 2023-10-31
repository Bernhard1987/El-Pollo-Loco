class Chicken extends MovableObject {
    width = 80;
    height = 80;
    x = 200 + Math.random() * 500;
    y = 362;
    offsetX = -10;
    offsetY = -25;
    collisionStartOffsetY = 5;

    enemySoundInterval;

    IMAGES_WALKING = [
        './assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        './assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        './assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];

    IMAGE_DEAD = ['./assets/img/3_enemies_chicken/chicken_normal/2_dead/dead.png'];

    sound_chicken_bok = new Audio('./assets/sound/chicken-short-cluck.mp3');
    sound_chicken_bok_volume = 0.3;

    constructor() {
        super().loadImage('./assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImage(this.IMAGE_DEAD);
        this.speed = 0.25 + Math.random() * 0.25;
        this.addChickenSound();
        this.playChickenSound();
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        setInterval(() => {
            this.animateImages(this.IMAGES_WALKING);
        }, 1000 / 6);
    }

    addChickenSound() {
        let rndNumber = Math.random();
        if (rndNumber <= 0.33) {
            this.sound_chicken_bok = new Audio('./assets/sound/chicken-short-cluck.mp3');
        } else if (rndNumber > 0.33 && rndNumber <= 0.66) {
            this.sound_chicken_bok = new Audio('./assets/sound/chicken-bok2.mp3');
        } else if (rndNumber > 0.66) {
            this.sound_chicken_bok = new Audio('./assets/sound/chicken-bok.mp3');
        }
    }

    playChickenSound() {
            this.enemySoundInterval = setInterval(() => {
                this.sound_chicken_bok.volume = this.sound_chicken_bok_volume;
                this.sound_chicken_bok.play();
            }, (5000 + (Math.random() * 15000)));
    }
}