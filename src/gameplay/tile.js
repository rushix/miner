/**
 * Created by deremin on 04.09.15.
 */

var Tile = function (layer, spriteFile, iteration, state) {

    this.sprite     = null;
    this.background = null;
    this.layer      = layer;

    this.state      = state;
    this.iteration  = iteration;
    this.coords     = {
        x: Math.floor(iteration / MINES.N),
        y: Math.floor(iteration % MINES.N)
    };

    this.spriteFile = spriteFile;

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

    var tilePos = this.sprite.getPosition();

    this.background = new cc.DrawNode();
    this.background.drawRect(
        cc.p(tilePos.x, tilePos.y),
        cc.p(tilePos.x + MINES.TEXTURE_DIMENSION, tilePos.y + MINES.TEXTURE_DIMENSION),

        cc.color(0xFF,0x85,0x1B,255)
    );
    this.layer.addChild(this.background);

}

Tile.prototype.click = function () {

    this.sprite.initWithSpriteFrameName((Math.floor(Math.random() * (9 - 1)) + 1) + "mines.png");
    this.sprite.setAnchorPoint(0, 0);
}