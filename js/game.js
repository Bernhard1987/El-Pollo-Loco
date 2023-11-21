/**
 * Global variables and functions for game initialization, restart, and game over handling.
 */

// Canvas and world instances
let canvas;
let world;
let keyboard = new Keyboard();

// Fullscreen mode and container
let fullscreenMode = false;
let fullscreenContainer;

// Game over messages
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

/**
 * Initializes the game by getting the canvas element and creating a new World instance.
 */
function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    loadSettings();
}

/**
 * Restarts the game by stopping music, hiding overlay, and initializing a new game.
 */
function restartGame() {
    world.music_won.pause();
    world.music_lost.pause();
    showOrHide('hide', 'menu-game-over');
    world = '';
    init();
    menuStartGame();
}

/**
 * Initiates and starts the game
 */
function startGame() {
    initLevel();
    resolveLastButtonPressTime();
    world.gameStarted = true;
}

/**
 * Performs actions after the game is over, such as showing game over menu and stopping intervals.
 */
function actionsAfterGameOver() {
    setTimeout(() => {
        showOrHide('hide', 'ingame-overlay');
        showOrHide('show', 'menu-game-over');
        clearInterval(world.bgmInterval);
        world.background_music.pause();
        clearAllIntervals();
    }, 2000);
}

/**
 * Handles game over scenarios by displaying appropriate messages, playing end theme, and performing actions.
 * @param {string} gameOverType - The type of game over scenario.
 */
function gameOver(gameOverType) {
    const selectedMessage = gameOverMessages[gameOverType] || gameOverMessages['default'];
    document.getElementById('stat-box').innerHTML = statBoxTemplate(selectedMessage.title, selectedMessage.text);
    setTimeout(() => {
        playEndTheme(gameOverType);
    }, 2000);
    actionsAfterGameOver();
}

/**
 * Plays the end theme based on the game over scenario.
 * @param {string} gameOverType - The type of game over scenario.
 */
function playEndTheme(gameOverType) {
    world.music_won.volume = world.bgm_volume;
    world.music_lost.volume = world.bgm_volume;
    if ((gameOverType == 'characterDead' || gameOverType == 'bossEscaped') && world.musicOn) {
        world.music_lost.play();
    }
    if (gameOverType == 'bossDead' && world.musicOn) {
        world.music_won.play();
    }
}

/**
 * Loads music and sound settings from local storage.
 */
function loadLocalStorage() {
    const musicOnFromStorage = localStorage.getItem('musicOn');
    const soundOnFromStorage = localStorage.getItem('soundOn');

    if (musicOnFromStorage !== null) {
        world.musicOn = musicOnFromStorage === 'true';
    }

    if (soundOnFromStorage !== null) {
        world.soundOn = soundOnFromStorage === 'true';
    }
}

/**
 * Saves a specific game setting to local storage.
 * @param {string} key - The setting key.
 */
function saveLocalStorage(key) {
    localStorage.setItem(key, world[key]);
}

/**
 * Loads and applies saved game settings.
 */
function loadSettings() {
    loadLocalStorage();
    let changeSetting = false;
    musicSwitch(changeSetting);
    soundSwitch(changeSetting);
}

/**
 * Switches a specific game setting, updating UI elements and saving to local storage.
 * @param {string} setting - The setting to be switched.
 * @param {string} textElementId - The ID of the text element to be updated.
 * @param {string} imgElementId - The ID of the image element to be updated.
 * @param {string} overlayImgId - The ID of the overlay image element to be updated.
 * @param {string} onImgSrc - The source of the image when the setting is ON.
 * @param {string} offImgSrc - The source of the image when the setting is OFF.
 * @param {boolean} changeSetting - Flag indicating whether to change the setting.
 */
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

/**
 * Handles toggling the music setting.
 * @param {boolean} changeSetting - Flag indicating whether to change the setting.
 */
function musicSwitch(changeSetting) {
    switchSetting('musicOn', 'menu-music-text', 'menu-music-img', 'ingame-overlay-music', './assets/img/music_on.svg', './assets/img/music_off.svg', changeSetting);
}

/**
 * Handles toggling the sound setting.
 * @param {boolean} changeSetting - Flag indicating whether to change the setting.
 */
function soundSwitch(changeSetting) {
    switchSetting('soundOn', 'menu-sound-text', 'menu-sound-img', 'ingame-overlay-sound', './assets/img/sound_on.svg', './assets/img/sound_off.svg', changeSetting);
}

/**
 * Toggles fullscreen mode.
 */
function fullscreen() {
    let container = document.getElementById('game-container');
    fullscreenContainer = container;

    if (fullscreenMode == false) {
        setFullscreenState();
    } else {
        leaveFullscreenState();
    }
}

/**
 * Sets the fullscreen state.
 */
function setFullscreenState() {
    enterFullscreen();
    fullscreenMode = true;
    document.getElementById('fullscreen-img').src = './assets/img/fullscreen_exit.svg';
}

/**
 * Leaves the fullscreen state.
 */
function leaveFullscreenState() {
    exitFullscreen();
    fullscreenMode = false;
    document.getElementById('fullscreen-img').src = './assets/img/fullscreen.svg';
}

/**
 * Enters fullscreen mode.
 */
function enterFullscreen() {
    let element = fullscreenContainer;
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {      // for IE11 (remove June 15, 2022)
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {  // iOS Safari
        element.webkitRequestFullscreen();
    }
}

/**
 * Exits fullscreen mode.
 */
function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}

/**
 * Clears all intervals.
 */
function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
}