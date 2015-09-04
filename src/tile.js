/**
 * Created by deremin on 04.09.15.
 */

var Tile = function (layer, spriteFile, coordx) {

    this.sprite = null;
    this.background = null;
    this.layer = layer;

    this.coords = {x: coordx};

    this.spriteFile = spriteFile;

    this.init();

}


Tile.prototype.init = function () {

    var winSize = cc.director.getWinSize();

    this.sprite = cc.Sprite.create(this.spriteFile);

    this.sprite.setAnchorPoint(0, 0);
    this.sprite.setScale(0.5);
    /*this.sprite.setPosition(
        winSize.width / 2 - 65,
        winSize.height / 2 + 30
    );*/

    this.sprite.setPosition(49 + this.coords.x % 8 * 16, 400 - Math.floor(this.coords.x / 8) * 16);

    this.sprite.coords = {x: this.coords.x, y: this.coords.x};
    this.layer.addChild(this.sprite, 10, 1);

    cc.eventManager.addListener(new Listener(), this.sprite);

    var tilePos = this.sprite.getPosition();

    this.background = new cc.DrawNode();
    this.background.drawRect(
        cc.p(tilePos.x, tilePos.y),
        cc.p(tilePos.x + 16, tilePos.y + 16),

        cc.color(0,255,0,255)
    );
    this.layer.addChild(this.background);

}