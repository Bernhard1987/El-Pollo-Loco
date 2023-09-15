class Character extends MovableObject {
    width = 150;
    height = 300;

    constructor() {
        super().loadImage('./assets/img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages([
            './assets/img/2_character_pepe/1_idle/idle/I-1.png',
            './assets/img/2_character_pepe/1_idle/idle/I-2.png',
            './assets/img/2_character_pepe/1_idle/idle/I-3.png',
            './assets/img/2_character_pepe/1_idle/idle/I-4.png',
            './assets/img/2_character_pepe/1_idle/idle/I-5.png',
            './assets/img/2_character_pepe/1_idle/idle/I-6.png',
            './assets/img/2_character_pepe/1_idle/idle/I-7.png',
            './assets/img/2_character_pepe/1_idle/idle/I-8.png',
            './assets/img/2_character_pepe/1_idle/idle/I-9.png',
            './assets/img/2_character_pepe/1_idle/idle/I-10.png']);

        this.x = 10;
        this.y = 150;
    }
    jump() {

    }
}