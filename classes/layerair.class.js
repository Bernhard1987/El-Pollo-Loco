class LayerAir extends MovableObject {
    width = 720;
    height = 480;


    constructor() {
        super().loadImage('./assets/img/5_background/layers/air.png');

        this.x = 0;
        this.y = 0;
    }
}