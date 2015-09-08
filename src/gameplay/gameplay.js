/**
 * Created by rushi on 07.09.15.
 */

function randBetween (a, b) {

    return Math.floor(Math.random() * (b - a + 1)) + a;
}

function minesGenerate () {

    var x = randBetween(0, MINES.N - 1);
    var y = randBetween(0, MINES.N - 1);

    if (MINES.GAME_FIELD[x][y].state == MINES.TILE_STATE.BOMB) {

        minesGenerate();
    } else {

        console.log("x= " + x + "; y= " + y + ";");

        MINES.GAME_FIELD[x][y].state = MINES.TILE_STATE.BOMB;
    }
}

function game_over (layer) {

    console.log("GAME OVER");

    cc.LoaderScene.preload(g_resources, function () {
        cc.director.runScene(new LobbyScene());
    }, layer);
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

    // FIXME
    for (iterator = 0; iterator < MINES.MINES_COUNT; iterator++) {

        minesGenerate();
    }

    // FIXME
    for (var xIterator = 0; xIterator < MINES.N; xIterator++) {
        for (var yIterator = 0; yIterator < MINES.N; yIterator++) {
            if (
                MINES.GAME_FIELD[xIterator][yIterator].seekMinesAround(false) > 0 &&
                MINES.GAME_FIELD[xIterator][yIterator].state != MINES.TILE_STATE.BOMB
            ) {

                MINES.GAME_FIELD[xIterator][yIterator].state = MINES.TILE_STATE.NUMBERED_HIDDEN;
            }
        }
    }

    MINES.GAME_STATE_ACTUAL = MINES.GAME_STATE.PLAY;

    console.log(MINES.GAME_FIELD);
}