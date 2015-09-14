var TilesSelectorSprite = function (layer, winSize) {

    this.xOffset        = 160;
    this.yOffsetDelta   = 230;
    this.menuPadding    = 80;

    this.menuItemLeftArrow = new cc.MenuItemSprite(
        new cc.Sprite(res.backArrow_png),
        new cc.Sprite(res.backArrow_png),
        layer.onLeftArrow,
        layer
    );

    this.menuItemRightArrow = new cc.MenuItemSprite(
        new cc.Sprite(res.backArrow_png),
        new cc.Sprite(res.backArrow_png),
        layer.onRightArrow,
        layer
    );

    this.menuItemRightArrow.setRotation(180); //180 deg.

    this.menuLeftArrow = new cc.Menu(this.menuItemLeftArrow, this.menuItemRightArrow);
    this.menuLeftArrow.alignItemsHorizontallyWithPadding(this.menuPadding);
    this.menuLeftArrow.setPosition(
        this.xOffset,
        winSize.height - this.yOffsetDelta
    );
    layer.addChild(this.menuLeftArrow);


    layer.label = new cc.LabelTTF("labeltext", "Lobster", 24);

    layer.label.setPosition(
        this.xOffset, winSize.height - this.yOffsetDelta
    );

    layer.label.setString(MINES.N + "x" + MINES.N);

    layer.addChild(layer.label);

};