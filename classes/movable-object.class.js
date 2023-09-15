class MovableObject {
    x = 100;
    y = 120;
    img;
    height = 100;
    width = 100;
    imageCache = {};

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr){
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = path;
        });
    }

    moveRight() {
        console.log('moving right');
    }

    moveLeft() {

    }
}