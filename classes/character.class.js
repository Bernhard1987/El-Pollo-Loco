class Character extends MovableObject {
    width = 150;
    height = 300;
    x = 10;
    y = 150;
    speed = 9;

    walking_sound = new Audio('./assets/sound/walk.mp3');
    walking_sound_2 = new Audio('./assets/sound/walk2.mp3');
    walking_sound_volume = 0.2;
    jump_sound = new Audio('./assets/sound/jump.mp3');


    IMAGES_WALKING = [
        './assets/img/2_character_pepe/2_walk/W-21.png',
        './assets/img/2_character_pepe/2_walk/W-22.png',
        './assets/img/2_character_pepe/2_walk/W-23.png',
        './assets/img/2_character_pepe/2_walk/W-24.png',
        './assets/img/2_character_pepe/2_walk/W-25.png',
        './assets/img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_IDLE = [
        './assets/img/2_character_pepe/1_idle/idle/I-1.png',
        './assets/img/2_character_pepe/1_idle/idle/I-2.png',
        './assets/img/2_character_pepe/1_idle/idle/I-3.png',
        './assets/img/2_character_pepe/1_idle/idle/I-4.png',
        './assets/img/2_character_pepe/1_idle/idle/I-5.png',
        './assets/img/2_character_pepe/1_idle/idle/I-6.png',
        './assets/img/2_character_pepe/1_idle/idle/I-7.png',
        './assets/img/2_character_pepe/1_idle/idle/I-8.png',
        './assets/img/2_character_pepe/1_idle/idle/I-9.png',
        './assets/img/2_character_pepe/1_idle/idle/I-10.png'
    ];

    IMAGES_JUMP = [
        './assets/img/2_character_pepe/3_jump/J-31.png',
        './assets/img/2_character_pepe/3_jump/J-32.png',
        './assets/img/2_character_pepe/3_jump/J-33.png',
        './assets/img/2_character_pepe/3_jump/J-34.png',
        './assets/img/2_character_pepe/3_jump/J-35.png',
        './assets/img/2_character_pepe/3_jump/J-36.png',
        './assets/img/2_character_pepe/3_jump/J-37.png',
        './assets/img/2_character_pepe/3_jump/J-38.png',
        './assets/img/2_character_pepe/3_jump/J-39.png'
    ]

    world;

    constructor() {
        super().loadImage('./assets/img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.IMAGES_WALKING);

        this.animate();
        this.moveRight();
        this.moveLeft();
    }

    animate() {
        setInterval(() => {
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.animateImages(this.IMAGES_WALKING);
                this.walkingSound();
            }
        }, 1000 / 12);
    }

    moveRight() {
        setInterval(() => {
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.x += this.speed;
                this.otherDirection = false;
                this.world.camera_x = -this.x + 100;
            }
        }, 1000 / 60);
    }

    moveLeft() {
        setInterval(() => {
            if (this.world.keyboard.LEFT && this.x > -360) {
                this.x -= this.speed;
                this.otherDirection = true;
                this.world.camera_x = -this.x + 100;
            }
        }, 1000 / 60);
    }

    jump() {

    }

    walkingSound() {
        this.walking_sound.volume = this.walking_sound_volume;
        this.walking_sound_2.volume = this.walking_sound_volume;
        let randomNumber = Math.random();
        if (randomNumber >= 0.5) {
            this.walking_sound.play();
        } else {
            this.walking_sound_2.play();
        }

    }
}