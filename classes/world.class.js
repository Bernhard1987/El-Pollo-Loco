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

    background_music = new Audio('./assets/sound/bgm.mp3');
    bgm_volume = 0;

    //boss_sound_x_coord = 1828; //play boss sound when character gets near of it

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.checkCollisions();
    }

    setWorld() {
        this.character.world = this;
    }

    checkCollisions() {
        setInterval(() => {
            this.level.enemies.forEach((enemy) => {
                if (this.character.isColliding(enemy)) {
                    this.character.hit();
                    // this.character.throwBackCharacter(); -> buggy w camera, might use acceleration
                    this.character.get_hit.volume = this.character.get_hit_volume;
                    this.character.get_hit.play();
                    this.statusBarHealth.setPercentage(this.character.health);
                }
            });
        }, 1000 / 5);
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);

        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.throwableObjects);

        this.insertFixedObjects();

        this.ctx.translate(-this.camera_x, 0);
        this.background_music.volume = this.bgm_volume;
        this.background_music.play();
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