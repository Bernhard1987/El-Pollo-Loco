/**
 * Represents the game world where the game objects and logic are managed.
 */
class World {
    /**
     * @property {Character} character - The player character.
     * @property {ThrowableObject[]} throwableObjects - Array of throwable objects.
     * @property {Level} level - The current game level.
     * @property {HTMLCanvasElement} canvas - The game canvas element.
     * @property {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas.
     * @property {Keyboard} keyboard - The keyboard input handler.
     * @property {number} camera_x - The x-coordinate of the camera position.
     * @property {StatusBarHealth} statusBarHealth - The health status bar.
     * @property {StatusBarCoin} statusBarCoin - The coin status bar.
     * @property {StatusBarBottle} statusBarBottle - The bottle status bar.
     * @property {StatusBarBoss} statusBarBoss - The boss health status bar.
     * @property {StatusBarBossSymbol} statusBarBossSymbol - The boss symbol status bar.
     * @property {number} collectedCoinsCount - The count of collected coins.
     * @property {number} collectedBottlesCount - The count of collected bottles.
     * @property {number} maxItemBottle - The maximum number of bottles that can be collected.
     * @property {number} maxItemCoin - The maximum number of coins that can be collected.
     * @property {number} bossTriggerXCoord - The x-coordinate to trigger the boss fight.
     * @property {Audio} background_music - The background music audio.
     * @property {Audio} music_won - The audio played when the game is won.
     * @property {Audio} music_lost - The audio played when the game is lost.
     * @property {number} bgm_volume - The volume level for background music.
     * @property {number} bgmInterval - The interval for updating background music volume.
     * @property {boolean} gameStarted - Indicates whether the game has started.
     * @property {boolean} musicOn - Indicates whether the music is enabled.
     * @property {boolean} soundOn - Indicates whether the sound effects are enabled.
     * 
     * @param {HTMLCanvasElement} canvas - The game canvas element.
     * @param {Keyboard} keyboard - The keyboard input handler.
     */
    character;
    throwableObjects = [];
    level;
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
    maxItemBottle = 10;
    maxItemCoin = 20;

    bossTriggerXCoord = 3200;

    background_music = new Audio('./assets/sound/bgm1.mp3');
    music_won = new Audio('./assets/sound/game_won.mp3');
    music_lost = new Audio('./assets/sound/game_lost.mp3');
    bgm_volume = 0.2;
    bgmInterval;

    gameStarted = false;
    musicOn = true;
    soundOn = true;

    constructor(canvas, keyboard) {
        let initLevel = setInterval(() => {
            if (this.gameStarted) {
                this.character = new Character();
                this.level = level1;
                this.ctx = canvas.getContext('2d');
                this.canvas = canvas;
                this.keyboard = keyboard;
                this.draw();
                this.setWorld();
                this.run();
                this.playBackgroundMusic();
                this.setObjectSounds();
                clearInterval(initLevel);
            }
        }, 100);
    }

    setWorld() {
        this.character.world = this;
    }

    /**
     * Runs the game loop, checking collisions and updating game state.
     */
    run() {
        setInterval(() => {
            this.checkCollisionsCollectableObjects();
            this.checkCollisionsEnemy();
            this.checkGroundCollisionThrowableObjects();
            this.startBossFight();
            this.checkEnemyPosition();
            this.character.checkAlive();
        }, 1000 / 60);
        setInterval(() => {
            this.checkThrowObjects();
        }, 1000 / 6);
    }

    /**
     * Plays the background music and updates its volume.
     */
    playBackgroundMusic() {
        this.bgmInterval = setInterval(() => {
            if (!this.musicOn) {
                this.background_music.volume = 0;
            } else {
                this.background_music.volume = this.bgm_volume;
            }
            this.background_music.play();
        }, 1);
    }

