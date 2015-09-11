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






            MINES.GAME_FIELD = new GamePlay(this);

            console.log(MINES.GAME_FIELD);

            try {
                //try to continue the game
                if (checkGameStateSaved()) {
                    loadGameState();
                }

            } catch (error) {
                console.log("Excepition throwed while game loading: " + error);
            }

            MINES.MINES_COUNT = Math.floor(MINES.N * MINES.N / MINES.MINES_RATIO);
            MINES.GAMEPLAY_FIELD_HORIZONTAL_OFFSET = winSize.width - winSize.width / 2 - MINES.N * MINES.TEXTURE_DIMENSION / 2;
            MINES.GAMEPLAY_FIELD_VERTICAL_OFFSET = winSize.height - MINES.GAMEPLAY_FIELD_VERTICAL_OFFSET_DELTA;

            if (checkGameStateSaved()) {
                MINES.GAME_FIELD.buildFieldFromSavedState();
            } else {
                //start new game
                MINES.GAME_FIELD.buildField();
            }

            console.log("mines count: " + MINES.MINES_COUNT);
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