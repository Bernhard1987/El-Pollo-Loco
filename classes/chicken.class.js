/**
 * Class representing the enemy "chicken" that extends MovableObject.
 */
class Chicken extends MovableObject {
    /**
    * @property {number} width - The width of the chicken.
     * @property {number} height - The height of the chicken.
     * @property {number} x - The x-coordinate of the chicken's initial position. Randomized between 500px.
     * @property {number} y - The y-coordinate of the chicken's initial position.
     * @property {number} offsetX - The offset along the x-axis.
     * @property {number} offsetY - The offset along the y-axis.
     * @property {number} collisionStartOffsetY - The offset to start collision along the y-axis.
     * @property {string[]} IMAGES_WALKING - Array of file paths for walking animation images.
     * @property {string[]} IMAGES_DEAD - Array of file paths for dead animation images.
     * @property {Audio} sound_enemy - Audio object for chicken sound.
     * @property {number} sound_enemy_volume - Volume level for the chicken sound.
     * @property {Audio} sound_dead - Audio object for dead sound.
     * @property {number} sound_dead_volume - Volume level for the dead sound.
     */
    width = 80;
    height = 80;
    x = Math.random() * 500;
    y = 362;
    offsetX = -10;
    offsetY = -25;
    collisionStartOffsetY = 5;

    IMAGES_WALKING = [
        './assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        './assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        './assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];

    IMAGES_DEAD = ['./assets/img/3_enemies_chicken/chicken_normal/2_dead/dead.png'];

    sound_enemy = new Audio('./assets/sound/chicken-short-cluck.mp3');
    sound_enemy_volume = 0.1;

    sound_dead = new Audio('./assets/sound/chicken-dead.mp3');
    sound_dead_volume = 0.1;

    /**
     * Constructor for the Chicken class.
     * Initializes properties, loads images, sets speed, and starts animations.
     * @param {number} additionalX - Additional x-coordinate adjustment for the chicken's starting position.
     */
    constructor(additionalX) {
        super().loadImage('./assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.speed = 0.25 + Math.random() * 0.25;
        this.x = this.x + additionalX;
        this.addChickenSound();
        this.playEnemySound();
        this.setSoundVolume();
        this.animate();
    }

    /**
     * Initiates the animation loop for the chicken.
     */
    animate() {
        this.moveLeft();
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
        if (rndNumber <= 0.33) {
            this.sound_enemy = new Audio('./assets/sound/chicken-short-cluck.mp3');
        } else if (rndNumber > 0.33 && rndNumber <= 0.66) {
            this.sound_enemy = new Audio('./assets/sound/chicken-bok2.mp3');
        } else if (rndNumber > 0.66) {
            this.sound_enemy = new Audio('./assets/sound/chicken-bok.mp3');
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
}