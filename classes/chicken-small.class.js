class ChickenSmall extends MovableObject {
    width = 60;
    height = 60;
    x = 900 + Math.random() * 500;
    y = 383;
    offsetX = -10;
    offsetY = -25;
    collisionStartOffsetY = 0;
    jumpSpeedY = 25;
    floorCoord = 370;

    enemySoundInterval;

    IMAGES_WALKING = [
        './assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        './assets/img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        './assets/img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    IMAGE_DEAD = ['./assets/img/3_enemies_chicken/chicken_small/2_dead/dead.png'];

    sound_enemy = new Audio('./assets/sound/chirp.mp3');
    sound_enemy_volume = 0.1;

    sound_dead = new Audio('./assets/sound/small_chicken_dead.mp3');
    sound_dead_volume = 0.3;

    sound_attack = new Audio('./assets/sound/angry_bird_attack.mp3');
    sound_attack_volume = 0.1;

    constructor() {
        super().loadImage('./assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImage(this.IMAGE_DEAD);
        this.speed = 0.5 + Math.random() * 0.5;
        this.addChickenSound();
        this.playEnemySound();
        this.applyGravity(this.floor);
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        setInterval(() => {
            this.jump();
            this.playSoundAttack();
        }, 5000 + (Math.random() * 5000));

        if (this.isHurt()) {
            this.animateImages(this.IMAGE_DEAD);
        } else {
            setInterval(() => {
                this.animateImages(this.IMAGES_WALKING);
            }, 1000 / 6);
        }

    }

    addChickenSound() {
        let rndNumber = Math.random();
        if (rndNumber <= 0.5) {
            this.sound_enemy = new Audio('./assets/sound/chirp.mp3');
        } else if (rndNumber > 0.5) {
            this.sound_enemy = new Audio('./assets/sound/chirp2.mp3');
        }
    }

    playEnemySound() {
        this.enemySoundInterval = setInterval(() => {
            this.sound_enemy.volume = this.sound_enemy_volume;
            this.sound_enemy.play();
        }, (5000 + (Math.random() * 15000)));
    }

    playSoundDead() {
        this.sound_dead.volume = this.sound_dead_volume;
        this.sound_dead.play();
    }

    playSoundAttack() {
        this.sound_attack.volume = this.sound_attack_volume;
        this.sound_attack.play();
    }
}