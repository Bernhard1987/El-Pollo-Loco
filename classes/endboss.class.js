class Endboss extends MovableObject {
    width = 255; //aspect-ratio 0.85
    height = 300;
    x = 2500;
    y = 150;
    IMAGES_WALKING = [
        './assets/img/4_enemie_boss_chicken/2_alert/G5.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G6.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G7.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G8.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G9.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G10.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G11.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    sound_endboss_bok = new Audio('./assets/sound/boss-bok.mp3');
    sound_endboss_dead = new Audio('./assets/sound/boss-dead.mp3');
    sound_endboss_bok_volume = 0;
    sound_endboss_dead_volume = 0;

    constructor() {
        super().loadImage('./assets/img/4_enemie_boss_chicken/2_alert/G5.png');
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.animateImages(this.IMAGES_WALKING);
        }, 1000 / 6);
        this.chickenSound();
    }

    chickenSound() {
        setInterval(() => {
            this.sound_endboss_bok.volume = this.sound_endboss_bok_volume; 
            this.sound_endboss_bok.play();
        }, 6000 + (Math.random() * 15000));
    }
}