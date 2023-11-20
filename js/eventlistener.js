let bottleThrown = false;

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
    });
}

/**
 * Handles keydown events for arrow keys and space bar, updating keyboard input.
 * @param {Event} e - The keydown event.
 */
window.addEventListener("keydown", (e) => {
    if (e.key == 'd') {
        keyboard.RIGHT = true;
    } else if (e.key == 'w') {
        keyboard.UP = true;
    } else if (e.key == 'a') {
        keyboard.LEFT = true;
    } else if (e.key == 's') {
        keyboard.DOWN = true;
    } else if (e.key == ' ' && world.collectedBottlesCount > 0 && !bottleThrown) {
        keyboard.SPACE = true;
        bottleThrown = true;
        world.actualiseThrownObjects();
    }
});

/**
 * Handles keydown event for Escape key when in fullscreen mode, leaving fullscreen.
 * @param {Event} e - The keydown event.
 */
window.addEventListener("keydown", (e) => {
    if (e.key == "Escape" && fullscreenMode) {
        leaveFullscreenState();
    }
});

/**
 * Handles keyup events for arrow keys and space bar, updating keyboard input.
 * @param {Event} e - The keyup event.
 */
window.addEventListener("keyup", (e) => {
    if (e.key == 'd') {
        keyboard.RIGHT = false;
    } else if (e.key == 'w') {
        keyboard.UP = false;
    } else if (e.key == 'a') {
        keyboard.LEFT = false;
    } else if (e.key == 's') {
        keyboard.DOWN = false;
    } else if (e.key == ' ') {
        keyboard.SPACE = false;
        bottleThrown = false;
    }
});

/**
 * Initializes touch button events when the DOM content is loaded.
 */
document.addEventListener("DOMContentLoaded", btnPressEvents);