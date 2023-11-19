/**
 * Class representing a collectable salsa bottle that extends CollectableObject.
 */
class CollectableBottle extends CollectableObject {
    /**
     * @property {number} width - The width of the salsa bottle.
     * @property {number} height - The height of the salsa bottle.
     * @property {number} offsetY - The offset along the y-axis.
     * @property {number} offsetX - The offset along the x-axis.
     * @property {number} collisionStartOffsetY - The offset to start collision along the y-axis.
     */
    width = 90;
    height = 90;
    offsetY = -20;
    offsetX = -50;
    collisionStartOffsetY = 5;

    /**
    * Constructor for the CollectableBottle class.
    * Initializes properties, loads the salsa bottle image, sets position, and selects a random bottle direction.
    * @param {number} x - The x-coordinate of the salsa bottle's position.
    * @param {number} y - The y-coordinate of the salsa bottle's position.
    */

    constructor(x, y) {
        super().loadImage(`./assets/img/6_salsa_bottle/${this.selectRandomBottleDirection()}_salsa_bottle_on_ground.png`);
        this.x = x;
        this.y = y;
    }

    /**
     * Selects a random bottle direction and sets the collision offset accordingly.
     * @returns {number} - The randomly selected number  for bottle image (1 or 2).
     */

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