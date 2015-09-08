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

            new BackgroundSprite(this);
            new BackArrowSprite(this, winSize);

            MINES.N = 10;
            var nn = MINES.N * MINES.N;

            MINES.MINES_COUNT = Math.floor(nn / MINES.MINES_RATIO);
            MINES.GAMEPLAY_FIELD_HORIZONTAL_OFFSET = winSize.width - winSize.width / 2 - MINES.N * MINES.TEXTURE_DIMENSION / 2;
            MINES.GAMEPLAY_FIELD_VERTICAL_OFFSET = winSize.height - MINES.GAMEPLAY_FIELD_VERTICAL_OFFSET_DELTA;

            buildField(this);

            console.log(MINES.MINES_COUNT);
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