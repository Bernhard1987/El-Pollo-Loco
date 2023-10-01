class Chicken extends MovableObject{
    width = 80;
    height = 80;
    x = 200 + Math.random() * 500;
    y = 370;
    IMAGES_WALKING = [
        './assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        './assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        './assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];

    sound_chicken_bok = new Audio('./assets/sound/chicken-short-cluck.mp3');
    sound_chicken_bok2 = new Audio('./assets/sound/chicken-bok2.mp3');
    sound_chicken_bok3 = new Audio('./assets/sound/chicken-bok.mp3');
    sound_chicken_bok_volume = 0;

    constructor() {
        super().loadImage('./assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.speed = 0.25 + Math.random() * 0.25;

        this.animate();
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
        
        setInterval(() => {
            this.animateImages(this.IMAGES_WALKING);
        }, 1000 / 6);
        this.chickenSound();
        
    }

    chickenSound() {
        setInterval(() => {
            this.sound_chicken_bok.volume = this.sound_chicken_bok_volume; 
            this.sound_chicken_bok.play();
        }, 6000 + (Math.random() * 15000));

        setInterval(() => {
            this.sound_chicken_bok2.volume = this.sound_chicken_bok_volume;
            this.sound_chicken_bok2.play();
        }, 6000 + (Math.random() * 15000));

        setInterval(() => {
            this.sound_chicken_bok3.volume = this.sound_chicken_bok_volume;
            this.sound_chicken_bok3.play();
        }, 8000 + (Math.random() * 20000));
    }
}
