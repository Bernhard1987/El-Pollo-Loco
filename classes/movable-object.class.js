class MovableObject extends DrawableObject {
    offsetY = 0; //used for collision detection
    offsetX = 0;
    collisionStartOffsetY = 0; //ensures that empty space in the upper area is skipped for collision detection
    collisionStartOffsetX = 0;//ensures that empty space in the left area is skipped for collision detection
    speed = 0.075;
    otherDirection = false;
    speedY = 0;
    jumpSpeedY = 20;
    acceleration = 1;
    floorCoord = 100;
    health = 100;
    damage = 0.25;
    lastHit = 0;
    isHurtImgDuration = 1; //duration of hurt animation in seconds

    walkingSoundPlayed = false;
    collision = true;
    soundOn = true;

    sound_enemy = new Audio('./assets/sound/chirp.mp3');
    sound_enemy_volume = 0.1;
    sound_dead = new Audio('./assets/sound/chirp.mp3');
    sound_dead_volume = 0.2;
    sound_attack = new Audio('./assets/sound/chirp.mp3');
    sound_attack_volume = 0.1;
    sound_roar = new Audio('./assets/sound/chirp.mp3');
    walking_sound = new Audio('./assets/sound/chirp.mp3');
    walking_sound_2 = new Audio('./assets/sound/chirp.mp3');
    walking_sound_volume = 0.7;
    jump_sound = new Audio('./assets/sound/chirp.mp3');
    jump_sound_volume = 0.7; //0.7
    get_hit = new Audio('./assets/sound/chirp.mp3');
    get_hit_volume = 0.2; //0.2
    collect_sound = new Audio('./assets/sound/chirp.mp3');
    collect_sound_volume = 0.4;


    objectIntervals = [];

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

    animateImages(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    pushToObjectInterval(intervalId) {
        this.objectIntervals.push(intervalId);
    }

    isAboveGround() {
        // if (this instanceof Character && this.health <= 0) {
        //     this.speedY = this.jumpSpeedY() / 2; //what to do after character is dead
        //     this.floorCoord = 200;
        // }
        if (this instanceof ThrowableObject) { //apply ThrowableObject falling through ground, may be removed later for bottle splash on ground
            return true;
        } else {
            return this.y < this.floorCoord; //leave this if splash on ground/enemy added
        }
    }

    hit(damage) {
        this.health -= damage;
        if (this.health < 0) {
            this.health = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    showDeadImage() {
            this.animateImages(this.IMAGES_DEAD);
    }

    isDead() {
        return this.health == 0;
    }

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

    setSoundOff() {
        this.sound_enemy.volume = 0;
        this.sound_dead.volume = 0;
        this.sound_attack.volume = 0;
        this.sound_roar.volume = 0;
        this.walking_sound.volume = 0;
        this.walking_sound_2.volume = 0;
        this.jump_sound.volume = 0;
        this.get_hit.volume = 0;
        this.collect_sound.volume = 0;
    }

    setSoundVolumes() {
        this.sound_enemy.volume = this.sound_enemy_volume;
        this.sound_dead.volume = this.sound_dead_volume;
        this.sound_attack.volume = this.sound_attack_volume;
        this.sound_roar.volume = this.sound_enemy_volume;
        this.walking_sound.volume = this.walking_sound_volume;
        this.walking_sound_2.volume = this.walking_sound_volume;
        this.jump_sound.volume = this.jump_sound_volume;
        this.get_hit.volume = this.get_hit_volume;
        this.collect_sound.volume = this.collect_sound_volume;
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    jump() {
        this.speedY = this.jumpSpeedY;
    }

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