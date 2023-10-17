class CollectableBottle extends CollectableObject {
    width = 90;
    height = 90;

    constructor(x, y) {
        super().loadImage(`./assets/img/6_salsa_bottle/${this.selectRandomBottleDirection()}_salsa_bottle_on_ground.png`);
        this.x = x;
        this.y = y;
    }

    hit() {
        this.collectedItems += 1;
        console.log('bottle collected:', this.collectedItems);
    }

    selectRandomBottleDirection() {
        let randomNumber = Math.random();
        let bottleNumber;
        if (randomNumber >= 0.5) {
            bottleNumber = 1;
        } else {
            bottleNumber = 2;
        }
        return bottleNumber;
    }
}