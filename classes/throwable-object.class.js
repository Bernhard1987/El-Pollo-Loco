class ThrowableObject extends MovableObject {
    speedY = 30;
    speedX = 20;

    constructor() {
        super().loadImage('./assets/img/6_salsa_bottle/salsa_bottle.png');
        this.x = 100;
        this.y = 100;
    }

    throw() {
        this.world.throwableObjects += new Bottle;
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 60);
    }
}