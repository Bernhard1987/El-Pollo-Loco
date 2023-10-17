class Level {
    enemies;
    clouds;
    backgroundObjects;
    collectableObjects;

    level_end_x = 720 * 4;

    constructor(enemies, clouds, backgroundObjects, collectableObjects) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.collectableObjects = collectableObjects;
    }
}