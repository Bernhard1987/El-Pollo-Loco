class Endboss extends MovableObject {
    width = 255; //aspect-ratio 0.85
    height = 300;
    x = 4500;
    y = 170;
    offsetX = -40;
    offsetY = -70;
    collisionStartOffsetY = 24;
    damage = 1;
    maxHealth = 800;
    speed = 4;
    bossTriggered = false;
    walk = true;
    moveLeftInterval;
    stopAndRoarInterval;

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

    sound_enemy = new Audio('./assets/sound/boss-bok.mp3');
    sound_dead = new Audio('./assets/sound/boss-dead.mp3');
    sound_roar = new Audio('./assets/sound/boss-roar.mp3');
    sound_enemy_volume = 0.3;
    sound_dead_volume = 0.3;

    walking_sound = new Audio('./assets/sound/boss_walk1.mp3');
    walking_sound_2 = new Audio('./assets/sound/boss_walk2.mp3');
    walking_sound_volume = 0.7; //0.7

    constructor(startX) {
        super().loadImage('./assets/img/4_enemie_boss_chicken/2_alert/G5.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_ATTACK);
        this.setSoundVolume();
        this.animate();
        this.health = this.maxHealth;
        this.x = startX;
    }

    animate() {
        let animate = setInterval(() => {
            if (this.bossTriggered && this.walk) {
                this.animateImages(this.IMAGES_WALKING);
            } else if (this.isHurt()) {
                this.animateImages(this.IMAGES_HURT);
            } else {
                this.animateImages(this.IMAGES_ALERT);
            }
        }, 1000 / 6);

        this.pushToObjectInterval(animate);
    }

    triggerBoss() {
        this.playBossRoar();
        this.playWalkingSound();
        this.setMovementTiming();
        this.moveLeft();
        this.stopAndRoar();
    }

    setMovementTiming() {
        setInterval(() => {
            if (!this.walk) {
                setTimeout(() => {
                    this.walk = true;
                }, 1000);
            } else {
                setTimeout(() => {
                    this.walk = false;
                }, 2000);
            }
        }, 5000);
    }

    stopAndRoar() {
        if (!this.walk) {
            this.playBossRoar();
            clearInterval(this.moveLeftInterval);
        }
    }

    moveLeft() {
        clearInterval(this.stopAndRoarInterval);
        this.moveLeftInterval = setInterval(() => {
            if (this.walk) {
                super.moveLeft();
            }
        }, 1000 / 60);
    }

    chickenSound() {
        this.sound_enemy.play();
    }

    playSoundDead() {
        this.sound_dead.play();
    }

    playBossRoar() {
        this.sound_roar.play();
    }

    playWalkingSound() {
        let playWalkingSound = setInterval(() => {
            if (this.walk) {
                this.walkingSound();
            }
        }, 400);
        this.pushToObjectInterval(playWalkingSound);
    }
}