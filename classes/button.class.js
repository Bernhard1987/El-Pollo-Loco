class Button extends DrawableObject {
    y = 20;

    IMAGE;

    constructor() {
        super();
        this.loadImage(this.IMAGE);
    }
}