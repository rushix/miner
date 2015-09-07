/**
 * Created by rushi on 07.09.15.
 */

var MenuBombSprite = function (layer, winSize) {

    this.width      = 128;
    this.height     = 128;
    this.yOffset    = 35;

    this.bombMenu = cc.Sprite.create(res.bombMenu_png);
    this.bombMenu.setAnchorPoint(0, 0);
    this.bombMenu.setPosition(
        winSize.width / 2 - this.width / 2,
        winSize.height / 2 + this.yOffset
    );
    layer.addChild(this.bombMenu, 10, 1);
}
