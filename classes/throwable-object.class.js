/**
 * Class representing a throwable object, extending the MovableObject class.
 */
class ThrowableObject extends MovableObject {
    /**
     * @property {number} acceleration - The acceleration factor for the throwable object.
     * @property {number} speedY - The initial vertical speed of the throwable object.
     * @property {number} speedX - The horizontal speed of the throwable object.
     * @property {number} offsetX - The offset along the x-axis.
     * @property {number} offsetY - The offset along the y-axis.
     * @property {number} floorCoord - The y-coordinate threshold at which the object collides with the ground.
     * @property {number} damage - The damage inflicted upon collision with an enemy.
     * @property {number} animateInterval - The interval for animating the rotation of the throwable object.
     * @property {number} splashInterval - The interval for animating the splash effect upon collision.
     * @property {string[]} IMAGES_BOTTLE_ROTATION - Array of file paths for rotation animation images.
     * @property {string[]} IMAGES_BOTTLE_SPLASH - Array of file paths for splash animation images.
     */
    acceleration = 0.9;
    speedY = 20;
    speedX = 11;
    offsetX = -80;
    offsetY = -24;
    floorCoord = 350;
    damage = 100;

    animateInterval;
    splashInterval;

    IMAGES_BOTTLE_ROTATION = [
        './assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        './assets/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        './assets/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        './assets/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    IMAGES_BOTTLE_SPLASH = [
        './assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        './assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        './assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        './assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png'
    ];

    /**
     * Constructor for the ThrowableObject class.
     * Initializes properties, loads images, sets initial position, and starts animations.
     *
     * @param {number} x - The initial x-coordinate of the throwable object.
     * @param {number} y - The initial y-coordinate of the throwable object.
     * @param {boolean} otherDirection - Indicates whether the throwable object should be thrown in the opposite direction.
     */
    constructor(x, y, otherDirection) {
        super().loadImage('./assets/img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES_BOTTLE_ROTATION);
        this.loadImages(this.IMAGES_BOTTLE_SPLASH);
        this.x = x;
        this.y = y;
        this.throw(x, y, otherDirection);
        this.animate();
    }

    /**
     * Initiates the rotation animation loop for the throwable object.
     */
    animate() {
        this.animateInterval = setInterval(() => {
            this.animateImages(this.IMAGES_BOTTLE_ROTATION);
        }, 1000 / 8);
        this.pushToObjectInterval(this.animateInterval);
    }

    /**
     * Initiates the splash animation loop for the throwable object.
     */
    animateSplash() {
        this.splashInterval = setInterval(() => {
            this.animateImages(this.IMAGES_BOTTLE_SPLASH);
        }, 1000 / 8);
    }

    /**
     * Handles the collision of the throwable object with an enemy.
     *
     * @param {object} enemy - The enemy object with which the throwable object collides.
     */
    hit(enemy) {
        if (this.collision) {
            enemy.hit(this.damage);
            this.animateSplash();
        }
        this.stopBottleOnCollision();
    }

    /**
     * Handles the collision of the throwable object with the ground.
     */
    collidesGround() {
        if (this.collision) {
            this.animateSplash();
        }
        this.stopBottleOnCollision();
    }

    /**
     * Stops the throwable object and initiates the splash animation upon collision.
     */
    stopBottleOnCollision() {
        clearInterval(this.animateInterval);
        this.speedX = 0;
        this.speedY = 0;
        this.collision = false;
    }

    /**
     * Throws the object horizontally from a specified position.
     *
     * @param {number} x - The initial x-coordinate of the throwable object.
     * @param {number} y - The initial y-coordinate of the throwable object.
     * @param {boolean} otherDirection - Indicates whether the throwable object should be thrown in the opposite direction.
     */
    throw(x, y, otherDirection) {
        this.x = x;
        this.y = y;
        if (otherDirection) {
            this.speedX = -this.speedX;
        }
        this.applyGravity();
        setInterval(() => {
            this.x += this.speedX;
        }, 25);
    }
}