function menuStartGame() {
    initLevel();
    world.gameStarted = true;
    showOrHide('hide', 'menu-start');
    showOrHide('show', 'ingame-overlay');
}

function menuShowSettings() {
    showOrHide('hide', 'menu-start');
    showOrHide('show', 'menu-settings');
}

function menuShowStory() {
    showOrHide('hide', 'menu-start');
    showOrHide('show', 'menu-story');
}

function menuShowControls() {
    showOrHide('hide', 'menu-start');
    showOrHide('show', 'menu-controls');
}

function menuClose() {
    showOrHide('hide', 'menu-settings');
    showOrHide('hide', 'menu-story');
    showOrHide('hide', 'menu-controls');
    showOrHide('show', 'menu-start');
}

function soundSwitch() {
    if (world.musicOn) {
        world.musicOn = false;
        document.getElementById('menu-sound-text').innerHTML = 'SOUND: OFF';
        document.getElementById('menu-sound-img').src = './assets/img/sound_off.svg';
        document.getElementById('ingame-overlay-sound').src = './assets/img/sound_off.svg';
    } else if (!world.musicOn) {
        world.musicOn = true;
        document.getElementById('menu-sound-text').innerHTML = 'SOUND: ON';
        document.getElementById('menu-sound-img').src = './assets/img/sound_on.svg';
        document.getElementById('ingame-overlay-sound').src = './assets/img/sound_on.svg';
    }
}

function showOrHide(showOrHide, elementId) {
    if (showOrHide == "show") {
        document.getElementById(elementId).classList.remove('d-none');
    } else if (showOrHide == "hide") {
        document.getElementById(elementId).classList.add('d-none');
    }
}