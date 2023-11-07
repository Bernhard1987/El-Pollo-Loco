class DrawableObject {
    x = 100;
    y = 120;
    height = 100;
    width = 100;

    showCollisionFrame = false;

    img;
    imageCache = {};
    currentImage = 0;

    /**
    * Draws the current object's image (this.img) on the provided canvas context (ctx) at the specified position and dimensions.
    *
    * @param {CanvasRenderingContext2D} ctx - The canvas rendering context on which to draw the image.
    */

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
    * Draws a collision frame for the current object on the provided canvas context (ctx) if the "showCollisionFrame" property is set to true and the object is an instance of a specific class.
    * Can be activated by setting showCollisionFrame "true" for object collisions adjustments as the frame drawn uses same formula as isColliding() in class MovableObject.
    *
    * @param {CanvasRenderingContext2D} ctx - The canvas rendering context on which to draw the collision frame.
    */

    drawFrame(ctx) {
        if (this.showCollisionFrame && (this instanceof Character || this instanceof Chicken || this instanceof ChickenSmall || this instanceof Endboss || this instanceof CollectableObject || this instanceof ThrowableObject)) {
            ctx.beginPath();
            ctx.lineWidth = '2';
            ctx.strokeStyle = 'blue';
            ctx.rect((this.collisionStartOffsetX + (this.x - this.offsetX / 2)), (this.collisionStartOffsetY + (this.y - this.offsetY / 2)), (this.width + this.offsetX), (this.height + this.offsetY));
            ctx.stroke();
        }
    }

    /**
     * Loads an image by setting the source (URL) for the current object's image (this.img).
     *
     * @param {string} path - The path or URL of the image to be loaded.
     */

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
    * Loads an array of images and caches them using their paths as keys in the image cache of the current object.
    *
    * @param {string[]} arr - An array of image paths or URLs to be loaded and cached.
    */

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
}