    /**
     * Sets sound effects for game objects.
     */
    setObjectSounds() {
        setInterval(() => {
            const toggleSound = (element) => element.soundOn = this.soundOn;
            this.level.enemies.forEach(toggleSound);
            this.level.collectableObjects.forEach(toggleSound);
            this.character.soundOn = this.soundOn;
        }, 1);
    }

    /**
     * Checks collisions with enemies and updates health status bar.
     */
    checkCollisionsEnemy() {
        for (let i = 0; i < this.level.enemies.length; i++) {
            const enemy = this.level.enemies[i];
            if (this.character.isColliding(enemy)) {
                this.checkTypeOfHit(enemy);
                this.statusBarHealth.setPercentage(this.character.health);
            }
            this.checkEnemyCollisionThrowableObjects(enemy, i);
        }
    }

    /**
     * Handles different types of hits on enemies based on game conditions.
     * @param {Enemy} enemy - The enemy being hit.
     */
    checkTypeOfHit(enemy) {
        if (this.character.speedY >= 0 && enemy.damage > 0) {
            this.typeGetHit(enemy);
        } else if (this.hitEnemyOnAir(enemy) || this.hitEnemyOnGround(enemy)) { // wenn speedY negativ ist und enemy kein Endboss ist
            setTimeout(() => {
                this.typeJumpOnEnemy(enemy);
            }, 1);
        }
    }

    /**
     * Checks if the player character is hitting an enemy in mid-air.
     *
     * @param {Enemy} enemy - The enemy being hit.
     * @returns {boolean} Returns true if the enemy is moving downward, the player is moving upward, and the enemy is not an instance of Endboss.
     */
    hitEnemyOnAir(enemy) {
        return (enemy.speedY > 0 && this.character.speedY < 0 && !(enemy instanceof Endboss));
    }

    /**
     * Checks if the player character is hitting an enemy on the ground.
     *
     * @param {Enemy} enemy - The enemy being hit.
     * @returns {boolean} Returns true if the player is moving upward, the enemy is stationary on the ground, and the enemy is not an instance of Endboss.
     */
    hitEnemyOnGround(enemy) {
        return (this.character.speedY < 0 && enemy.speedY == 0 && !(enemy instanceof Endboss));
    }

    /**
     * Handles the logic when the player character gets hit by an enemy.
     *
     * @param {Enemy} enemy - The enemy causing damage.
     */
    typeGetHit(enemy) {
        this.character.hit(enemy.damage);
        this.character.get_hit.play();
    }

    /**
     * Handles the logic when the player character jumps on an enemy.
     *
     * @param {Enemy} enemy - The enemy being jumped on.
     */
    typeJumpOnEnemy(enemy) {
        enemy.health = 0;
        enemy.damage = 0;
        this.character.jumpOnEnemy();
        this.destroyEnemy(enemy);
    }

    /**
     * Destroys the enemy and performs actions after the enemy is dead.
     *
     * @param {Enemy} enemy - The enemy to be destroyed.
     */
    destroyEnemy(enemy) {
        if (enemy.isDead()) {
            this.actionsAfterEnemyDead(enemy, true);
        }
        if (enemy.isDead() && enemy instanceof Endboss) {
            gameOver('bossDead');
        }
    }

    /**
     * Handles actions after an enemy is destroyed.
     * @param {Enemy} enemy - The destroyed enemy.
     * @param {boolean} playSoundDead - Indicates whether to play the dead sound.
     */
    actionsAfterEnemyDead(enemy, playSoundDead) {
        this.stopAllObjectIntervals(enemy);
        enemy.collision = false;
        if (playSoundDead) {
            enemy.playSoundDead();
        }
        enemy.showDeadImage();
        setTimeout(() => {
            const index = this.level.enemies.findIndex(e => e === enemy);
            if (index !== -1) {
                this.level.enemies.splice(index, 1);
            }
        }, 500);
    }

    /**
     * Stops all intervals associated with an enemy object.
     *
     * @param {Enemy} enemy - The enemy object for which intervals should be stopped.
     */
    stopAllObjectIntervals(enemy) {
        enemy.objectIntervals.forEach(interval => {
            clearInterval(interval);
        });
    }

