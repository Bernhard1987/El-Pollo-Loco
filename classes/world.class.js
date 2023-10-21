class World {
    character = new Character();
    throwableObjects = [];
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 100;
    statusBarHealth = new StatusBarHealth;
    statusBarCoin = new StatusBarCoin;
    statusBarBottle = new StatusBarBottle;
    collectedCoinsCount = 0;
    collectedBottlesCount = 0;

    background_music = new Audio('./assets/sound/bgm.mp3');
    bgm_volume = 0;

    //boss_sound_x_coord = 1828; //play boss sound when character gets near of it

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            this.checkCollisionsCollectableObjects();
            this.checkCollisionsEnemy();
        }, 1000 / 60);
        setInterval(() => {
            this.checkThrowObjects();
        }, 1000 / 6); //allows only 2 bottle throws per second
    }

    checkCollisionsEnemy() {
        for (let i = 0; i < this.level.enemies.length; i++) {
            const enemy = this.level.enemies[i];
            if (this.character.isColliding(enemy)) {
                this.checkTypeOfHit(enemy, i);
                this.statusBarHealth.setPercentage(this.character.health);
            }
        }
    }

    checkTypeOfHit(enemy, i) {
        if (this.character.speedY >= 0 ) {
            this.character.hit();
            // this.character.throwBackCharacter(); -> buggy w camera, might use acceleration
            this.character.get_hit.volume = this.character.get_hit_volume;
            this.character.get_hit.play();
        } else if (this.character.speedY < 0 && !(enemy instanceof Endboss)){ // wenn speedY negativ ist und enemy kein Endboss ist
            this.destroyEnemy(i);
        }
    }

    destroyEnemy(enemy) {
        this.level.enemies.splice(enemy, 1);
    }

    checkCollisionsCollectableObjects() {
        for (let i = 0; i < this.level.collectableObjects.length; i++) {
            const collectableObject = this.level.collectableObjects[i];
            if (this.character.isColliding(collectableObject)) {
                collectableObject.hit();
                this.increaseItemCount(collectableObject); //allow max. 10 items for coins/bottles
                console.log('Coins collected: ', this.collectedCoinsCount, this.statusBarCoin.percentage, 'Bottles collected: ', this.collectedBottlesCount, this.statusBarBottle.percentage);
                this.level.collectableObjects.splice(collectableObject, 1);
            }
        };
    }

    increaseItemCount(collectableObject) {
        if (collectableObject instanceof CollectableBottle) {
            this.collectedBottlesCount++;
            this.actualiseStatusBar(this.statusBarBottle, this.collectedBottlesCount);
        }
        if (collectableObject instanceof CollectableCoin) {
            this.collectedCoinsCount++;
            this.actualiseStatusBar(this.statusBarCoin, this.collectedCoinsCount);
        }
    }

    actualiseStatusBar(statusBarType, collectedCount) {
        let statusBarPercentage = 100 / 10 * collectedCount;
        statusBarType.setPercentage(statusBarPercentage);
    }

/**
 * Checks if the SPACE key is pressed and if there are collected bottles available. 
 * If both conditions are met, it throws a bottle, decrements the collected bottles count,
 * and updates the status bar with the new count.
 */

    checkThrowObjects() {
        if (this.keyboard.SPACE && this.collectedBottlesCount > 0) {
            this.throwBottle();
            this.collectedBottlesCount--;
            this.actualiseStatusBar(this.statusBarBottle, this.collectedBottlesCount);
        }
    }

    throwBottle() {
        let bottle = this.checkCurrentThrowDirection();
        bottle.world = this;
        console.log(bottle);
        this.throwableObjects.push(bottle);
    }

    checkCurrentThrowDirection() {
        let bottle;
        if (this.character.otherDirection) {
            bottle = new ThrowableObject((this.character.x - 10), (this.character.y + (this.character.height / 2 - 50)), true);
        } else {
            bottle = new ThrowableObject((this.character.x + 60), (this.character.y + (this.character.height / 2 - 50)), false);
        }
        return bottle;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);

        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.collectableObjects);
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.enemies);
        this.addToMap(this.character);

        this.insertFixedObjects();

        this.ctx.translate(-this.camera_x, 0);
        this.background_music.volume = this.bgm_volume;
        //this.background_music.play();
        // this.playBossSound();

        //draw() wird immer wieder aufgerufen
        self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    insertFixedObjects() {
        this.ctx.translate(-this.camera_x, 0); //set back "camera"-position for fixed objects
        /*insert all fixed objects here */
        this.addToMap(this.statusBarHealth);
        this.addToMap(this.statusBarCoin);
        this.addToMap(this.statusBarBottle);
        this.ctx.translate(this.camera_x, 0); //set forward "camera"-position for fixed objects after draw -> Object will keep position
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    playBossSound() {
        if (this.character.x == this.boss_sound_x_coord) {
            this.world.Endboss.sound_endboss_dead.volume = this.world.Endboss.sound_endboss_dead_volume;
            this.world.Endboss.sound_endboss_dead.play();
        }
    }
}