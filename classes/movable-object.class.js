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
    
    setSoundVolumeForAudio(audio, volume) {
        if (audio instanceof Audio) {
            audio.volume = volume;
        }
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