    /**
     * Checks the position of enemies and performs enemy destroy actions if an Endboss escapes or any other enemy moves too far to the left.
     */
    checkEnemyPosition() {
        let enemies = this.level.enemies;
        enemies.forEach(enemy => {
            if (enemy instanceof Endboss && enemy.x <= -600) {
                this.actionsAfterEnemyDead(enemy, false);
                gameOver('bossEscaped');
            }
            if (!(enemy instanceof Endboss) && enemy.x <= -600) {
                this.actionsAfterEnemyDead(enemy, false);
            }
        });
    }

    /**
     * Checks collisions between the player character and collectable objects and increases item counts accordingly.
     */
    checkCollisionsCollectableObjects() {
        for (let i = 0; i < this.level.collectableObjects.length; i++) {
            const collectableObject = this.level.collectableObjects[i];
            if (this.character.isColliding(collectableObject)) {
                this.increaseItemCount(collectableObject, i);
            }
        };
    }

    /**
     * Increases the count of collectable items and triggers corresponding actions.
     *
     * @param {CollectableObject} collectableObject - The collectable object being picked up.
     * @param {number} indexOfObject - The index of the collectable object in the array.
     */
    increaseItemCount(collectableObject, indexOfObject) {
        this.increaseItemBottle(collectableObject, indexOfObject);
        this.increaseItemCoin(collectableObject, indexOfObject);
    }

    /**
     * Increases the count of bottles and triggers corresponding actions.
     *
     * @param {CollectableObject} collectableObject - The bottle object being picked up.
     * @param {number} indexOfObject - The index of the bottle object in the array.
     */
    increaseItemBottle(collectableObject, indexOfObject) {
        if (collectableObject instanceof CollectableBottle && this.collectedBottlesCount < this.maxItemBottle) {
            this.collectedBottlesCount++;
            this.actionsAfterItemPickup(this.statusBarBottle, this.collectedBottlesCount, collectableObject, indexOfObject, this.maxItemBottle);
        }
    }

    /**
     * Increases the count of coin items and triggers corresponding actions.
    *
    * @param {CollectableObject} collectableObject - The coin object being picked up.
    * @param {number} indexOfObject - The index of the coin object in the array.
    */
    increaseItemCoin(collectableObject, indexOfObject) {
        if (collectableObject instanceof CollectableCoin && this.collectedCoinsCount < this.maxItemCoin) {
            this.collectedCoinsCount++;
            this.actionsAfterItemPickup(this.statusBarCoin, this.collectedCoinsCount, collectableObject, indexOfObject, this.maxItemCoin);
        }
    }

