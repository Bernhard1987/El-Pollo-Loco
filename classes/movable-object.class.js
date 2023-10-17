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

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 60);
    }

    animateImages(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    isAboveGround() {
        if (this instanceof Character && this.health <= 0) {
            this.jump(); //what to do after character is dead
        }
        if (this instanceof ThrowableObject) { //apply ThrowableObject falling through ground, may be removed later for bottle splash on ground
            return true;
        } else {
            return this.y < this.floorCoord; //leave this if splash on ground/enemy added
        }
    }

    hit() {
        this.health -= this.damage;
        if (this.health < 0) {
            this.health = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isDead() {
        return this.health == 0;
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; //difference in ms
        timepassed = timepassed / 1000 //difference in s
        return timepassed < this.isHurtImgDuration;
    }

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
            thisCollisionY <= objCollisionY + objCollisionHeight
        );
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
}