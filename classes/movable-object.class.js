class MovableObject extends DrawableObject {
    offsetY = 0; //used for collision detection
    speed = 0.075;
    otherDirection = false;
    speedY = 0;
    jumpSpeedY = 20;
    acceleration = 1;
    floorCoord = 100;
    health = 100;
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
            this.jump();
        }
        if (this instanceof ThrowableObject) { //apply ThrowableObject falling through ground, may be removed later for bottle splash on ground
            return true;
        } else {
            return this.y < this.floorCoord; //leave this if splash on ground/enemy added
        }
    }

    hit() {
        this.health -= 5;
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
        return (this.x + this.width) >= obj.x && this.x <= (obj.x + obj.width) &&
            (this.y + this.offsetY + this.height) >= obj.y &&
            (this.y + this.offsetY) <= (obj.y + obj.height);
        // && obj.onCollisionCourse; // Optional: hiermit könnten wir schauen, ob ein Objekt sich in die richtige Richtung bewegt. Nur dann kollidieren wir. Nützlich bei Gegenständen, auf denen man stehen kann.
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