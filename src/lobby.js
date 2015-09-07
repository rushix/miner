/**
 * Created by deremin on 07.09.15.
 */
    
var LobbyLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {

        this._super();
        this.init();
    },

    init:function () {

        if (this._super()) {

            var winSize = cc.director.getWinSize();

            new BackgroundSprite(this);
            new BackArrowSprite(this, winSize);

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