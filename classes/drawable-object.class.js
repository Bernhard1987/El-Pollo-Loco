class DrawableObject {
    x = 100;
    y = 120;
    height = 100;
    width = 100;

    img;
    imageCache = {};
    currentImage = 0;

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss || this instanceof CollectableObject || this instanceof ThrowableObject) {
            ctx.beginPath();
            ctx.lineWidth = '2';
            ctx.strokeStyle = 'blue';
            ctx.rect((this.collisionStartOffsetX + (this.x - this.offsetX / 2)), (this.collisionStartOffsetY + (this.y - this.offsetY / 2)), (this.width + this.offsetX), (this.height + this.offsetY));
            ctx.stroke();
        }
    }

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
}