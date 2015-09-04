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

            var n = 8 * 8;
            for (var i = 0; i < n; i++) {

                var tile = new Tile(this, "#exploded.png", i);

            }

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