/**
 * Created by rushi on 07.09.15.
 */

function randBetween (a, b) {

    return Math.floor(Math.random() * (b - a + 1)) + a;
}

function minesGenerate () {

    var x = randBetween(0, MINES.N - 1);
    var y = randBetween(0, MINES.N - 1);

    if (MINES.GAME_FIELD[x][y].state != MINES.TILE_STATE.EMPTY_HIDDEN) {

        minesGenerate();
    } else {

        MINES.GAME_FIELD[x][y].state = MINES.TILE_STATE.BOMB;
    }
}

function buildField (layer) {

    var x   = 0;
    var y   = 0;
    var nn  = MINES.N * MINES.N;

    for (var iterator = 0; iterator < nn; iterator++) {

        x = Math.floor(iterator / MINES.N);
        y = Math.floor(iterator % MINES.N);

        if (!(MINES.GAME_FIELD instanceof Array)) {
            MINES.GAME_FIELD = [];
        }

        if (!(MINES.GAME_FIELD[x] instanceof Array)) {
            MINES.GAME_FIELD[x] = [];
        }

        MINES.GAME_FIELD[x][y] = new Tile(layer, res.transparent_png, iterator, MINES.TILE_STATE.EMPTY_HIDDEN);
    }

    for (iterator = 0; iterator < MINES.MINES_COUNT; iterator++) {

        minesGenerate();
    }

    console.log(MINES.GAME_FIELD);
}