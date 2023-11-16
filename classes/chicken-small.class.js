/**
 * Class representing the enemy "small chicken" that extends MovableObject.
 */

class ChickenSmall extends MovableObject {
    /**
     * @property {number} width - The width of the chicken.
     * @property {number} height - The height of the chicken.
     * @property {number} x - The x-coordinate of the chicken's initial position.
     * @property {number} y - The y-coordinate of the chicken's initial position.
     * @property {number} offsetX - The offset along the x-axis.
     * @property {number} offsetY - The offset along the y-axis.
     * @property {number} collisionStartOffsetY - The offset to start collision along the y-axis.
     * @property {number} jumpSpeedY - The speed of the chicken's jump along the y-axis.
     * @property {number} floorCoord - The y-coordinate of the floor.
     * @property {number} damage - The damage value of the chicken.
     * @property {string[]} IMAGES_WALKING - Array of file paths for walking animation images.
     * @property {string[]} IMAGES_DEAD - Array of file paths for dead animation images.
     * @property {Audio} sound_enemy - Audio object for chicken sound.
     * @property {number} sound_enemy_volume - Volume level for the chicken sound.
     * @property {Audio} sound_dead - Audio object for dead sound.
     * @property {number} sound_dead_volume - Volume level for the dead sound.
     * @property {Audio} sound_attack - Audio object for attack sound.
     * @property {number} sound_attack_volume - Volume level for the attack sound.
     */
    width = 60;
    height = 60;
    x = 900 + Math.random() * 500;
    y = 383;
    offsetX = -10;
    offsetY = -25;
    collisionStartOffsetY = 0;
    jumpSpeedY = 25;
    floorCoord = 370;
    damage = 0.35;

    IMAGES_WALKING = [
        './assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        './assets/img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        './assets/img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    IMAGES_DEAD = ['./assets/img/3_enemies_chicken/chicken_small/2_dead/dead.png'];

    sound_enemy = new Audio('./assets/sound/chirp.mp3');
    sound_enemy_volume = 0.1; //0.1

    sound_dead = new Audio('./assets/sound/small_chicken_dead.mp3');
    sound_dead_volume = 0.2; //0.3

    sound_attack = new Audio('./assets/sound/angry_bird_attack.mp3');
    sound_attack_volume = 0.1; //0.1

    /**
     * Constructor for the ChickenSmall class.
     * Initializes properties, loads images, sets speed, and starts animations.
     */

    constructor() {
        super().loadImage('./assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.speed = 0.5 + Math.random() * 0.5;
        this.addChickenSound();
        this.playEnemySound();
        this.setSoundVolume();
        this.applyGravity(this.floor);
        this.animate();
    }

    /**
     * Initiates the animation loop for the chicken.
     */

    animate() {
        this.moveLeft();
        this.jump();
        this.animateWalking();
    }

    /**
     * Moves the chicken to the left at a regular interval.
     */

    moveLeft() {
        let moveLeft = setInterval(() => {
            super.moveLeft();
        }, 1000 / 60);
        this.pushToObjectInterval(moveLeft);
    }

    /**
     * Makes the chicken jump at random intervals, playing attack sound.
     */

    jump() {
        let soundEnemyInterval = setInterval(() => {
            super.jump();
            this.playSoundAttack();
        }, 3000 + (Math.random() * 3000));
        this.pushToObjectInterval(soundEnemyInterval);
    }

    /**
     * Animates the walking images of the chicken at a regular interval.
     */

    animateWalking() {
        let animateWalking = setInterval(() => {
            this.animateImages(this.IMAGES_WALKING);
        }, 1000 / 6);
        this.pushToObjectInterval(animateWalking);
    }

    /**
     * Randomly selects a chicken sound and assigns it to sound_enemy.
     */

    addChickenSound() {
        let rndNumber = Math.random();
        if (rndNumber <= 0.5) {
            this.sound_enemy = new Audio('./assets/sound/chirp.mp3');
        } else if (rndNumber > 0.5) {
            this.sound_enemy = new Audio('./assets/sound/chirp2.mp3');
        }
    }

    /**
     * Plays the chicken sound at random intervals.
     */

    playEnemySound() {
        let soundEnemyInterval = setInterval(() => {
            this.sound_enemy.play();
        }, (5000 + (Math.random() * 15000)));
        this.pushToObjectInterval(soundEnemyInterval);
    }

    /**
     * Plays the dead sound of the chicken.
     */

    playSoundDead() {
        this.sound_dead.play();
    }

    /**
     * Plays the attack sound of the chicken.
     */

    playSoundAttack() {
        this.sound_attack.play();
    }
}