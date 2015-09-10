/**
 * Created by deremin on 10.09.15.
 */

function randBetween (a, b) {

    return Math.floor(Math.random() * (b - a + 1)) + a;
}

function checkLocalStorage () {

    if (typeof(Storage) !== "undefined") {

        MINES.CHECK_LOCAL_STORAGE = true;
    } else {

        MINES.CHECK_LOCAL_STORAGE = false;
    }
}