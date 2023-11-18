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

document.addEventListener("DOMContentLoaded", btnPressEvents);