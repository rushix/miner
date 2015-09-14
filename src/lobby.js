var LobbyLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {

        this._super();
        this.init();
    },

    init:function () {

        if (this._super()) {

            var winSize = cc.director.getWinSize();

            var xOffset        = 150;
            var yOffsetDelta   = 230;

            new BackgroundSprite(this);
            new BackArrowSprite(this, winSize);

            deleteGameState();

            this.label = new cc.LabelTTF("labeltext", "Lobster", 24);

            this.label.setPosition(
                xOffset, winSize.height - yOffsetDelta
            );

            var result = (MINES.GAME_STATE.OVER_WIN == MINES.GAME_STATE_ACTUAL) ? "WIN" : "LOSE";

            this.label.setString(
                "Result: " + result +
                ";\nResolution: " + MINES.N + "x" + MINES.N +
                ";\nMines: " + MINES.MINES_COUNT + ";"
            );

            this.addChild(this.label);

        }
    },

    onBackArrow:function () {

        cc.LoaderScene.preload(g_resources, function () {
            cc.director.runScene(new MenuScene());
        }, this);

        console.log("backArrow clicked");
    }


});

var LobbyScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new LobbyLayer();
        this.addChild(layer);
    }
});