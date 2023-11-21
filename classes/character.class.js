/**
 * Class representing the character, extending the MovableObject class.
 */
class Character extends MovableObject {
    /**
     * @property {number} width - The width of the character.
     * @property {number} height - The height of the character.
     * @property {number} x - The initial x-coordinate of the character.
     * @property {number} y - The initial y-coordinate of the character.
     * @property {number} speed - The speed of the character.
     * @property {number} jumpSpeedY - The vertical speed when jumping.
     * @property {number} floorCoord - The y-coordinate of the character's ground level.
     * @property {number} offsetX - The x-offset of the character.
     * @property {number} offsetY - The y-offset of the character.
     * @property {number} collisionStartOffsetY - The y-offset when collision detection starts.
     * @property {number} collisionStartOffsetX - The x-offset when collision detection starts.
     * @property {Audio} walking_sound - The audio for walking sound.
     * @property {Audio} walking_sound_2 - The second audio for walking sound.
     * @property {number} walking_sound_volume - The volume for walking sound (0.3).
     * @property {Audio} jump_sound - The audio for jumping sound.
     * @property {number} jump_sound_volume - The volume for jumping sound (0.7).
     * @property {Audio} get_hit - The audio for getting hit sound.
     * @property {number} get_hit_volume - The volume for getting hit sound (0.2).
     * @property {Audio} sound_dead - The audio for character's death sound.
     * @property {number} sound_dead_volume - The volume for character's death sound (0.5).
     * @property {boolean} charDead - Flag to check if the character is dead.
     * @property {number[]} animationInterval - Array to store animation intervals.
     * @property {string[]} IMAGES_WALKING - Array of image paths for walking animation.
     * @property {string[]} IMAGES_IDLE - Array of image paths for idle animation.
     * @property {string[]} IMAGES_LONG_IDLE - Array of image paths for long idle animation.
     * @property {string[]} IMAGES_JUMP_UP - Array of image paths for jumping up animation.
     * @property {string[]} IMAGES_JUMP_DOWN - Array of image paths for jumping down animation.
     * @property {string[]} IMAGES_HURT - Array of image paths for hurt animation.
     * @property {string[]} IMAGES_DEAD - Array of image paths for dead animation.
     */
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
    walking_sound_volume = 0.3; //0.3
    jump_sound = new Audio('./assets/sound/jump4.mp3');
    jump_sound_volume = 0.7; //0.7
    get_hit = new Audio('./assets/sound/get_hit2.mp3');
    get_hit_volume = 0.2; //0.2
    sound_dead = new Audio('./assets/sound/char-dead.mp3');
    sound_dead_volume = 0.5;
    snore_sound = new Audio('./assets/sound/snore.mp3');
    snore_sound_volume = 0.7;

    animationInterval = [];

    charDead = false;


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

