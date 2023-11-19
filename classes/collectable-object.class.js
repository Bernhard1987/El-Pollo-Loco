/**
 * Class representing a collectable object that extends MovableObject.
 */
class CollectableObject extends MovableObject {
    /**
     * @property {number} collectedBottlesCount - The count of collected bottles.
     * @property {number} collectedCoinsCount - The count of collected coins.
     * @property {Audio} collect_sound - Audio object for the collect sound of the object.
     * @property {number} collect_sound_volume - Volume level for the collect sound of the object.
     */
    collectedBottlesCount = 0;
    collectedCoinsCount = 0;

    collect_sound = new Audio('./assets/sound/pickup.mp3');
    collect_sound_volume = 0.4;

    /**
     * Constructor for the CollectableObject class.
     * Initializes properties, sets the sound volume, and calls the constructor of the parent class.
     */
    constructor() {
        super();
        this.setSoundVolume();
    }

    /**
     * Plays the collect sound when the object is hit.
     */
    hit() {
        this.collect_sound.play();
    }
}