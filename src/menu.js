
var MenuLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {

        this._super();
        this.init();
    },

    init:function () {

        if (this._super()) {

            var winSize = cc.director.getWinSize();

            new BackgroundSprite(this);
            new MenuBombSprite(this, winSize);
            new MenuSprite(this, winSize);

            MINES.GAME_STATE_ACTUAL = MINES.GAME_STATE.HOME;

        }

    },

    onNewGame:function () {

        if (MINES.CHECK_LOCAL_STORAGE) {

            MINES.FORCE_NEW_GAME = true;
        }

        cc.LoaderScene.preload(g_resources, function () {
            cc.director.runScene(new GameScene());
        }, this);

        console.log("newGame clicked");
    },

    onSettings:function () {

        cc.LoaderScene.preload(g_resources, function () {
            cc.director.runScene(new SettingsScene());
        }, this);

        console.log("settings clicked");
    }
});

var MenuScene = cc.Scene.extend({
    onEnter:function () {

        this._super();
        var layer = new MenuLayer();
        this.addChild(layer);
    }
});

