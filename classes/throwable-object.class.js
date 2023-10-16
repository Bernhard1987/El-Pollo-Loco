class ThrowableObject extends MovableObject {
    speedY = 16;
    speedX = 18;
    floorCoord = 350;
    world;

    constructor(x, y, otherDirection) {
        super().loadImage('./assets/img/6_salsa_bottle/salsa_bottle.png');
        this.x = x;
        this.y = y;
        this.throw(x, y, otherDirection);
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