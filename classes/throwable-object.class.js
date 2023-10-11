class ThrowableObject extends MovableObject {
    speedY = 16;
    speedX = 18;
    floorCoord = 350;

    constructor(x, y) {
        super().loadImage('./assets/img/6_salsa_bottle/salsa_bottle.png');
        this.x = x;
        this.y = y;
        this.throw(x, y);
    }

    throw(x, y) {
        this.x = x;
        this.y = y;
        // if (character.otherDirection) {
        //     this.speedY = -this.speedY;
        //     this.speedX = -this.speedX;
        // } reverse bottle throw to left side
        this.applyGravity();
        setInterval(() => {
            this.x += this.speedX;
        }, 25);
    }
}