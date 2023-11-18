let canvas;
let world;
let keyboard = new Keyboard();

let fullscreenMode = false;
let fullscreenContainer;

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    loadSettings();
}

function restartGame() {
    showOrHide('hide', 'menu-game-over');
    clearAllIntervals();
    world = '';
    init();
    menuStartGame();
}

function actionsAfterGameOver() {
    setTimeout(() => {
        showOrHide('hide', 'ingame-overlay');
        showOrHide('show', 'menu-game-over');
        clearInterval(world.bgmInterval);
        world.background_music.pause();
    }, 1000);
}

function gameOver(gameOverType, collectedCoinsCount, maxItemCoin) {
    const gameOverMessages = {
        'bossDead': {
            title: 'Congrats! You have beaten the chicken boss!',
            text: `From that day on, Pepe was known as the man who tamed 
                   the crazy chickens, and his village lived in peace once again.`
        },
        'characterDead': {
            title: 'Oh no! You are dead!',
            text: 'On your mission to put things in order, you tragically died!'
        },
        'bossEscaped': {
            title: 'The chicken boss escaped!',
            text: `Somehow you survived being overrun by the crazy chicken boss! 
                   He escaped, so you have to worry that he&apos;ll 
                   come back with his friends and beat you up.`
        },
        'default': {
            title: 'Game Over!',
            text: 'For unknown reason (check function gameOver(gameOverType))'
        }
    };

    const selectedMessage = gameOverMessages[gameOverType] || gameOverMessages['default'];

    document.getElementById('stat-box').innerHTML = statBoxTemplate(selectedMessage.title, selectedMessage.text, collectedCoinsCount, maxItemCoin);
    actionsAfterGameOver();
}

function loadLocalStorage() {
    const musicOnFromStorage = localStorage.getItem('musicOn');
    const soundOnFromStorage = localStorage.getItem('soundOn');
    
    if (musicOnFromStorage !== null) {
        world.musicOn = musicOnFromStorage === 'true'; // Konvertiere zu Boolean
    }

    if (soundOnFromStorage !== null) {
        world.soundOn = soundOnFromStorage === 'true'; // Konvertiere zu Boolean
    }
}


function saveLocalStorage(key) {
    localStorage.setItem(key, world[key]);
}

function loadSettings() {
    loadLocalStorage();
    let changeSetting = false;
    musicSwitch(changeSetting);
    soundSwitch(changeSetting);
}

function switchSetting(setting, textElementId, imgElementId, overlayImgId, onImgSrc, offImgSrc, changeSetting) {
    const element = document.getElementById(textElementId);

    if (changeSetting) {
        world[setting] = !world[setting];
    }

    if (world[setting]) {
        element.innerHTML = `${setting.replace('On', '').toUpperCase()}: ON`;
        document.getElementById(imgElementId).src = onImgSrc;
        document.getElementById(overlayImgId).src = onImgSrc;
    } else {
        element.innerHTML = `${setting.replace('On', '').toUpperCase()}: OFF`;
        document.getElementById(imgElementId).src = offImgSrc;
        document.getElementById(overlayImgId).src = offImgSrc;
    }

    saveLocalStorage(setting);
}

function musicSwitch(changeSetting) {
    switchSetting('musicOn', 'menu-music-text', 'menu-music-img', 'ingame-overlay-music', './assets/img/music_on.svg', './assets/img/music_off.svg', changeSetting);
}

function soundSwitch(changeSetting) {
    switchSetting('soundOn', 'menu-sound-text', 'menu-sound-img', 'ingame-overlay-sound', './assets/img/sound_on.svg', './assets/img/sound_off.svg', changeSetting);
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