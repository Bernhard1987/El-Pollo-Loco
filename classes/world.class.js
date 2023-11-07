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
    statusBarBoss = new StatusBarBoss;
    statusBarBossSymbol = new StatusBarBossSymbol;

    collectedCoinsCount = 0;
    collectedBottlesCount = 0;
    maxItemCount = 10;

    bossTriggerXCoord = 3200;

    background_music = new Audio('./assets/sound/bgm.mp3');
    bgm_volume = 0.1;

    soundOn = true;

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
            this.startBossFight();
        }, 1000 / 60);
        setInterval(() => {
            this.checkThrowObjects();
        }, 1000 / 6);
    }

    checkCollisionsEnemy() {
        for (let i = 0; i < this.level.enemies.length; i++) {
            const enemy = this.level.enemies[i];
            if (this.character.isColliding(enemy)) {
                this.checkTypeOfHit(enemy, i);
                this.statusBarHealth.setPercentage(this.character.health);
            }
            this.checkCollisionsThrowableObjects(enemy, i);
        }
    }

    checkTypeOfHit(enemy, i) {
        if (this.character.speedY >= 0 && enemy.damage > 0) {
            this.typeGetHit();
        } else if (this.hitJumpyEnemy(enemy) || this.hitEnemyOnGround(enemy)) { // wenn speedY negativ ist und enemy kein Endboss ist
            // setTimeout(() => {
                enemy.damage = 0;
                this.typeJumpOnEnemy(enemy, i);
            // }, 0.01);
        }
    }

    hitJumpyEnemy(enemy) {
        return (enemy.speedY > 0 && this.character.speedY < 0 && !(enemy instanceof Endboss));
    }

    hitEnemyOnGround(enemy) {
        return (this.character.speedY < 0 && enemy.speedY == 0 && !(enemy instanceof Endboss));
    }

    typeGetHit() {
        this.character.hit();
        this.character.get_hit.volume = this.character.get_hit_volume;
        this.character.get_hit.play();
    }

    typeJumpOnEnemy(enemy, i) {
        enemy.health = 0;
        enemy.damage = 0;
        this.character.jumpOnEnemy();
        this.destroyEnemy(enemy, i);
    }

    destroyEnemy(enemy, i) {
        if (enemy.isDead()) {
            this.stopAllObjectIntervals(enemy);
            enemy.playSoundDead();
            enemy.showDeadImage();
            setTimeout(() => {
                this.level.enemies.splice(i, 1);
                console.log('enemy deleted:', enemy);
            }, 200);
        }
    }

    stopAllObjectIntervals(enemy) {
        enemy.objectIntervals.forEach(interval => {
            clearInterval(interval);
        });
    }

    checkCollisionsCollectableObjects() {
        for (let i = 0; i < this.level.collectableObjects.length; i++) {
            const collectableObject = this.level.collectableObjects[i];
            if (this.character.isColliding(collectableObject)) {
                this.increaseItemCount(collectableObject, i);
            }
        };
    }

    increaseItemCount(collectableObject, indexOfObject) {
        this.increaseItemBottle(collectableObject, indexOfObject);
        this.increaseItemCoin(collectableObject, indexOfObject);
    }

    increaseItemBottle(collectableObject, indexOfObject) {
        if (collectableObject instanceof CollectableBottle && this.collectedBottlesCount < this.maxItemCount) {
            this.collectedBottlesCount++;
            this.actionsAfterItemPickup(this.statusBarBottle, this.collectedBottlesCount, collectableObject, indexOfObject);
        }
    }

    increaseItemCoin(collectableObject, indexOfObject) {
        if (collectableObject instanceof CollectableCoin && this.collectedCoinsCount < this.maxItemCount) {
            this.collectedCoinsCount++;
            this.actionsAfterItemPickup(this.statusBarCoin, this.collectedCoinsCount, collectableObject, indexOfObject);;
        }
    }

    actionsAfterItemPickup(statusbar, actualItemCounter, collectableObject, indexOfObject) {
        collectableObject.hit();
        this.actualiseStatusBar(statusbar, actualItemCounter, this.maxItemCount);
        this.level.collectableObjects.splice(indexOfObject, 1);
        console.log('Coins collected: ', this.collectedCoinsCount, this.statusBarCoin.percentage, 'Bottles collected: ', this.collectedBottlesCount, this.statusBarBottle.percentage);
    }

    /**
     * Calculates actual percentage of current status bar.
     * calls setPercentage for current status bar class.
     * @param {string} statusBarType select current status bar from global world variables
     * @param {number} actualCount current count of status bar
     * @param {number} maxCount max count of status bar
     */

    actualiseStatusBar(statusBarType, actualCount, maxCount) {
        let statusBarPercentage = 100 / maxCount * actualCount;
        statusBarType.setPercentage(statusBarPercentage);
    }

    actualiseBossStatusBar(enemy) {
        if (enemy instanceof Endboss) {
            this.actualiseStatusBar(this.statusBarBoss, enemy.health, enemy.maxHealth);
        }
    }


    checkCollisionsThrowableObjects(enemy, indexEnemy) {
        for (let i = 0; i < this.throwableObjects.length; i++) {
            const bottle = this.throwableObjects[i];
            if (bottle.isColliding(enemy)) {
                bottle.hit();
                enemy.health = enemy.health - bottle.damage;
                this.throwableObjects.splice(bottle, 1);
                this.actualiseBossStatusBar(enemy);
                this.destroyEnemy(enemy, indexEnemy);
            }
        }
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
            this.actualiseStatusBar(this.statusBarBottle, this.collectedBottlesCount, 10);
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
        this.insertMovableObjects();
        this.addToMap(this.character);
        this.insertFixedObjects();
        this.ctx.translate(-this.camera_x, 0);
        this.background_music.volume = this.bgm_volume;
        //this.background_music.play();

        //draw() wird immer wieder aufgerufen
        self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    insertMovableObjects() {
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.collectableObjects);
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.enemies);
    }

    insertFixedObjects() {
        this.ctx.translate(-this.camera_x, 0); //set back "camera"-position for fixed objects
        /*insert all fixed objects here */
        this.addToMap(this.statusBarHealth);
        this.addToMap(this.statusBarCoin);
        this.addToMap(this.statusBarBottle);
        this.addToMap(this.statusBarBoss);
        this.addToMap(this.statusBarBossSymbol);
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

    startBossFight() {
        let boss = this.level.enemies.find((enemy) => enemy instanceof Endboss);
        if (boss instanceof Endboss && this.character.x >= this.bossTriggerXCoord && !boss.bossTriggered) {
            boss.bossTriggered = true;
            boss.triggerBoss();
        }
    }
}