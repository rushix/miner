var SettingsLayer = cc.Layer.extend({
    sprite:null,
    label:null,
    ctor:function () {

        this._super();
        this.init();
    },

    init:function () {

        if (this._super()) {

            var winSize = cc.director.getWinSize();

            new BackgroundSprite(this);
            new BackArrowSprite(this, winSize);

            new TilesSelectorSprite(this, winSize);

        }
    },

    onBackArrow:function () {

        cc.LoaderScene.preload(g_resources, function () {
            cc.director.runScene(new MenuScene());
        }, this);

        console.log("backArrow clicked");
    },

    onLeftArrow:function () {

        if (MINES.N > 5) {
            MINES.N--;
            this.label.setString(MINES.N + "x" + MINES.N);
        }

    },

    onRightArrow:function () {

        if (MINES.N < 20) {
            MINES.N++;
            this.label.setString(MINES.N + "x" + MINES.N);
        }

    }

});

var SettingsScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new SettingsLayer();
        this.addChild(layer);
    }
});