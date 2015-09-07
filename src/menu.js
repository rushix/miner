
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

        }

    },

    onNewGame:function () {

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

