/**
 * Created by deremin on 04.09.15.
 */

var Tile = function (layer, spriteFile, iteration, state) {

    this.sprite         = null;
    this.background     = null;
    this.layer          = layer;

    this.state          = state;
    this.iteration      = iteration;
    this.coords         = {
        x: Math.floor(iteration / MINES.N),
        y: Math.floor(iteration % MINES.N)
    };

    this.mines_around   = 0;

    this.spriteFile     = spriteFile;

    this.init();

};


Tile.prototype.init = function () {

    this.sprite = cc.Sprite.create(this.spriteFile);

    this.sprite.setAnchorPoint(0, 0);
    this.sprite.setScale(MINES.TEXTURE_DIMENSION_RATIO);

    this.sprite.setPosition(
        MINES.GAMEPLAY_FIELD_HORIZONTAL_OFFSET + this.iteration % MINES.N * MINES.TEXTURE_DIMENSION,
        MINES.GAMEPLAY_FIELD_VERTICAL_OFFSET - Math.floor(this.iteration / MINES.N) * MINES.TEXTURE_DIMENSION
    );

    this.sprite.coords = {
        x: this.coords.x,
        y: this.coords.y
    };
    this.layer.addChild(this.sprite, 10, 1);

    cc.eventManager.addListener(new Listener(), this.sprite);

    this.setTileBackground(false);

};

Tile.prototype.setTileBackground = function (clicked) {

    var tilePos = this.sprite.getPosition();

    this.background = new cc.DrawNode();
    this.background.drawRect(
        cc.p(tilePos.x, tilePos.y),
        cc.p(tilePos.x + MINES.TEXTURE_DIMENSION, tilePos.y + MINES.TEXTURE_DIMENSION),

        (clicked == true) ? cc.color(0xFF, 0xFF, 0xFF, 0xFF) : cc.color(0xFF, 0x85, 0x1B, 0xFF)

    );
    this.layer.addChild(this.background);
};

Tile.prototype.seekMinesAround = function (invokeClick) {

    var xDeltas = [-1, 0, 1];
    var yDeltas = [-1, 0, 1];

    var examX = null;
    var examY = null;

    for (var xIterator = 0; xIterator < xDeltas.length; xIterator++) {
        for (var yIterator = 0; yIterator < yDeltas.length; yIterator++) {

            // except "self-bomb"
            if (xDeltas[xIterator] == 0 && yDeltas[yIterator] == 0) {
                continue;
            }

            examX = this.coords.x + xDeltas[xIterator];
            examY = this.coords.y + yDeltas[yIterator];

            // examining field frames
            if (examX >= 0 && examY >= 0 && examX < MINES.N && examY < MINES.N) {

                if (MINES.GAME_FIELD.getTile(examX, examY).state != MINES.TILE_STATE.BOMB) {

                    if (invokeClick == true) {

                        // expanding clicks around "empty" tiles
                        MINES.GAME_FIELD.getTile(examX, examY).click();
                    }
                } else {

                    this.mines_around++;
                }
            }
        }
    }

    return this.mines_around;
};

Tile.prototype.click = function () {

    switch (this.state) {

        case MINES.TILE_STATE.EMPTY_HIDDEN:

            this.state = MINES.TILE_STATE.EMPTY_SHOWN;

            this.setTileBackground(true);

            this.seekMinesAround(true);

            MINES.GAME_FIELD.opened_tiles_count++;

            break;

        case MINES.TILE_STATE.NUMBERED_HIDDEN:

            this.state = MINES.TILE_STATE.NUMBERED_SHOWN;
            this.sprite.initWithSpriteFrameName(this.mines_around + "mines.png");

            MINES.GAME_FIELD.opened_tiles_count++;

            break;

        case MINES.TILE_STATE.BOMB:

            MINES.GAME_STATE_ACTUAL = MINES.GAME_STATE.OVER;
            MINES.GAME_FIELD.gameOver("lose");

            break;

        default:

    }

    this.sprite.setAnchorPoint(0, 0);

    if (MINES.GAME_FIELD.checkEndGame()) {

        MINES.GAME_FIELD.gameOver("win");
    }
};

Tile.prototype.right_click = function () {

    switch (this.state) {

        case MINES.TILE_STATE.EMPTY_HIDDEN:

            this.state = MINES.TILE_STATE.FLAGGED_HIDDEN;
            this.sprite.initWithSpriteFrameName("flag.png");

            break;

        case MINES.TILE_STATE.BOMB:

            this.state = MINES.TILE_STATE.FLAGGED_BOMB;
            this.sprite.initWithSpriteFrameName("flag.png");

            break;

        case MINES.TILE_STATE.NUMBERED_HIDDEN:

            this.state = MINES.TILE_STATE.FLAGGED_FALSE_BOMB;
            this.sprite.initWithSpriteFrameName("flag.png");

            break;

        case MINES.TILE_STATE.FLAGGED_HIDDEN:

            this.state = MINES.TILE_STATE.EMPTY_HIDDEN;
            this.sprite.initWithImageFile(res.transparent_png);

            break;

        case MINES.TILE_STATE.FLAGGED_BOMB:

            this.state = MINES.TILE_STATE.BOMB;
            this.sprite.initWithImageFile(res.transparent_png);

            break;

        case MINES.TILE_STATE.FLAGGED_FALSE_BOMB:

            this.state = MINES.TILE_STATE.NUMBERED_HIDDEN;
            this.sprite.initWithImageFile(res.transparent_png);

            break;

        default:

    }

    this.sprite.setAnchorPoint(0, 0);
};