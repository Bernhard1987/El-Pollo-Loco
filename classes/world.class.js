class World {
    character = new Character();
    enemies = [
        new PufferFish(),
        new PufferFish(),
        new PufferFish()
    ];
    clouds = [
        new Cloud()
    ];
    layers = [
        new LayerAir(),
        new Layer3(),
        new Layer2(),
        new Layer1()
    ]
    canvas;
    ctx;

    constructor(world) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();
    }

    draw() {
        this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);

        this.layers.forEach(layer => {
            this.ctx.drawImage(layer.img, layer.x, layer.y, layer.width, layer.height);
        });

        this.ctx.drawImage(this.character.img, this.character.x, this.character.y, this.character.width, this.character.height);
        
        this.enemies.forEach(enemy => {
            this.ctx.drawImage(enemy.img, enemy.x, enemy.y, enemy.width, enemy.height);
        });

        this.clouds.forEach(cloud => {
            this.ctx.drawImage(cloud.img, cloud.x, cloud.y, cloud.width, cloud.height);
        });

        //draw() wird immer wieder aufgerufen
        self = this;
        requestAnimationFrame( function() {
            self.draw();
        });
    }
}