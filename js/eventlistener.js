let bottleThrown = false;

/**
 * Actualises lastButtonPressTime with actual time. Triggered by touchend or keyup
 */
function resolveLastButtonPressTime() {
    lastButtonPressTime = new Date().getTime();
}

/**
 * Adds touch event listeners for virtual buttons and sets corresponding keyboard input.
 */
function btnPressEvents() {
    document.getElementById('touch-left').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.LEFT = true;
    });

    document.getElementById('touch-left').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
        resolveLastButtonPressTime();
    });

    document.getElementById('touch-right').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;
    });

    document.getElementById('touch-right').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
        resolveLastButtonPressTime();
    });

    document.getElementById('touch-jump').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.UP = true;
    });

    document.getElementById('touch-jump').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.UP = false;
        resolveLastButtonPressTime();
    });

    document.getElementById('touch-throw').addEventListener('touchstart', (e) => {
        e.preventDefault();
        if (world.collectedBottlesCount > 0 && !bottleThrown) {
            keyboard.SPACE = true;
            bottleThrown = true;
            world.actualiseThrownObjects();
        }
    });

    document.getElementById('touch-throw').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.SPACE = false;
        bottleThrown = false;
        resolveLastButtonPressTime();
    });
}

/**
 * Handles keydown events for arrow keys and space bar, updating keyboard input.
 * @param {Event} e - The keydown event.
 */
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
    if (e.key == ' ' && world.collectedBottlesCount > 0 && !bottleThrown) {
        keyboard.SPACE = true;
        bottleThrown = true;
        world.actualiseThrownObjects();
    }
});

/**
 * Eventlisteners for fullscreenchange for all Browsers, calls exitHandler
 */
document.addEventListener('fullscreenchange', exitHandler);
document.addEventListener('webkitfullscreenchange', exitHandler);
document.addEventListener('mozfullscreenchange', exitHandler);
document.addEventListener('MSFullscreenChange', exitHandler);

/**
 * calls leaveFullscreenState if Fullscreen is closed.
 */
function exitHandler() {
    if (!document.fullscreenElement && !document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
        leaveFullscreenState();
    }
}

/**
 * Handles keyup events for arrow keys and space bar, updating keyboard input. Triggers 
 * resolveLastButtonPressTime() when any key is pressed.
 * @param {Event} e - The keyup event.
 */
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
        bottleThrown = false;
    }
    resolveLastButtonPressTime();
});

window.addEventListener('resize', setCanvasWidth);

/**
 * Initializes touch button events when the DOM content is loaded.
 */
document.addEventListener("DOMContentLoaded", btnPressEvents);