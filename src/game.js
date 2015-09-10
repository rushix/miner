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

            MINES.N = 20;
            var nn = MINES.N * MINES.N;

            MINES.MINES_COUNT = Math.floor(nn / MINES.MINES_RATIO);
            MINES.GAMEPLAY_FIELD_HORIZONTAL_OFFSET = winSize.width - winSize.width / 2 - MINES.N * MINES.TEXTURE_DIMENSION / 2;
            MINES.GAMEPLAY_FIELD_VERTICAL_OFFSET = winSize.height - MINES.GAMEPLAY_FIELD_VERTICAL_OFFSET_DELTA;

            MINES.GAME_FIELD = new GamePlay(this);

            if (MINES.CHECK_LOCAL_STORAGE && MINES.FORCE_NEW_GAME && localStorage.minesField) {

                //try to continue
                MINES.GAME_FIELD.buildFieldFromLocalStorage();
            } else {

                //build game field from scratch
                MINES.GAME_FIELD.buildField();
            }

            //console.log(MINES.GAME_FIELD);
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