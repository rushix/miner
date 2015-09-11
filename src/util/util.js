/**
 * Created by deremin on 10.09.15.
 */

function randBetween (a, b) {

    return Math.floor(Math.random() * (b - a + 1)) + a;
}

function checkLocalStorage () {

    if (typeof(Storage) !== "undefined") {

        MINES.CHECK_LOCAL_STORAGE = true;
        console.log(localStorage);
    } else {

        MINES.CHECK_LOCAL_STORAGE = false;
    }
}

function saveGameState () {

    if (MINES.CHECK_LOCAL_STORAGE) {

        localStorage.setItem("MINES_STATES", JSON.stringify(MINES.TILE_STATES));
        localStorage.setItem("MINES_N", JSON.stringify(MINES.N));
        localStorage.setItem("MINES_OPENED_TILES_COUNT", JSON.stringify(MINES.GAME_FIELD.opened_tiles_count));
        localStorage.setItem("MINES_COUNT", JSON.stringify(MINES.MINES_COUNT));
        localStorage.setItem("MINES_ACTUAL_GAME_STATE", JSON.stringify(MINES.GAME_STATE_ACTUAL));
    }
}

function loadGameState () {

    if (MINES.CHECK_LOCAL_STORAGE) {

        MINES.TILE_STATES = JSON.parse(localStorage.getItem("MINES_STATES"));
        MINES.N = JSON.parse(localStorage.getItem("MINES_N"));
        MINES.GAME_FIELD.opened_tiles_count = JSON.parse(localStorage.getItem("MINES_OPENED_TILES_COUNT"));
        MINES.MINES_COUNT = JSON.parse(localStorage.getItem("MINES_COUNT"));
        MINES.GAME_STATE_ACTUAL = JSON.parse(localStorage.getItem("MINES_ACTUAL_GAME_STATE"));
    }
}

function deleteGameState () {

    if (MINES.CHECK_LOCAL_STORAGE) {

        localStorage.removeItem("MINES_STATES");
        localStorage.removeItem("MINES_N");
        localStorage.removeItem("MINES_OPENED_TILES_COUNT");
        localStorage.removeItem("MINES_COUNT");
        localStorage.removeItem("MINES_ACTUAL_GAME_STATE");
    }
}

function checkGameStateSaved () {

    if (MINES.CHECK_LOCAL_STORAGE) {

        return (localStorage.getItem("MINES_STATES")) ? true : false;
    } else {

        return false;
    }
}