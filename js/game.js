let canvas;
let world;
let keyboard = new Keyboard();

let fullscreenMode = false;
let fullscreenContainer;

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    console.log('my character is', world.character, world.enemies);
}

function restartGame() {
    showOrHide('hide', 'menu-game-over');
    clearAllIntervals();
    // world.background_music.stop();
    world = '';
    init();
    menuStartGame();
}

function btnPressEvents() {
    document.getElementById('touch-left').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.LEFT = true;
    });

    document.getElementById('touch-left').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
    });

    document.getElementById('touch-right').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;
    });

    document.getElementById('touch-right').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
    });

    document.getElementById('touch-jump').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.UP = true;
    });

    document.getElementById('touch-jump').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.UP = false;
    });

    document.getElementById('touch-throw').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.SPACE = true;
    });

    document.getElementById('touch-throw').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.SPACE = false;
    });
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

window.addEventListener("keydown", (e) => {
    if (e.key == "Escape" && fullscreenMode) {
        console.log("Keydown event:", e.key);
        leaveFullscreenState();
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
    let container = document.getElementById('game-container');
    fullscreenContainer = container;

    if (fullscreenMode == false) {
        setFullscreenState();
    } else {
        leaveFullscreenState();
    }
}

function setFullscreenState() {
    enterFullscreen();
    fullscreenMode = true;
    document.getElementById('fullscreen-img').src = './assets/img/fullscreen_exit.svg';
}

function leaveFullscreenState() {
    exitFullscreen();
    fullscreenMode = false;
    document.getElementById('fullscreen-img').src = './assets/img/fullscreen.svg';
}

function enterFullscreen() {
    let element = fullscreenContainer;
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


  function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
  }

  document.addEventListener("DOMContentLoaded", btnPressEvents);