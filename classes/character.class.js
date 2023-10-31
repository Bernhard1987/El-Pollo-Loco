class Character extends MovableObject {
    width = 150;
    height = 300;
    x = 10;
    y = 150;
    speed = 9;
    jumpSpeedY = 18;
    floorCoord = 150;
    offsetX = -70;
    offsetY = -140;
    collisionStartOffsetY = 55;
    collisionStartOffsetX = -8;

    walking_sound = new Audio('./assets/sound/walk.mp3');
    walking_sound_2 = new Audio('./assets/sound/walk2.mp3');
    walking_sound_volume = 0; //0.3
    jump_sound = new Audio('./assets/sound/jump4.mp3');
    jump_sound_volume = 0; //0.7
    get_hit = new Audio('./assets/sound/get_hit2.mp3');
    get_hit_volume = 0; //0.2


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

    IMAGES_JUMP_UP = [
        './assets/img/2_character_pepe/3_jump/J-31.png',
        './assets/img/2_character_pepe/3_jump/J-32.png',
        './assets/img/2_character_pepe/3_jump/J-33.png',
        './assets/img/2_character_pepe/3_jump/J-34.png'
    ];

    IMAGES_JUMP_DOWN = [
        './assets/img/2_character_pepe/3_jump/J-35.png',
        './assets/img/2_character_pepe/3_jump/J-36.png',
        './assets/img/2_character_pepe/3_jump/J-37.png',
        './assets/img/2_character_pepe/3_jump/J-38.png',
        './assets/img/2_character_pepe/3_jump/J-39.png'
    ];

    IMAGES_HURT = [
        './assets/img/2_character_pepe/4_hurt/H-41.png',
        './assets/img/2_character_pepe/4_hurt/H-42.png',
        './assets/img/2_character_pepe/4_hurt/H-43.png'
    ];

    IMAGES_DEAD = [
        './assets/img/2_character_pepe/5_dead/D-51.png',
        './assets/img/2_character_pepe/5_dead/D-52.png',
        './assets/img/2_character_pepe/5_dead/D-53.png',
        './assets/img/2_character_pepe/5_dead/D-54.png',
        './assets/img/2_character_pepe/5_dead/D-55.png',
        './assets/img/2_character_pepe/5_dead/D-56.png',
        './assets/img/2_character_pepe/5_dead/D-57.png'
    ];

    constructor() {
        super().loadImage('./assets/img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMP_UP);
        this.loadImages(this.IMAGES_JUMP_DOWN);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.applyGravity(this.floor);
        this.animate();
    }

    animate() {
        setInterval(() => {
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.moveRight();
                this.otherDirection = false;
                this.world.camera_x = -this.x + 100;
            }
            if (this.world.keyboard.LEFT && this.x > -360) {
                this.moveLeft();
                this.otherDirection = true;
                this.world.camera_x = -this.x + 100;
            }
            if (this.world.keyboard.UP && !this.isAboveGround()) {
                this.jump();
                this.playJumpSound();
            }
        }, 1000 / 60);

        let hasPlayedDeadAnimation = false;

        setInterval(() => {
            if (this.isDead() && !hasPlayedDeadAnimation) {
                this.animateImages(this.IMAGES_DEAD);
                // hasPlayedDeadAnimation = true;
            } else if (this.isHurt()) {
                this.animateImages(this.IMAGES_HURT);
            } else if (this.isAboveGround() && this.speedY > 0) {
                this.animateImages(this.IMAGES_JUMP_UP);
            } else if (this.isAboveGround() && this.speedY <= 0){
                this.animateImages(this.IMAGES_JUMP_DOWN);
            }  else {
                this.animateImages(this.IMAGES_IDLE);
                this.walk();
            }
        }, 1000 / 10);
    }

    playJumpSound() {
        this.jump_sound.volume = this.jump_sound_volume;
        this.jump_sound.play();
    }

    throwBackCharacter() {
        if (this.otherDirection) {
            this.x = this.x + 100;
            this.world.camera_x = this.x;
        } else {
            this.x = this.x - 100;
            this.world.camera_x = this.x;
        }
    }

    walk() {
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            this.animateImages(this.IMAGES_WALKING);
            this.walkingSound();
        }
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