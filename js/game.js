let canvas;
let world;
let keyboard = new Keyboard();

let fullscreenMode = false;

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
    if (e.key == 'a') {
        keyboard.LEFT = true;
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
    if (e.key == 'a') {
        keyboard.LEFT = false;
    }
    if (e.key == 's') {
        keyboard.DOWN = false;
    }
    if (e.key == ' ') {
        keyboard.SPACE = false;
    }
});

function fullscreen() {
    let fullscreen = document.getElementById('game-container');

    if (fullscreenMode == false) {
         enterFullscreen(fullscreen);
         fullscreenMode = true;
    } else {
        exitFullscreen();
        fullscreenMode = false;
    }
   
}

function enterFullscreen(element) {
    if(element.requestFullscreen) {
      element.requestFullscreen();
    } else if(element.msRequestFullscreen) {      // for IE11 (remove June 15, 2022)
      element.msRequestFullscreen();
    } else if(element.webkitRequestFullscreen) {  // iOS Safari
      element.webkitRequestFullscreen();
    }
  }

  function exitFullscreen() {
    if(document.exitFullscreen) {
      document.exitFullscreen();
    } else if(document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }