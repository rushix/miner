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

}


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

}

Tile.prototype.setTileBackground = function (clicked) {

    var tilePos = this.sprite.getPosition();

    this.background = new cc.DrawNode();
    this.background.drawRect(
        cc.p(tilePos.x, tilePos.y),
        cc.p(tilePos.x + MINES.TEXTURE_DIMENSION, tilePos.y + MINES.TEXTURE_DIMENSION),

        (clicked == true) ? cc.color(0xFF, 0xFF, 0xFF, 0xFF) : cc.color(0xFF, 0x85, 0x1B, 0xFF)

    );
    this.layer.addChild(this.background);
}

Tile.prototype.seekMinesAround = function (invokeClick) {

    var xDeltas = [-1, 0, 1];
    var yDeltas = [-1, 0, 1];

    for (var xDelta = 0; xDelta < xDeltas.length; xDelta++) {
        for (var yDelta = 0; yDelta < yDeltas.length; yDelta++) {

            //except "self-bomb"
            if (xDelta == 0 && yDelta == 0) {
                continue;
            }

            //examining field frames
            if (
                this.coords.x + xDelta >= 0 &&
                this.coords.y + yDelta >= 0 &&
                this.coords.x + xDelta < MINES.N &&
                this.coords.y + yDelta < MINES.N
            ) {

                if (MINES.GAME_FIELD[this.coords.x + xDelta][this.coords.y + yDelta].state != MINES.TILE_STATE.BOMB) {

                    if (invokeClick == true) {
                        MINES.GAME_FIELD[this.coords.x + xDelta][this.coords.y + yDelta].click();
                    }
                } else {

                    this.mines_around++;
                }
            }
        }
    }

    return this.mines_around;
}

Tile.prototype.click = function () {

    var mines_around = 0;

    switch (this.state) {

        case MINES.TILE_STATE.EMPTY_HIDDEN:

            this.state = MINES.TILE_STATE.EMPTY_SHOWN;

            this.setTileBackground(true);

            this.seekMinesAround(true);

            break;

        case MINES.TILE_STATE.NUMBERED_HIDDEN:

            this.state = MINES.TILE_STATE.NUMBERED_SHOWN;
            this.sprite.initWithSpriteFrameName(this.mines_around + "mines.png");

            break;

        case MINES.TILE_STATE.BOMB:

            MINES.GAME_STATE_ACTUAL = MINES.GAME_STATE.OVER;
            game_over(this.layer);

            break;

        default:

    }

    //this.sprite.initWithSpriteFrameName((Math.floor(Math.random() * (9 - 1)) + 1) + "mines.png");
    this.sprite.setAnchorPoint(0, 0);
}