    IMAGES_LONG_IDLE = [
        './assets/img/2_character_pepe/1_idle/long_idle/I-11.png',
        './assets/img/2_character_pepe/1_idle/long_idle/I-12.png',
        './assets/img/2_character_pepe/1_idle/long_idle/I-13.png',
        './assets/img/2_character_pepe/1_idle/long_idle/I-14.png',
        './assets/img/2_character_pepe/1_idle/long_idle/I-15.png',
        './assets/img/2_character_pepe/1_idle/long_idle/I-16.png',
        './assets/img/2_character_pepe/1_idle/long_idle/I-17.png',
        './assets/img/2_character_pepe/1_idle/long_idle/I-18.png',
        './assets/img/2_character_pepe/1_idle/long_idle/I-19.png',
        './assets/img/2_character_pepe/1_idle/long_idle/I-20.png'
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

    /**
     * Constructor for the Character class.
     * Loads initial character properties, images, and starts animations.
     */
    constructor() {
        super().loadImage('./assets/img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMP_UP);
        this.loadImages(this.IMAGES_JUMP_DOWN);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.applyGravity();
        this.animate();
        this.setSoundVolume();
    }

    /**
     * Method to animate the character's movements and actions.
     * Controls the character's movement, jumping, and plays animations accordingly.
     */
    animate() {
        this.controlCharacter();
        this.playAnimationDead();
        this.playAnimations();
    }

    /**
     * Method to control the character's movement.
     * Checks for keyboard input and moves the character accordingly.
     */
    controlCharacter() {
        setInterval(() => {
            this.moveLeft();
            this.moveRight();
            this.jump();
        }, 1000 / 60);
    }

    /**
     * Method to move the character to the right.
     * Checks for keyboard input and boundary conditions.
     */
    moveRight() {
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x && !this.isDead()) {
            super.moveRight();
            this.otherDirection = false;
            this.world.camera_x = -this.x + 100;
        }
    }

    /**
     * Method to move the character to the left.
     * Checks for keyboard input and boundary conditions.
     */
    moveLeft() {
        if (this.world.keyboard.LEFT && this.x > -360 && !this.isDead()) {
            super.moveLeft();
            this.otherDirection = true;
            this.world.camera_x = -this.x + 100;
        }
    }

    /**
     * Method to make the character jump.
     * Checks for keyboard input and ground conditions.
     */
    jump() {
        if (this.world.keyboard.UP && !this.isAboveGround() && !this.isDead()) {
            super.jump();
            this.playJumpSound();
        }
    }

    /**
     * Method to play various animations based on the character's state.
     * Uses intervals to change images in the animation.
     */
    playAnimations() {
        let animation = setInterval(() => {
            if (this.isHurt() && !this.isDead()) {
                this.animateImages(this.IMAGES_HURT);
                this.snore_sound.pause();
            } else if (this.isAboveGround() && this.speedY > 0) {
                this.playAnimationJumpUp();
            } else if (this.isAboveGround() && this.speedY <= 0) {
                this.playAnimationJumpDown();
            } else if (this.timeDifferenceLastBtnPress() > 10){
                this.animateImages(this.IMAGES_LONG_IDLE);
                this.snore_sound.play();
            } else {
                this.animateImages(this.IMAGES_IDLE);
                this.snore_sound.pause();
                this.walk();
            }
        }, 1000 / 10);
        this.animationInterval.push(animation);
    }

    /**
     * Method to resolve time difference between last button press and current time
     * @returns {number} time difference in seconds
     */
    timeDifferenceLastBtnPress() {
        let currentTime = new Date().getTime();
        let timeDifference = currentTime - lastButtonPressTime;
        let timeDifferenceSeconds = timeDifference / 1000;
        return timeDifferenceSeconds;
    }

    /**
     * Method to play the jump-up animation based on the character's speed.
     */
    playAnimationJumpUp() {
        if (this.speedY >= 18) {
            this.img = this.imageCache[this.IMAGES_JUMP_UP[0]];
        } else if (this.speedY > 12) {
            this.img = this.imageCache[this.IMAGES_JUMP_UP[1]];
        } else if (this.speedY > 6) {
            this.img = this.imageCache[this.IMAGES_JUMP_UP[2]];
        } else {
            this.img = this.imageCache[this.IMAGES_JUMP_UP[3]];
        }
    }

    /**
     * Method to play the jump-down animation based on the character's speed.
     */
    playAnimationJumpDown() {
        if (this.speedY > -3) {
            this.img = this.imageCache[this.IMAGES_JUMP_DOWN[0]];
        } else if (this.speedY <= -3) {
            this.img = this.imageCache[this.IMAGES_JUMP_DOWN[1]];
        } else if (this.speedY < -6) {
            this.img = this.imageCache[this.IMAGES_JUMP_DOWN[2]];
        } else if (this.speedY < -12) {
            this.img = this.imageCache[this.IMAGES_JUMP_DOWN[3]];
        } else {
            this.img = this.imageCache[this.IMAGES_JUMP_DOWN[4]];
        }
    }

    /**
     * Method to play the dead animation.
     * Checks if the character is dead and stops the animation.
     */
    playAnimationDead() {
        setInterval(() => {
            if (this.isDead()) {
                clearInterval(this.animationInterval);
                this.showDeadImage();
            }
        }, 1000 / 5);
    }

    /**
     * Method to check if the character is alive or dead.
     * If dead, triggers appropriate actions.
     */
    checkAlive() {
        if (this.isDead()) {
            this.changeCharPropertiesOnDeath();
            this.playDeadSound();
            gameOver('characterDead');
        }
    }

    /**
     * Method to change character properties when dead.
     * Stops movement, sets specific properties, and adjusts the floor level.
     */
    changeCharPropertiesOnDeath() {
        this.collision = false;
        this.speedY = 0;
        this.speedX = 0;
        this.floorCoord = 500;
        this.speedY = -6;
        this.isHurtImgDuration = 0;
    }

    /**
     * Method to make the character jump on an enemy.
     * Adjusts the vertical speed for a controlled jump on the enemy.
     */
    jumpOnEnemy() {
        this.speedY = this.jumpSpeedY / 2;
    }

    /**
     * Method to play the dead sound when the character dies.
     * Ensures the sound is played only once.
     */
    playDeadSound() {
        if (!this.charDead) {
            this.sound_dead.volume = this.sound_dead_volume;
            this.sound_dead.play();
            this.charDead = true;
        }
    }

    /**
     * Method to play the jump sound when the character jumps.
     */
    playJumpSound() {
        this.jump_sound.play();
    }

    /**
     * Method to check the current throw direction and create a throwable object accordingly.
     * @returns {ThrowableObject} - The throwable object in the current throw direction.
     */
    checkCurrentThrowDirection() {
        let bottle;
        if (this.otherDirection) {
            bottle = new ThrowableObject((this.x - 10), (this.y + (this.height / 2 - 50)), true);
        } else {
            bottle = new ThrowableObject((this.x + 60), (this.y + (this.height / 2 - 50)), false);
        }
        return bottle;
    }

    /**
     * Method to play the walking animation when the character is moving.
     * Plays walking sound.
     */
    walk() {
        if ((this.world.keyboard.RIGHT || this.world.keyboard.LEFT) && !this.isDead()) {
            this.animateImages(this.IMAGES_WALKING);
            this.walkingSound();
        }
    }
}