    /**
     * Performs actions after picking up a collectable item, such as updating the status bar and removing the item from the level.
     *
     * @param {StatusBar} statusbar - The status bar associated with the type of collectable item.
     * @param {number} actualItemCounter - The current count of the collected item.
     * @param {CollectableObject} collectableObject - The collectable object that was picked up.
     * @param {number} indexOfObject - The index of the collectable object in the array.
     * @param {number} maxItemCount - The maximum count of the collectable item.
     */
    actionsAfterItemPickup(statusbar, actualItemCounter, collectableObject, indexOfObject, maxItemCount) {
        collectableObject.hit();
        this.actualiseStatusBar(statusbar, actualItemCounter, maxItemCount);
        this.level.collectableObjects.splice(indexOfObject, 1);
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

    /**
     * Updates the boss status bar based on the health and maximum health of the given enemy (if it is an instance of Endboss).
     *
     * @param {object} enemy - The enemy object, typically an instance of Endboss.
     */
    actualiseBossStatusBar(enemy) {
        if (enemy instanceof Endboss) {
            this.actualiseStatusBar(this.statusBarBoss, enemy.health, enemy.maxHealth);
        }
    }

    /**
     * Checks for collisions between throwable objects and a specific enemy, performing actions such as hitting the enemy and updating the boss status bar.
     *
     * @param {object} enemy - The enemy object being checked for collisions.
     * @param {number} indexEnemy - The index of the enemy in the array.
     */
    checkEnemyCollisionThrowableObjects(enemy, indexEnemy) {
        for (let i = 0; i < this.throwableObjects.length; i++) {
            const bottle = this.throwableObjects[i];
            if (bottle.isColliding(enemy)) {
                bottle.hit(enemy);
                this.deleteBottle(bottle);
                this.actualiseBossStatusBar(enemy);
                this.destroyEnemy(enemy, indexEnemy);
            }
        }
    }

    /**
     * Checks for collisions between throwable objects and the ground, performing actions such as marking the bottle as colliding with the ground and deleting it.
     *
     */
    checkGroundCollisionThrowableObjects() {
        for (let i = 0; i < this.throwableObjects.length; i++) {
            const bottle = this.throwableObjects[i];
            if (bottle.y >= bottle.floorCoord) {
                bottle.collidesGround();
                this.deleteBottle(bottle);
            }
        }
    }

    /**
     * Deletes a throwable object (typically a bottle) from the array after a specified delay.
     *
     * @param {CollectableObject} bottle - The throwable object to be deleted.
     */
    deleteBottle(bottle) {
        setTimeout(() => {
            const index = this.throwableObjects.findIndex(e => e === bottle);
            if (index !== -1) {
                this.throwableObjects.splice(index, 1);
            }
        }, 500);
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

    /**
     * Throws a bottle in the current direction based on the character's throw direction, adds it to the throwable objects array, and associates it with the world.
     */
    throwBottle() {
        let bottle = this.character.checkCurrentThrowDirection();
        bottle.world = this;
        this.throwableObjects.push(bottle);
    }

    /**
     * Draws the game world on the canvas.
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.insertMovableObjects();
        this.addToMap(this.character);
        this.insertFixedObjects();
        this.ctx.translate(-this.camera_x, 0);
        //draw() wird immer wieder aufgerufen
        self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    /**
     * Inserts movable objects into the world, such as background objects, clouds, collectable objects, throwable objects, and enemies.
     */
    insertMovableObjects() {
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.collectableObjects);
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.enemies);
    }

    /**
     * Inserts fixed objects into the world, such as health, coin, and bottle status bars. Additionally, adds the boss status bar and symbol if the boss is triggered.
     */
    insertFixedObjects() {
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBarHealth);
        this.addToMap(this.statusBarCoin);
        this.addToMap(this.statusBarBottle);
        let boss = this.level.enemies.find((enemy) => enemy instanceof Endboss);
        if (boss instanceof Endboss && boss.bossTriggered) {
            this.addToMap(this.statusBarBoss);
            this.addToMap(this.statusBarBossSymbol);
        }
        this.ctx.translate(this.camera_x, 0);
    }

    /**
     * Adds an array of objects to the map by calling addToMap for each object.
     *
     * @param {Array} objects - An array of objects to be added to the map.
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    /**
     * Adds a movable object to the map, considering the possibility of flipping the image horizontally.
     *
     * @param {MovableObject} mo - The movable object to be added to the map.
     */
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

    /**
     * Flips the image horizontally for a movable object.
     *
     * @param {MovableObject} mo - The movable object to have its image flipped.
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * Restores the original orientation of a movable object's image.
     *
     * @param {MovableObject} mo - The movable object to have its image orientation restored.
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    /**
     * Initiates the boss fight when the character crosses a specific X-coordinate threshold and the boss is not yet triggered.
     */
    startBossFight() {
        let boss = this.level.enemies.find((enemy) => enemy instanceof Endboss);
        if (boss instanceof Endboss && this.character.x >= this.bossTriggerXCoord && !boss.bossTriggered) {
            boss.bossTriggered = true;
            boss.triggerBoss();
        }
    }
}