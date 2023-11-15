class ThrowableObject extends MovableObject {
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

    constructor(x, y, otherDirection) {
        super().loadImage('./assets/img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES_BOTTLE_ROTATION);
        this.loadImages(this.IMAGES_BOTTLE_SPLASH);
        this.x = x;
        this.y = y;
        this.throw(x, y, otherDirection);
        this.animate();
    }

    animate() {
        this.animateInterval = setInterval(() => {
            this.animateImages(this.IMAGES_BOTTLE_ROTATION);
        }, 1000 / 8);
        this.pushToObjectInterval(this.animateInterval);
    }

    animateSplash() {
        this.splashInterval = setInterval(() => {
            this.animateImages(this.IMAGES_BOTTLE_SPLASH);
        }, 1000 / 8);
    }

    hit(enemy) {
        if (this.collision) {
            enemy.hit(this.damage);
            this.animateSplash();
        }
        this.stopBottleOnCollision();
    }

    hitGround() {
        if (this.collision) {
            this.animateSplash();
        }
        this.stopBottleOnCollision();
    }

    stopBottleOnCollision() {
        clearInterval(this.animateInterval);
        this.speedX = 0;
        this.speedY = 0;
        this.collision = false;
    }

    throw(x, y, otherDirection) {
        this.x = x;
        this.y = y;
        if (otherDirection) {
            this.speedX = -this.speedX;
        } //reverse bottle throw to left side
        this.applyGravity();
        setInterval(() => {
            this.x += this.speedX;
        }, 25);
    }
}