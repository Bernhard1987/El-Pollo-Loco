class Cloud extends MovableObject {
    width = 700;
    height = 350;

    constructor(positionStart, cloudImg) {
        super().loadImage(`./assets/img/5_background/layers/4_clouds/${cloudImg}.png`);

        this.x = positionStart + Math.random() * 300;
        this.y = 20;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }
}