class ThrowableObject extends MovableObject {
    acceleration = 0.9;
    speedY = 12;
    speedX = 18;
    offsetX = -80;
    offsetY = -24;
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