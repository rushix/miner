var BackgroundSprite = function (layer) {

    this.bg = cc.Sprite.create(res.background_png);
    this.bg.setAnchorPoint(0, 0);
    layer.addChild(this.bg, 0, 1);

};