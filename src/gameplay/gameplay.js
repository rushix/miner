/**
 * Created by rushi on 07.09.15.
 */

var GamePlay = function (layer) {

    this.layer = layer;
    this.tiles = false;

    this.opened_tiles_count = 0;

    //this.buildField();
};

GamePlay.prototype.getTile = function (x, y) {

    if (this.tiles == false) {

        this.buildField();
    }

    if (x >= 0 && y >= 0 && x < MINES.N && y < MINES.N) {

        return this.tiles[x][y];
    } else {

        console.log("Warning: tile's coordinates out of range");
        return this.tiles[0][0];
    }
};

GamePlay.prototype.minesGenerate = function () {

    var x = randBetween(0, MINES.N - 1);
    var y = randBetween(0, MINES.N - 1);

    if (this.getTile(x, y).state == MINES.TILE_STATE.BOMB) {

        this.minesGenerate();
    } else {

        console.log("x= " + x + "; y= " + y + ";");

        this.getTile(x, y).state = MINES.TILE_STATE.BOMB;
    }
};

GamePlay.prototype.gameOver = function  (result) {

    console.log("GAME OVER (" + result + ")");

    cc.LoaderScene.preload(g_resources, function () {
        cc.director.runScene(new LobbyScene());
    }, this.layer);
};

GamePlay.prototype.checkEndGame = function () {

    var goal = MINES.N * MINES.N - MINES.MINES_COUNT;

    return (this.opened_tiles_count == goal);
};

GamePlay.prototype.buildField = function () {

    var x   = 0;
    var y   = 0;
    var nn  = MINES.N * MINES.N;

    for (var iterator = 0; iterator < nn; iterator++) {

        x = Math.floor(iterator / MINES.N);
        y = Math.floor(iterator % MINES.N);

        if (!(this.tiles instanceof Array)) {
            this.tiles = [];
        }

        if (!(this.tiles[x] instanceof Array)) {
            this.tiles[x] = [];
        }

        this.tiles[x][y] = new Tile(this.layer, res.transparent_png, iterator, MINES.TILE_STATE.EMPTY_HIDDEN);
    }

    // locating bombs on a field
    // FIXME
    for (iterator = 0; iterator < MINES.MINES_COUNT; iterator++) {

        this.minesGenerate();
    }

    // locating "numbers" on a field
    // FIXME
    for (var xIterator = 0; xIterator < MINES.N; xIterator++) {
        for (var yIterator = 0; yIterator < MINES.N; yIterator++) {
            if (
                this.tiles[xIterator][yIterator].seekMinesAround(false) > 0 &&
                this.tiles[xIterator][yIterator].state != MINES.TILE_STATE.BOMB
            ) {

                this.tiles[xIterator][yIterator].state = MINES.TILE_STATE.NUMBERED_HIDDEN;
            }
        }
    }

    MINES.GAME_STATE_ACTUAL = MINES.GAME_STATE.PLAY;

    console.log(MINES.GAME_FIELD);
};