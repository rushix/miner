/**
 * Created by rushi on 02.09.15.
 */

var GameLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {

        this._super();
        this.init();
    },

    init:function () {

        if (this._super()) {

            cc.spriteFrameCache.addSpriteFrames(res.gameplay_plist);
            this.spriteSheet = new cc.SpriteBatchNode(res.gameplay_png);
            this.addChild(this.spriteSheet);

            var winSize = cc.director.getWinSize();
            var sp = cc.Sprite.create(res.background_png);
            sp.setAnchorPoint(0, 0);
            this.addChild(sp, 0, 1);

            var menuItemBackArrow = new cc.MenuItemSprite(
                new cc.Sprite(res.backArrow_png),
                new cc.Sprite(res.backArrow_png),
                this.onBackArrow, this);
            var menuBackArrow = new cc.Menu(menuItemBackArrow);
            menuBackArrow.setPosition(40, winSize.height - 50);
            this.addChild(menuBackArrow);

            var tile = cc.Sprite.create("#exploded.png");
            //tile.setAnchorPoint(0, 0);
            //tile.setColor(255, 0, 255);
            //tile.setBackground(255, 0, 255);

            tile.setPosition(winSize.width / 2 - 65, winSize.height / 2 + 30);
            this.addChild(tile, 10, 1);

            console.log(tile.getPosition());
            tilePos = tile.convertToWorldSpace(this.getPosition());
            console.log(menuItemBackArrow.convertToWorldSpace(menuItemBackArrow.getPosition()));
            //console.log(tile.getTextureRect().size.height);

            var dn = new cc.DrawNode();
            this.addChild(dn);
            dn.drawRect(cc.p(tilePos.x, tilePos.y), cc.p(tilePos.x + 32, tilePos.y + 32), cc.color(0,255,0,255));
        }
    },

    onBackArrow:function () {

        cc.LoaderScene.preload(g_resources, function () {
            cc.director.runScene(new MenuScene());
        }, this);

        console.log("backArrow clicked");
    }

});

var GameScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new GameLayer();
        this.addChild(layer);
    }
});