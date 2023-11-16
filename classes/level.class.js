/**
 * Class representing a game level.
 */

class Level {
    /**
     * @property {Array} enemies - An array of enemies in the level.
     * @property {Array} clouds - An array of clouds in the level.
     * @property {Array} backgroundObjects - An array of background objects in the level.
     * @property {Array} collectableObjects - An array of collectable objects in the level.
     * @property {number} level_end_x - The x-coordinate at which the level ends.
     */
    enemies;
    clouds;
    backgroundObjects;
    collectableObjects;

    level_end_x = 720 * 6;

    /**
     * Constructor for the Level class.
     * Initializes the arrays of enemies, clouds, background objects, and collectable objects.
     * @param {Array} enemies - An array of enemies in the level.
     * @param {Array} clouds - An array of clouds in the level.
     * @param {Array} backgroundObjects - An array of background objects in the level.
     * @param {Array} collectableObjects - An array of collectable objects in the level.
     */

    constructor(enemies, clouds, backgroundObjects, collectableObjects) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.collectableObjects = collectableObjects;
    }
}