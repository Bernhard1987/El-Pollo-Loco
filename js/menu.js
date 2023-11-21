/**
 * calls startGame() and hides the start menu.
 */
function menuStartGame() {
    startGame();
    showOrHide('hide', 'menu-start');
    showOrHide('show', 'ingame-overlay');
}

/**
 * Displays the settings menu and hides the start menu.
 */
function menuShowSettings() {
    showOrHide('hide', 'menu-start');
    showOrHide('show', 'menu-settings');
}

/**
 * Displays the story menu and hides the start menu.
 */
function menuShowStory() {
    showOrHide('hide', 'menu-start');
    showOrHide('show', 'menu-story');
}

/**
 * Displays the controls menu and hides the start menu.
 */
function menuShowControls() {
    showOrHide('hide', 'menu-start');
    showOrHide('show', 'menu-controls');
}

/**
 * Closes any open menus and shows the start menu.
 */
function menuClose() {
    showOrHide('hide', 'menu-settings');
    showOrHide('hide', 'menu-story');
    showOrHide('hide', 'menu-controls');
    showOrHide('show', 'menu-start');
}

/**
 * Shows or hides the specified element based on the given action.
 * @param {string} showOrHide - The action, either 'show' or 'hide'.
 * @param {string} elementId - The ID of the HTML element to show or hide.
 */
function showOrHide(showOrHide, elementId) {
    if (showOrHide == "show") {
        document.getElementById(elementId).classList.remove('d-none');
    } else if (showOrHide == "hide") {
        document.getElementById(elementId).classList.add('d-none');
    }
}

/**
 * Generates the HTML template for the game over stat box.
 * @param {string} gameOverTitle - The title for the game over stat box.
 * @param {string} gameOverText - The text for the game over stat box.
 * @returns {string} - The HTML template for the game over stat box.
 */
function statBoxTemplate(gameOverTitle, gameOverText) {
    let statbox = /*html*/`
        <h2>${gameOverTitle}</h2>
        <p>${gameOverText}</p>
        <p>Thank you for playing!</p>
        <div class="stat-row">
        <div class="stat">
            <img src="./assets/img/coin_stat.png" alt="Coins collected"> ${world.collectedCoinsCount} / ${world.maxItemCoin}
        </div>
    </div>`;
    
    return statbox;
}