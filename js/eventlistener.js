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
        keyboard.SPACE = true;
    });

    document.getElementById('touch-throw').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.SPACE = false;
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
    if (e.key == ' ') {
        keyboard.SPACE = true;
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

/**
 * Initializes touch button events when the DOM content is loaded.
 */
document.addEventListener("DOMContentLoaded", btnPressEvents);