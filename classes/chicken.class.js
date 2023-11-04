class Chicken extends MovableObject {
    width = 80;
    height = 80;
    x = 200 + Math.random() * 500;
    y = 362;
    offsetX = -10;
    offsetY = -25;
    collisionStartOffsetY = 5;

    IMAGES_WALKING = [
        './assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        './assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        './assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];

    IMAGES_DEAD = ['./assets/img/3_enemies_chicken/chicken_normal/2_dead/dead.png'];

    sound_enemy = new Audio('./assets/sound/chicken-short-cluck.mp3');
    sound_enemy_volume = 0;

    sound_dead = new Audio('./assets/sound/chicken-dead.mp3');
    sound_dead_volume = 0;

    constructor() {
        super().loadImage('./assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.speed = 0.25 + Math.random() * 0.25;
        this.addChickenSound();
        this.playEnemySound();
        this.animate();
    }

    animate() {
        let moveLeft = setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
        this.pushToObjectInterval(moveLeft);
            let animateWalking = setInterval(() => {
                this.animateImages(this.IMAGES_WALKING);
            }, 1000 / 6);
            this.pushToObjectInterval(animateWalking);
    }

    addChickenSound() {
        let rndNumber = Math.random();
        if (rndNumber <= 0.33) {
            this.sound_enemy = new Audio('./assets/sound/chicken-short-cluck.mp3');
        } else if (rndNumber > 0.33 && rndNumber <= 0.66) {
            this.sound_enemy = new Audio('./assets/sound/chicken-bok2.mp3');
        } else if (rndNumber > 0.66) {
            this.sound_enemy = new Audio('./assets/sound/chicken-bok.mp3');
        }
    }

    playEnemySound() {
        let soundEnemyInterval = setInterval(() => {
            this.sound_enemy.volume = this.sound_enemy_volume;
            this.sound_enemy.play();
        }, (5000 + (Math.random() * 15000)));
        this.pushToObjectInterval(soundEnemyInterval);
    }

    playSoundDead() {
        this.sound_dead.volume = this.sound_dead_volume;
        this.sound_dead.play();
    }
}