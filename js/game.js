let canvas;
let world;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);

console.log('my character is', world.character, world.enemies);
}

window.addEventListener("keydown", (e) => {
    if (e.key == 'd') {
        keyboard.RIGHT = true;
    }
    if (e.key == 'w') {
        keyboard.UP = true;
    }
    if (e.key == 's') {
        keyboard.DOWN = true;
    }
    if (e.key == ' ') {
        keyboard.SPACE = true;
    }
});

window.addEventListener("keyup", (e) => {
    if (e.key == 'd') {
        keyboard.RIGHT = false;
    }
    if (e.key == 'w') {
        keyboard.UP = false;
    }
    if (e.key == 's') {
        keyboard.DOWN = false;
    }
    if (e.key == ' ') {
        keyboard.SPACE = false;
    }
});