class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 100;
    statusBar = new StatusBar;

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
            this.level.enemies.forEach( (enemy) => {
                if (this.character.isColliding(enemy)) {
                    console.log('Collision with character: ', enemy);
                    this.character.hit();
                    console.log('remaining Energy ', this.character.health);
                }
            });
        }, 1000 / 10);
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);

        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.clouds);
        this.addToMap(this.statusBar);

        this.ctx.translate(-this.camera_x, 0);
        this.background_music.volume = this.bgm_volume;
        // this.background_music.play();
        // this.playBossSound();

        //draw() wird immer wieder aufgerufen
        self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
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