function menuStartGame() {
    showOrHide('hide', 'menu-start');
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

function menuSettingSoundSwitch() {
    if (world.soundOn) {
        world.soundOn = false;
        document.getElementById('menu-sound-text').innerHTML = 'SOUND: OFF';
        document.getElementById('menu-sound-img').src = './assets/img/sound_off.svg';
    } else if (!world.soundOn) {
        world.soundOn = true;
        document.getElementById('menu-sound-text').innerHTML = 'SOUND: ON';
        document.getElementById('menu-sound-img').src = './assets/img/sound_on.svg';
    }
}

function showOrHide(showOrHide, elementId) {
    if (showOrHide == "show") {
        document.getElementById(elementId).classList.remove('d-none');
    } else if (showOrHide == "hide") {
        document.getElementById(elementId).classList.add('d-none');
    }
}