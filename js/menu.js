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

function showOrHide(showOrHide, elementId) {
    if (showOrHide == "show") {
        document.getElementById(elementId).classList.remove('d-none');
    } else if (showOrHide == "hide") {
        document.getElementById(elementId).classList.add('d-none');
    }
}