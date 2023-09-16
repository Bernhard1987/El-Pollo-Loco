class Cloud extends MovableObject {
    width = 700;
    height = 350;

    constructor() {
        super().loadImage('./assets/img/5_background/layers/4_clouds/1.png');

        this.x = 0 + Math.random() * 500;
        this.y = 20;
        this.animate();
    }

    animate() {
        this.moveLeft();
    }
}