var BackArrowSprite = function (layer, winSize) {

    this.xOffset        = 40;
    this.yOffsetDelta   = 30;

    this.menuItemBackArrow = new cc.MenuItemSprite(
        new cc.Sprite(res.backArrow_png),
        new cc.Sprite(res.backArrow_png),
        layer.onBackArrow,
        layer
    );
    this.menuBackArrow = new cc.Menu(this.menuItemBackArrow);
    this.menuBackArrow.setPosition(
        this.xOffset,
        winSize.height - this.yOffsetDelta
    );
    layer.addChild(this.menuBackArrow);

};