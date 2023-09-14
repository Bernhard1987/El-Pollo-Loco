class Character extends MovableObject{
    width = 150;
    height = 300;

    constructor() {
        super().loadImage('./assets/img/2_character_pepe/1_idle/idle/I-1.png');

        this.x = 10;
        this.y = 150;
    }
    jump() {

    }
}