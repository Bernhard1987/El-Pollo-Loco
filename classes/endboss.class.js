class Endboss extends MovableObject {
    width = 255; //aspect-ratio 0.85
    height = 300;
    x = 4030;
    y = 150;
    offsetX = -40;
    offsetY = -70;
    collisionStartOffsetY = 24;
    damage = 1;
    maxHealth = 800;
    speed = 0.5;
    bossTriggered = false;

    IMAGES_WALKING = [
        './assets/img/4_enemie_boss_chicken/1_walk/G1.png',
        './assets/img/4_enemie_boss_chicken/1_walk/G2.png',
        './assets/img/4_enemie_boss_chicken/1_walk/G3.png',
        './assets/img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    IMAGES_DEAD = [
        './assets/img/4_enemie_boss_chicken/5_dead/G24.png',
        './assets/img/4_enemie_boss_chicken/5_dead/G25.png',
        './assets/img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    IMAGES_ALERT = [
        './assets/img/4_enemie_boss_chicken/2_alert/G5.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G6.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G7.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G8.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G9.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G10.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G11.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_HURT = [
        './assets/img/4_enemie_boss_chicken/4_hurt/G21.png',
        './assets/img/4_enemie_boss_chicken/4_hurt/G22.png',
        './assets/img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    IMAGES_ATTACK = [
        './assets/img/4_enemie_boss_chicken/3_attack/G13.png',
        './assets/img/4_enemie_boss_chicken/3_attack/G14.png',
        './assets/img/4_enemie_boss_chicken/3_attack/G15.png',
        './assets/img/4_enemie_boss_chicken/3_attack/G16.png',
        './assets/img/4_enemie_boss_chicken/3_attack/G17.png',
        './assets/img/4_enemie_boss_chicken/3_attack/G18.png',
        './assets/img/4_enemie_boss_chicken/3_attack/G19.png',
        './assets/img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    sound_endboss_bok = new Audio('./assets/sound/boss-bok.mp3');
    sound_dead = new Audio('./assets/sound/boss-dead.mp3');
    sound_roar = new Audio('./assets/sound/boss-roar.mp3');
    sound_endboss_bok_volume = 0.3;
    sound_dead_volume = 0.1;

    walking_sound = new Audio('./assets/sound/boss_walk1.mp3');
    walking_sound_2 = new Audio('./assets/sound/boss_walk2.mp3');
    walking_sound_volume = 0.3; //0.3

    constructor(startX) {
        super().loadImage('./assets/img/4_enemie_boss_chicken/2_alert/G5.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_ATTACK);
        this.animate();
        this.health = this.maxHealth;
        this.x = startX;
    }

    animate() {
        let animate = setInterval(() => {
            if (this.bossTriggered) {
                this.animateImages(this.IMAGES_WALKING);
            } else {
                this.animateImages(this.IMAGES_ALERT);
            }
        }, 1000 / 6);
        this.pushToObjectInterval(animate);
    }

    triggerBoss() {
        this.chickenSound();
        this.playBossRoar();

        this.playWalkingSound();
        this.moveLeft();
    }

    moveLeft() {
        let moveLeft = setInterval(() => {
            super.moveLeft();
        }, 1000 / 60);
        this.pushToObjectInterval(moveLeft);
    }

    chickenSound() {
        let chickenSound = setInterval(() => {
            this.sound_endboss_bok.volume = this.sound_endboss_bok_volume;
            this.sound_endboss_bok.play();
        }, 6000 + (Math.random() * 10000));
        this.pushToObjectInterval(chickenSound);
    }

    playSoundDead() {
        this.sound_dead.volume = this.sound_dead_volume;
        this.sound_dead.play();
    }

    playBossRoar() {
        this.sound_dead.volume = this.sound_dead_volume;
        this.sound_roar.play();
    }

    playWalkingSound() {
        let playWalkingSound = setInterval(() => {
            this.walkingSound();
        }, 800);
        this.pushToObjectInterval(playWalkingSound);
    }
}