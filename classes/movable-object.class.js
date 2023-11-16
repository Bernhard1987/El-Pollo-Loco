/**
 * Class representing a movable object that extends DrawableObject.
 */

class MovableObject extends DrawableObject {
    /**
     * @property {number} offsetY - The offset along the y-axis used for collision detection.
     * @property {number} offsetX - The offset along the x-axis used for collision detection.
     * @property {number} collisionStartOffsetY - ensures that empty space in the upper area is skipped for collision detection
     * @property {number} collisionStartOffsetX - ensures that empty space in the left area is skipped for collision detection
     * @property {number} speed - The horizontal movement speed of the object.
     * @property {boolean} otherDirection - Flag indicating if the object is moving in the opposite direction.
     * @property {number} speedY - The vertical speed of the object.
     * @property {number} jumpSpeedY - The vertical speed when jumping.
     * @property {number} acceleration - The acceleration due to gravity.
     * @property {number} floorCoord - The y-coordinate of the floor or ground.
     * @property {number} health - The health points of the object.
     * @property {number} damage - The amount of damage the object deals on collision.
     * @property {number} lastHit - The timestamp of the last hit on the object.
     * @property {number} isHurtImgDuration - The duration of the hurt animation in seconds.
     * @property {boolean} walkingSoundPlayed - Flag indicating if the walking sound has been played.
     * @property {boolean} collision - Flag indicating if collision detection is enabled.
     * @property {boolean} soundOn - Flag indicating if sound is enabled.
     * @property {Audio} sound_enemy - Audio object for enemy sounds.
     * @property {number} sound_enemy_volume - Volume level for enemy sounds.
     * @property {Audio} sound_dead - Audio object for dead sounds.
     * @property {number} sound_dead_volume - Volume level for dead sounds.
     * @property {Audio} sound_attack - Audio object for attack sounds.
     * @property {number} sound_attack_volume - Volume level for attack sounds.
     * @property {Audio} sound_roar - Audio object for roar sounds.
     * @property {Audio} walking_sound - Audio object for walking sounds.
     * @property {Audio} walking_sound_2 - Additional audio object for walking sounds.
     * @property {number} walking_sound_volume - Volume level for walking sounds.
     * @property {Audio} jump_sound - Audio object for jump sounds.
     * @property {number} jump_sound_volume - Volume level for jump sounds.
     * @property {Audio} get_hit - Audio object for hit sounds.
     * @property {number} get_hit_volume - Volume level for hit sounds.
     * @property {Audio} collect_sound - Audio object for collect sounds.
     * @property {number} collect_sound_volume - Volume level for collect sounds.
     * @property {Array} objectIntervals - An array to store interval IDs for object-specific intervals.
     */
    offsetY = 0;
    offsetX = 0;
    collisionStartOffsetY = 0;
    collisionStartOffsetX = 0;
    speed = 0.075;
    otherDirection = false;
    speedY = 0;
    jumpSpeedY = 20;
    acceleration = 1;
    floorCoord = 100;
    health = 100;
    damage = 0.25;
    lastHit = 0;
    isHurtImgDuration = 1;

    walkingSoundPlayed = false;
    collision = true;
    soundOn = true;

    sound_enemy;
    sound_enemy_volume = 0.1;
    sound_dead;
    sound_dead_volume = 0.2;
    sound_attack;
    sound_attack_volume = 0.1;
    sound_roar;
    walking_sound;
    walking_sound_2;
    walking_sound_volume = 0.7;
    jump_sound;
    jump_sound_volume = 0.7; //0.7
    get_hit;
    get_hit_volume = 0.2; //0.2
    collect_sound;
    collect_sound_volume = 0.4;


    objectIntervals = [];

