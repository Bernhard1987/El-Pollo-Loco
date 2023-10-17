class CollectableBottle extends CollectableObject {
    width = 90;
    height = 90;
    offsetY = -20;
    offsetX = -50;
    collisionStartOffsetY = 5;

    constructor(x, y) {
        super().loadImage(`./assets/img/6_salsa_bottle/${this.selectRandomBottleDirection()}_salsa_bottle_on_ground.png`);
        this.x = x;
        this.y = y;
    }

    selectRandomBottleDirection() {
        let randomNumber = Math.random();
        let bottleNumber;
        if (randomNumber >= 0.5) {
            bottleNumber = 1;
            this.collisionStartOffsetX = 10;
        } else {
            bottleNumber = 2;
            this.collisionStartOffsetX = 0;
        }
        return bottleNumber;
    }
}