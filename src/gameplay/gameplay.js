var GamePlay = function (layer) {

    this.layer = layer;
    this.tiles = false;

    this.opened_tiles_count = 0;

};

GamePlay.prototype.getTile = function (x, y) {

    if (this.tiles == false) {

        this.buildField();
    }

    if (x >= 0 && y >= 0 && x < MINES.N && y < MINES.N) {

        return this.tiles[x][y];
    } else {

        console.log("Warning: tile's coordinates out of range");
        throw new RangeError("tile's coordinates out of range");
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
        MINES.TILE_STATES[x][y] = {
            state:          this.getTile(x, y).state,
            mines_around:   0
        };
    }
};

GamePlay.prototype.gameOver = function  (result) {

    console.log("GAME OVER (" + result + ")");

    MINES.GAME_STATE_ACTUAL = (result == "win") ? MINES.GAME_STATE.OVER_WIN : MINES.GAME_STATE.OVER_LOSE;

    cc.LoaderScene.preload(g_resources, function () {
        cc.director.runScene(new LobbyScene());
    }, this.layer);
};

GamePlay.prototype.checkEndGame = function () {

    var goal = MINES.N * MINES.N - MINES.MINES_COUNT;

    return (this.opened_tiles_count == goal);
};

GamePlay.prototype.buildFieldFromSavedState = function () {

    for (var xIterator = 0; xIterator < MINES.N; xIterator++) {
        for (var yIterator = 0; yIterator < MINES.N; yIterator++) {


            if (!(this.tiles instanceof Array)) {
                this.tiles = [];
            }

            if (!(this.tiles[xIterator] instanceof Array)) {
                this.tiles[xIterator] = [];
            }

            this.tiles[xIterator][yIterator] = new Tile(
                this.layer,
                res.transparent_png,
                xIterator * MINES.N + yIterator,
                MINES.TILE_STATES[xIterator][yIterator].state
            );

            this.getTile(xIterator, yIterator).sprite.setAnchorPoint(0, 0);

            //save load
            this.getTile(xIterator, yIterator).state = MINES.TILE_STATES[xIterator][yIterator].state;
            this.getTile(xIterator, yIterator).mines_around = MINES.TILE_STATES[xIterator][yIterator].mines_around;


            //tiles visual interpretation
            switch (MINES.TILE_STATES[xIterator][yIterator].state) {

                case MINES.TILE_STATE.EMPTY_HIDDEN:
                case MINES.TILE_STATE.NUMBERED_HIDDEN:
                case MINES.TILE_STATE.BOMB:

                    this.getTile(xIterator, yIterator).sprite.initWithFile(
                        res.transparent_png,
                        cc.rect(0, 0, MINES.TEXTURE_BASE_DIMENSION, MINES.TEXTURE_BASE_DIMENSION)
                    );
                    this.getTile(xIterator, yIterator).setTileBackground(false);
                    break;
                case MINES.TILE_STATE.EMPTY_SHOWN:

                    this.getTile(xIterator, yIterator).sprite.initWithFile(
                        res.transparent_png,
                        cc.rect(0, 0, MINES.TEXTURE_BASE_DIMENSION, MINES.TEXTURE_BASE_DIMENSION)
                    );
                    this.getTile(xIterator, yIterator).setTileBackground(true);
                    break;

                case MINES.TILE_STATE.NUMBERED_SHOWN:

                    this.getTile(xIterator, yIterator).sprite.initWithSpriteFrameName(
                        this.getTile(xIterator, yIterator).mines_around +
                        "mines.png"
                    );
                    this.getTile(xIterator, yIterator).setTileBackground(true);
                    break;

                case MINES.TILE_STATE.FLAGGED_HIDDEN:
                case MINES.TILE_STATE.FLAGGED_FALSE_BOMB:
                case MINES.TILE_STATE.FLAGGED_BOMB:

                    this.getTile(xIterator, yIterator).sprite.initWithSpriteFrameName("flag.png");
                    this.getTile(xIterator, yIterator).setTileBackground(false);
                    break;

                default:
            }

            this.getTile(xIterator, yIterator).sprite.setAnchorPoint(0, 0);
        }
    }
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
            MINES.TILE_STATES = [];
        }

        if (!(this.tiles[x] instanceof Array)) {
            this.tiles[x] = [];
            MINES.TILE_STATES[x] = [];
        }

        //initiation of field with the empty tiles
        this.tiles[x][y] = new Tile(this.layer, res.transparent_png, iterator, MINES.TILE_STATE.EMPTY_HIDDEN);
        MINES.TILE_STATES[x][y] = {
            state:          this.getTile(x, y).state,
            mines_around:   0
        };
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

                MINES.TILE_STATES[xIterator][yIterator] = {
                    state:          this.getTile(xIterator, yIterator).state,
                    mines_around:   this.getTile(xIterator, yIterator).mines_around
                };
            }
        }
    }

    MINES.GAME_STATE_ACTUAL = MINES.GAME_STATE.PLAY;

    console.log(MINES.GAME_FIELD);
};