    /**
     * Initiates the application of gravity to the object.
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            } else {
                this.speedY = 0; //reset speedY to zero when not AboveGround
            }
        }, 1000 / 60);
    }

    /**
     * Animates through a given array of images.
     * @param {string[]} images - Array of file paths for the animation images.
     */
    animateImages(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * Adds the provided interval ID to the array of object intervals.
     * @param {number} intervalId - The ID of the interval to be added.
     */
    pushToObjectInterval(intervalId) {
        this.objectIntervals.push(intervalId);
    }

    /**
     * Checks if the object is above the ground.
     * @returns {boolean} True if the object is above the ground, false otherwise.
     */
    isAboveGround() {
        return this.y < this.floorCoord;
    }

    /**
     * Inflicts damage on the object based on the provided damage value.
     * Updates the health and lastHit properties accordingly.
     * @param {number} damage - The amount of damage to be inflicted.
     */
    hit(damage) {
        this.health -= damage;
        if (this.health < 0) {
            this.health = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Displays the dead image animation of the object.
     */
    showDeadImage() {
        this.animateImages(this.IMAGES_DEAD);
    }


    /**
     * Checks if the object is dead.
     * @returns {boolean} True if the object is dead, false otherwise.
     */
    isDead() {
        return this.health == 0;
    }

    /**
     * Checks if the object is currently in a hurt state based on the last hit timestamp and hurt animation duration.
     * @returns {boolean} True if the object is in a hurt state, false otherwise.
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; //difference in ms
        timepassed = timepassed / 1000 //difference in s
        return timepassed < this.isHurtImgDuration;
    }

    /**
    * Checks if the current object is colliding with the specified object.
    * Function drawFrame(ctx) in class DrawableObject uses the exactly same
    * formula to draw frames.
    *
    * @param {Object} obj - The object to check for collision with.
    * @returns {boolean} True if a collision is detected, false otherwise.
    */
    isColliding(obj) {
        // Berechnung des Kollisionsrahmens für das aktuelle Objekt
        const thisCollisionX = this.collisionStartOffsetX + (this.x - this.offsetX / 2);
        const thisCollisionY = this.collisionStartOffsetY + (this.y - this.offsetY / 2);
        const thisCollisionWidth = this.width + this.offsetX;
        const thisCollisionHeight = this.height + this.offsetY;

        // Berechnung des Kollisionsrahmens für das übergebene Objekt (obj)
        const objCollisionX = obj.collisionStartOffsetX + (obj.x - obj.offsetX / 2);
        const objCollisionY = obj.collisionStartOffsetY + (obj.y - obj.offsetY / 2);
        const objCollisionWidth = obj.width + obj.offsetX;
        const objCollisionHeight = obj.height + obj.offsetY;

        // Kollisionsüberprüfung
        return (
            thisCollisionX + thisCollisionWidth >= objCollisionX &&
            thisCollisionX <= objCollisionX + objCollisionWidth &&
            thisCollisionY + thisCollisionHeight >= objCollisionY &&
            thisCollisionY <= objCollisionY + objCollisionHeight &&
            obj.collision
        );
    }

    /**
     * Sets the volume level for all sound-related properties based on the soundOn flag.
     * Checks each sound property and updates its volume accordingly.
     */
    setSoundVolume() {
        let soundVolumeInterval = setInterval(() => {
            if (!this.soundOn) {
                this.setSoundOff();
            } else {
                this.setSoundVolumes();
            }
        }, 1);
        this.pushToObjectInterval(soundVolumeInterval);
    }

    /**
     * Sets the volume level to 0 for all sound-related properties.
     */
    setSoundOff() {
        this.setSoundVolumeForAudio(this.sound_enemy, 0);
        this.setSoundVolumeForAudio(this.sound_dead, 0);
        this.setSoundVolumeForAudio(this.sound_attack, 0);
        this.setSoundVolumeForAudio(this.sound_roar, 0);
        this.setSoundVolumeForAudio(this.walking_sound, 0);
        this.setSoundVolumeForAudio(this.walking_sound_2, 0);
        this.setSoundVolumeForAudio(this.jump_sound, 0);
        this.setSoundVolumeForAudio(this.get_hit, 0);
        this.setSoundVolumeForAudio(this.collect_sound, 0);
    }

    /**
     * Sets the volume level for all sound-related properties based on the soundOn flag.
     * Checks each sound property and updates its volume accordingly.
     */
    setSoundVolumes() {
        this.setSoundVolumeForAudio(this.sound_enemy, this.sound_enemy_volume);
        this.setSoundVolumeForAudio(this.sound_dead, this.sound_dead_volume);
        this.setSoundVolumeForAudio(this.sound_attack, this.sound_attack_volume);
        this.setSoundVolumeForAudio(this.sound_roar, this.sound_enemy_volume);
        this.setSoundVolumeForAudio(this.walking_sound, this.walking_sound_volume);
        this.setSoundVolumeForAudio(this.walking_sound_2, this.walking_sound_volume);
        this.setSoundVolumeForAudio(this.jump_sound, this.jump_sound_volume);
        this.setSoundVolumeForAudio(this.get_hit, this.get_hit_volume);
        this.setSoundVolumeForAudio(this.collect_sound, this.collect_sound_volume);
    }

    /**
     * Sets the volume level for a specific audio property.
     * @param {Audio} audio - The audio object for which to set the volume.
     * @param {number} volume - The volume level to set.
     */
    setSoundVolumeForAudio(audio, volume) {
        if (audio instanceof Audio) {
            audio.volume = volume;
        }
    }

    /**
     * Moves the object to the right based on its speed property.
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * Moves the object to the left based on its speed property.
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Initiates a jump by setting the vertical speed to the jump speed.
     */
    jump() {
        this.speedY = this.jumpSpeedY;
    }

    /**
     * Plays a walking sound based on the walkingSoundPlayed flag.
     * Alternates between two walking sounds.
     */
    walkingSound() {
        if (!this.walkingSoundPlayed) {
            this.walking_sound.play();
            this.walkingSoundPlayed = true;
        } else {
            this.walking_sound_2.play();
            this.walkingSoundPlayed = false;
        }
    }
}